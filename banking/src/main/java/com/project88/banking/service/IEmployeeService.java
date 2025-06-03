package com.project88.banking.service;

import com.project88.banking.dto.CreateEmployeeDTO;
import com.project88.banking.dto.TopUpDTO;
import com.project88.banking.dto.UpdateEmployeeDTO;
import com.project88.banking.dto.UpdateUserDTO;
import com.project88.banking.entity.User;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface IEmployeeService {

	void topUp(TopUpDTO form);


	//lay thon tin cac employee (phan minh)
	Page<User> getAllEmployees(int page, int size);

	//lay thong tin employee theo userId (phan minh)
	User getEmployeeById(Long userId);

	//update employee (phan minh)
	User updateEmployee(Long userId, UpdateEmployeeDTO dto);

	//them employee (phan minh)
	User createEmployee(CreateEmployeeDTO dto);

}
