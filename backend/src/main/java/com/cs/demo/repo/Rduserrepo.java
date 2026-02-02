package com.cs.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cs.demo.Entity.Rduser;

public interface Rduserrepo extends JpaRepository<Rduser,Integer> {
	Rduser findByAcnoAndMobile(String acno, String mobile);
}
