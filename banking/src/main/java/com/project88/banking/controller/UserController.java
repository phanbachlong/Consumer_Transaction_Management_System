package com.project88.banking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.project88.banking.dto.TranferDTO;
import com.project88.banking.dto.UserDTO;
import com.project88.banking.entity.User;
import com.project88.banking.service.IUserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping(value = "/api/v1/users")
@Validated
public class UserController {
    @Autowired
    private IUserService userService;

    @PostMapping()
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        System.out.println("DTO birth: " + userDTO.getFirstName());
        User user = userDTO.toEntity();
        System.out.println("Entity birth: " + user.getBirth());
        userService.registerUser(userDTO.toEntity());

        return new ResponseEntity<>("Register successfully!!", HttpStatus.OK);
    }


    @PutMapping
    public void tranfer(@RequestBody TranferDTO form) {
    	userService.tranfer(form);
    }

    @GetMapping("/search")
    public ResponseEntity<?> getUserInfoByCCCD(@RequestParam("cccd") String cccd) {
        User user = userService.getUserByCCCD(cccd);
        if (user == null) {
            return new ResponseEntity<>("User not found with CCCD: " + cccd, HttpStatus.NOT_FOUND);
        }

        Map<String, String> response = new HashMap<>();
        response.put("fullName", user.getFirstName() + " " + user.getLastName());
        response.put("cccd", user.getCccd());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/addBalance")
    public ResponseEntity<?> addBalance(
            @RequestParam("cccd") String cccd,
            @RequestParam("amount") int amount) {

        if (cccd == null || cccd.isBlank()) {
            return ResponseEntity.badRequest().body("CCCD must not be blank");
        }

        if (amount <= 0) {
            return ResponseEntity.badRequest().body("Amount must be greater than 0");
        }

        User updatedUser = userService.addBalance(cccd, amount);
        if (updatedUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("User not found with CCCD: " + cccd);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Balance updated successfully");
        response.put("cccd", updatedUser.getCccd());
        response.put("newBalance", updatedUser.getBalance());

        return ResponseEntity.ok(response);
    }


}