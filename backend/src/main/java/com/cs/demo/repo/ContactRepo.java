package com.cs.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cs.demo.Entity.Contact;

public interface ContactRepo extends JpaRepository<Contact, Integer> {
}

