package com.project88.banking.service;

import com.project88.banking.dto.CreateEmployeeDTO;

public interface IAdminService {
    void activeUser(long userID, String status);

    void createEmployee(CreateEmployeeDTO createEmployeeDTO);
}
