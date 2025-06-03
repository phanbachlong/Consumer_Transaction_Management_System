package com.project88.banking.controller;

import com.project88.banking.dto.CreateEmployeeDTO;
import com.project88.banking.dto.UpdateEmployeeDTO;
import com.project88.banking.dto.UpdateUserDTO;
import com.project88.banking.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.project88.banking.dto.TopUpDTO;
import com.project88.banking.service.IEmployeeService;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {
	@Autowired
	private IEmployeeService employeeService;
	
	@PutMapping
	public void topUp(@RequestBody TopUpDTO form) {
		employeeService.topUp(form);
	}

	//lay thon tin cac employee (phan minh)
	@GetMapping()
	public ResponseEntity<Page<User>> getAllEmployees(
			@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "10") int size) {
		Page<User> users = employeeService.getAllEmployees(page, size);
		return ResponseEntity.ok(users);
	}

	//lay thong tin employee theo userId (phan minh)
	@GetMapping("/{userId}")
	public ResponseEntity<User> getEmployeeById(@PathVariable Long userId) {
		User user = employeeService.getEmployeeById(userId);
		return ResponseEntity.ok(user);
	}

	//update employee (phan minh)
	@PutMapping("{userId}")
	public ResponseEntity<User> updateEmployee(@PathVariable Long userId, @RequestBody UpdateEmployeeDTO dto) {
		try {
			User user = employeeService.updateEmployee(userId, dto);
			return ResponseEntity.ok(user);
		} catch (IllegalArgumentException ex) {
			return ResponseEntity.badRequest().body(null);
		} catch (RuntimeException ex) {
			return ResponseEntity.status(404).body(null);
		}
	}

//them employee (phan minh)
	@PostMapping()
	public ResponseEntity<User> createEmployee(@RequestBody CreateEmployeeDTO dto) {
		User user = employeeService.createEmployee(dto);
		return ResponseEntity.ok(user);
	}

}
