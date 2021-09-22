package com.sagarkhati.rest.webservices.todoapplication.todo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {
	List<Todo> findByUsername(String username);
}
