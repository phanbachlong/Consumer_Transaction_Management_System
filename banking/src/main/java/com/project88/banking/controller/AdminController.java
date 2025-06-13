package com.project88.banking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project88.banking.dto.GetAllEmployeesDTO;
import com.project88.banking.dto.filter.EmployeeFilter;
import com.project88.banking.service.IEmployeeService;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {
	
	@Autowired
	private IEmployeeService employeeService;

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
}
