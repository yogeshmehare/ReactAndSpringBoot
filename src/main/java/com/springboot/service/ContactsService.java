package com.springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.ContactRepository;
import com.springboot.entity.Contact;

@Service
public class ContactsService {

    @Autowired
    private ContactRepository repository;
    
    public List<Contact> getClontacts() {
        return repository.findAll();
    }
    
    public Contact getContactById(int id){
        return repository.findById(id).get();
    }
    
    public void deleteContact(Contact contact){
        repository.delete(contact);
    }
    
    public Contact createContact(Contact contact){
        return repository.save(contact);
    };
    
    public Contact updateContact(int id, Contact contact){
        Contact currentContact = repository.findById(id).get();
        currentContact.setContactAddress(contact.getContactAddress());
        currentContact.setContactName(contact.getContactName());
        return repository.save(contact);
    }
}
