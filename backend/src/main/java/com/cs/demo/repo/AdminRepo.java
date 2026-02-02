package com.cs.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cs.demo.Entity.Admin;

public interface AdminRepo extends JpaRepository<Admin, Integer> {

	  Admin findByUsernameAndPassword(String username, String password);
}

