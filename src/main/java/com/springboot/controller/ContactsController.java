package com.springboot.controller;

import com.springboot.ContactRepository;
import com.springboot.entity.Contact;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ContactsController {

    @Autowired
    private ContactRepository repository;

    public Contact addContact(Contact contact){
        return repository.save(contact);
    };
}
