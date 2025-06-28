package com.project88.banking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project88.banking.dto.CreateEmployeeDTO;
import com.project88.banking.dto.GetAllEmployeesDTO;
import com.project88.banking.dto.filter.EmployeeFilter;
import com.project88.banking.service.IAdminService;
import com.project88.banking.service.IEmployeeService;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

	@Autowired
	private IEmployeeService employeeService;

	@Autowired
	private IAdminService adminService;

	@GetMapping("/ping")
	public ResponseEntity<?> adminOnlyEndpoint() {
		return ResponseEntity.ok("👑 Xin chào ADMIN!");
	}

	@GetMapping()
	public ResponseEntity<?> getAllEmployees(
			Pageable page,
			EmployeeFilter filter) {
		Page<GetAllEmployeesDTO> employees = employeeService.getAllEmployees(page, filter);
		return new ResponseEntity<>(employees, HttpStatus.OK);
	}

	@PutMapping("/active")
	public ResponseEntity<?> activeUser(@RequestParam("userID") long userID, @RequestParam("status") String status) {
		try {
			adminService.activeUser(userID, status);
			return new ResponseEntity<>("User activated successfully", HttpStatus.OK);
		} catch (IllegalArgumentException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<>("An error occurred while activating the user",
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/create-employee")
	public ResponseEntity<?> createEmployee(@RequestBody CreateEmployeeDTO createEmployeeDTO) {
		try {
			adminService.createEmployee(createEmployeeDTO);
			return new ResponseEntity<>("Create employee successfully!!!", HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
		}
	}
}
