package com.cs.demo.cntrl;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cs.demo.Entity.Rduser;
import com.cs.demo.repo.Rduserrepo;

import jakarta.validation.Valid;


@RestController
public class RduserCntrl {
	@Autowired
	private Rduserrepo repo;
	
	@GetMapping("/rduser")
	public List<Rduser> pd(){
		return repo.findAll();
	}
	
	@PostMapping("/save")
	public Rduser saveps(@Valid @RequestBody Rduser r) {
		return repo.save(r);
	}
	
	@PutMapping("/updt")
	public Rduser updateps(@Valid @RequestBody Rduser r) {
		return repo.save(r);
	}
	
	@DeleteMapping("/delt/{id}")
	public String deleteps(@PathVariable("id") int id) {
		repo.deleteById(id);
		return "Record Deleted Successfully..";
	}
	
	@PostMapping("/login")
	public Rduser login(@RequestBody Map<String, String> data) {

	    String acno = data.get("acno");
	    String mobile = data.get("mobile");

	    Rduser user = repo.findByAcnoAndMobile(acno, mobile);

	    if (user == null) {
	        throw new RuntimeException("Invalid Account Number or Mobile");
	    }

	    return user;
	}

	
}
