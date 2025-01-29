package com.springboot.controller;

import com.springboot.ContactRepository;
import com.springboot.entity.Contact;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/contacts")
public class ContactsController {


    @GetMapping
    public List<Contact> getClients() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    Contact getContactById(int id){
        return repository.findById(id).orElseThrow(RuntimeException::new);
    }

    @PostMapping
    public ResponseEntity<Contact> addContact(@RequestBody Contact contact) throws URISyntaxException {
        Contact contact1 = repository.save(contact);
        return ResponseEntity.created(new URI("/contacts/" + contact1.getContactId())).body(contact1);
    };

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteContactById(int id){
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }


    ResponseEntity<Contact> updateContact(int id, Contact contact){
        Contact currentContact = repository.findById(id).orElseThrow(RuntimeException::new);
        currentContact.setContactAddress(contact.getContactAddress());
        currentContact.setContactName(contact.getContactName());
        Contact contact1 = repository.save(contact);
        return ResponseEntity.ok(contact1);
    }
}
