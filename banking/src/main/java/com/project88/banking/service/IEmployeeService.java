package com.project88.banking.service;

import com.project88.banking.dto.*;
import com.project88.banking.dto.filter.EmployeeFilter;
import com.project88.banking.entity.User;
import org.springframework.data.domain.Page;

public interface IEmployeeService {

	void topUp(TopUpDTO form);

	// lay thon tin cac employee (phan minh)
	Page<GetAllEmployeesDTO> getAllEmployees(int page, int size, EmployeeFilter filter);

	// lay thon tin cac employee da bi xoa (phan minh)
	Page<User> getDeletedEmployeeList(int page, int size);

	// lay thong tin employee theo userId (phan minh)
	User getEmployeeById(Long userId);

	// update employee (phan minh)
	User updateEmployee(Long userId, UpdateEmployeeDTO dto);

	// them employee (phan minh)
	User createEmployee(CreateEmployeeDTO dto);

	User updateStatus(Long userId, UpdateStatusEmployeeDTO request);

	void deleteEmployee(Long userId);
}
