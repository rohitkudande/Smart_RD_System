package com.cs.demo.cntrl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cs.demo.Entity.Admin;
import com.cs.demo.repo.AdminRepo;

@RestController
@CrossOrigin
public class AdminCntrl {
	
	 @Autowired
	  private AdminRepo repo;

	  @PostMapping("/admin/login")
	  public Admin adminLogin(@RequestBody Admin a) {
	    return repo.findByUsernameAndPassword(
	      a.getUsername(),
	      a.getPassword()
	    );
	  }

}
