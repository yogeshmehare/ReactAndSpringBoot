package com.springboot.controller;

import com.springboot.entity.Contact;
import com.springboot.service.ContactsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/contacts")
public class ContactsController {
	
	@Autowired
	private ContactsService contactsService;

    @GetMapping
    public List<Contact> getContacts() {
        return contactsService.getContacts();
    }

    @GetMapping("/{id}")
    Contact getContactById(int id){
        return contactsService.getContactById(id);
    }

    @PostMapping(value = "/add")
    public ResponseEntity<Contact> addContact(@RequestBody Contact contact) throws URISyntaxException {
        Contact contact1 = contactsService.createContact(contact);
        return ResponseEntity.created(new URI("/contacts/" + contact1.getContactId())).body(contact1);
    };

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteContactById(int id){
    	contactsService.deleteById(id);
        return ResponseEntity.ok().build();
    }


    @PutMapping(value = "/update")
    ResponseEntity<Contact> updateContact(@RequestParam int id,@RequestBody Contact contact){
        Contact c = contactsService.updateContact(id, contact);
        return ResponseEntity.ok(c);
    }
}
