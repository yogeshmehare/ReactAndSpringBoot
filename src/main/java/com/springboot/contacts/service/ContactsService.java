package com.springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springboot.entity.Contact;
import com.springboot.repository.ContactRepository;

import jakarta.transaction.Transactional;

@Service
public class ContactsService {

    @Autowired
    public ContactRepository repository;
    
    public List<Contact> getContacts() {
        return repository.findAll();
    }
    
    public Contact getContactById(int id){
        return repository.findById(id).get();
    }
    
    @Transactional
    public void deleteContact(Contact contact){
        repository.delete(contact);
    }
    
    @Transactional
    public Contact createContact(Contact contact){
        return repository.save(contact);
    };
    
    @Transactional
    public Contact updateContact(int id, Contact contact){
        Contact currentContact = repository.findById(id).get();
        currentContact.setContactAddress(contact.getContactAddress());
        currentContact.setContactName(contact.getContactName());
        return currentContact;
//        return repository.save(contact);
    }

    @Transactional
	public void deleteById(int id) {
		Contact c = getContactById(id);
		repository.delete(c);
	}
}
