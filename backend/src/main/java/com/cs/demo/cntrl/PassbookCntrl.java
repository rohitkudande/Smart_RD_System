package com.cs.demo.cntrl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.cs.demo.Entity.Rdpassbook;
import com.cs.demo.pdto.UserPassbookDTO;
import com.cs.demo.repo.Passbookrepo;
import com.cs.demo.service.PassbookService;

import jakarta.validation.Valid;

@RestController
public class PassbookCntrl {
	@Autowired
	private Passbookrepo prepo;
	
	
	@Autowired
	private PassbookService service;
	
	@GetMapping("/pdetails")
	public List<UserPassbookDTO> getD(){
		return service.getDetails();
		
	}
	
	@GetMapping("/user/{rid}")
	public List<UserPassbookDTO> getD1(@PathVariable("rid") int rid){
		return service.getUserPassbookDetailById(rid);
	}
	
	@GetMapping("/ttlamt")
	public Map<String,Object> getAmt(){
		Long total = prepo.getTotalAmt();
		Map<String,Object> result = new HashMap<>();
		result.put("total", total);
		return result;
	}
	
	@GetMapping("/passdetail")
	public List<Object[]> getDetails(){
		return prepo.getUserPassbookDetails();
	}
	
	@GetMapping("/passbookById/{id}")
	public List<Rdpassbook> getPassbookByRid(@PathVariable ("id") int id){
		List<Rdpassbook> lst = prepo.getAllByRid(id);
		return lst;
	}
	
	@GetMapping("/passbook")
	public List<Rdpassbook> pd(){
		return prepo.findAll();
	}
	
	@PostMapping("/psave")
	public Rdpassbook saveps(@Valid @RequestBody Rdpassbook r) {
		return prepo.save(r);
	}
	
	@PutMapping("/pupdt")
	public Rdpassbook updateps(@Valid @RequestBody Rdpassbook r) {
		return prepo.save(r);
	}
	
	@DeleteMapping("/pdelt/{id}")
	public String deleteps(@PathVariable("id") int id) {
		prepo.deleteById(id);
		return "Record Deleted Successfully..";
	}
	
	
}
