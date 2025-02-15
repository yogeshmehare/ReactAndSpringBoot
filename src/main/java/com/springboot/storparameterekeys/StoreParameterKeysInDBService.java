package com.springboot.storparameterekeys;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.util.Map;

@Service
public class StoreParameterKeysInDBService{

    @Autowired
    KeyValueRepository keyValueRepository;

    public void storeKeyValue(String key, String value){
        KeyValue keyValue = new KeyValue(key,value);
        keyValueRepository.save(keyValue);
    }

    public Map<String, String> getKeyValue(String key){
        try{
            String s = keyValueRepository.findById(key).get().getValue();
            Gson gson = new Gson();
            Type type = new TypeToken<Map<String, String>>() {}.getType();
            Map<String, String> jsonMap = gson.fromJson(s, type);
            return jsonMap;
        }catch (Exception e){
            return null;
        }
    }
}

