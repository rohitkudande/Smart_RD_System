package com.cs.demo.cntrl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.cs.demo.Entity.Contact;
import com.cs.demo.repo.ContactRepo;

@RestController
public class ContactCntrl {

    @Autowired
    private ContactRepo repo;

    @PostMapping("/contact")
    public Contact saveContact(@RequestBody Contact contact) {
        return repo.save(contact);
    }
}

