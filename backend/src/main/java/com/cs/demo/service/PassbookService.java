package com.cs.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cs.demo.pdto.UserPassbookDTO;
import com.cs.demo.repo.Passbookrepo;

@Service
public class PassbookService {
	@Autowired
	private Passbookrepo prepo;
	
	public List<UserPassbookDTO> getDetails(){
		return prepo.getUserPassbookDetail();
	}
	
	public List<UserPassbookDTO> getUserPassbookDetailById(int rid){
		return prepo.getUserPassbookDetailById(rid);
	}
	
}
