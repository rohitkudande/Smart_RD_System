package com.cs.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cs.demo.Entity.Rdpassbook;
import com.cs.demo.pdto.UserPassbookDTO;

public interface Passbookrepo extends JpaRepository<Rdpassbook,Integer> {
	
	
	@Query(value = "SELECT SUM(rdamt) FROM rdpassbook",nativeQuery = true)
	Long getTotalAmt();
	
	@Query(value = "SELECT * FROM rdpassbook WHERE rid = :rid",nativeQuery = true)
	List<Rdpassbook> getAllByRid(@Param("rid") int rid);
	
	@Query(value = "SELECT u.rid,u.name,p.rdamt,p.rddate FROM rduser u INNER JOIN rdpassbook p ON u.rid = p.rid",nativeQuery = true)
	List<Object[]> getUserPassbookDetails();
	
	@Query(value = "SELECT u.acno,u.name,p.rdamt,p.rddate FROM rduser u INNER JOIN rdpassbook p ON u.rid = p.rid",nativeQuery = true)
	List<UserPassbookDTO> getUserPassbookDetail();
	
	
	@Query(value = "SELECT u.acno,u.name,p.rdamt,p.rddate FROM rduser u , rdpassbook p WHERE  u.rid = p.rid AND p.rid = :rid",nativeQuery = true)
	List<UserPassbookDTO> getUserPassbookDetailById(@Param("rid") int rid);
	
	

}
