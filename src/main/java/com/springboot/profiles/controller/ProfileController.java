package com.springboot.profiles.controller;

import com.springboot.parameterfetcher.ParameterStoreService;
import com.springboot.profiles.entity.User;
import com.springboot.profiles.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/profiles")
public class ProfileController {

	@Autowired
	private ProfileService profileService;

    @Autowired
    private ParameterStoreService parameterStoreService;
	
    @GetMapping("/accessKeys")
    public String getAccessKeys(@RequestParam String name) {
        String parameterJsonValue = parameterStoreService.getParameter(name);

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
