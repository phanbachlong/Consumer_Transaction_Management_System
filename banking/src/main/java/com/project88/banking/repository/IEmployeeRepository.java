package com.project88.banking.repository;

import com.project88.banking.dto.CreateEmployeeDTO;
import com.project88.banking.dto.GetAllEmployeesDTO;
import com.project88.banking.dto.ProfileDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project88.banking.entity.User;

@Repository
public interface IEmployeeRepository extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {

    // lay thon tin cac employee (phan minh)
    // @Query("SELECT u FROM User u WHERE u.role = 'Employee' AND (u.status = 0 OR
    // u.status = 1)")
    @Query("SELECT new com.project88.banking.dto.GetAllEmployeesDTO(u.userID, CONCAT(u.firstName, ' ', u.lastName), u.username, u.email, u.phone, c.cardNumber, u.status) FROM User u JOIN u.cardNumber c "
            +
            "WHERE u.role <> 'Admin' AND (:name IS NULL OR u.firstName LIKE CONCAT('%', :name, '%') or u.lastName LIKE CONCAT('%', :name, '%')) ")
    Page<GetAllEmployeesDTO> getAllEmployees(Pageable pageable, String name);

    // lay thong tin employee theo userId (phan minh)
    @Query("FROM User u WHERE u.userID = :userId AND u.role = 'Employee'")
    User findEmployeeById(@Param("userId") Long userId);

    // lay thon tin cac employee da bi xoa (phan minh)
    @Query("SELECT u FROM User u WHERE u.role = 'Employee' AND u.status=2")
    Page<User> getDeletedEmployeeList(Pageable pageable);

}
