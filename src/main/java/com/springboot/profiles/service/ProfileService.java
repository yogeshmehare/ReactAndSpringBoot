package com.springboot.profiles.service;

import com.springboot.profiles.entity.User;
import com.springboot.profiles.repository.ProfileRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileService {

    @Autowired
    public ProfileRepository repository;
    
    public List<User> getUsers() {
        return repository.findAll();
    }
    
    public User getUserById(int id){
        return repository.findById(id).get();
    }
    
    @Transactional
    public void deleteUser(User user){
        repository.delete(user);
    }
    
    @Transactional
    public User createUser(User user){
        return repository.save(user);
    };
    
    @Transactional
    public User updateUser(int id, User user){
        User currentUser = repository.findById(id).get();
        currentUser.setName(user.getName());
        currentUser.setProfession(user.getProfession());
        currentUser.setProfilePic(user.getProfilePic());
        currentUser.setFbLink(user.getFbLink());
        return currentUser;
//        return repository.save(User);
    }

    @Transactional
	public void deleteById(int id) {
		User user = getUserById(id);
		deleteUser(user);
	}
}
