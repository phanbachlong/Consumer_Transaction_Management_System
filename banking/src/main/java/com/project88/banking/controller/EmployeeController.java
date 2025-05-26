package com.project88.banking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project88.banking.dto.TopUpDTO;
import com.project88.banking.service.IEmployeeService;

@RestController
@RequestMapping("/api/v1/employees")
public class EmployeeController {
	@Autowired
	private IEmployeeService employeeService;
	
	@PutMapping
	public void topUp(@RequestBody TopUpDTO form) {
		employeeService.topUp(form);
	}
	
	
}
