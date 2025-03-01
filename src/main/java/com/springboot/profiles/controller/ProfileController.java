package com.springboot.profiles.controller;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.reflect.TypeToken;
import com.springboot.parameterfetcher.ParameterStoreService;
import com.springboot.profiles.entity.User;
import com.springboot.profiles.service.ProfileService;
import com.springboot.storparameterekeys.StoreParameterKeysInDBService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/profiles")
public class ProfileController {

	@Autowired
	private ProfileService profileService;

    @Autowired
    private ParameterStoreService parameterStoreService;

    @Autowired
    private StoreParameterKeysInDBService storeParameterKeysInDBService;
	
    @GetMapping("/accessKeys")
    public Map<String, String> getAccessKeys(@RequestParam String bucketName) {
        Map<String, String> parameterJsonValue = storeParameterKeysInDBService.getKeyValue(bucketName);
        if(parameterJsonValue!=null)
            return parameterJsonValue;
        else{
            String parameterString;
            try {
                parameterString = parameterStoreService.getParameter(bucketName);
            } catch (Exception e) {
                return Map.of("error",e.getMessage());
            }
            if(parameterString!=null){
             storeParameterKeysInDBService.storeKeyValue(bucketName, parameterString);
                parameterJsonValue = storeParameterKeysInDBService.getKeyValue(bucketName);
            }
        }
        return parameterJsonValue;
    }

    @GetMapping("/users")
    public List<User> getUsers() {
        return profileService.getUsers();
    }

    @GetMapping("/{id}")
    User getUserById(int id){
        return profileService.getUserById(id);
    }

    @PostMapping(value = "/addUser")
    public ResponseEntity<User> addUser(@RequestBody User user) throws URISyntaxException {
        User user1 = profileService.createUser(user);
        return ResponseEntity.created(new URI("/profiles/" + user1.getId())).body(user1);
    };

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUserById(@PathVariable int id){
    	profileService.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping(value = "/updateUser")
    ResponseEntity<User> updateUser(@RequestParam int id, @RequestBody User user){
        User c = profileService.updateUser(id, user);
        return ResponseEntity.ok(c);
    }
}
