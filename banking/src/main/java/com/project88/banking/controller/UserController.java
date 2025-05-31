package com.project88.banking.controller;

import com.project88.banking.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.project88.banking.entity.User;
import com.project88.banking.service.IUserService;

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



    @PutMapping("/transfer")
    public void transfer(@RequestBody TransferDTO form) {
    	userService.transfer(form);
    }
    
    @GetMapping()
    public String findUserByCardNumber (@RequestParam(name = "cardNumber") int cardNumber) {
    	String userName = userService.findUserByCardNumber(cardNumber);
    	return userName;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        ProfileDTO profileDTO = userService.getProfile(1L);
        return new ResponseEntity<>(profileDTO, HttpStatus.OK);
    }

    @PutMapping("/profile")
    // validate: check exists, check not expired
    public ResponseEntity<?> changeUserProfile(@RequestBody ChangeProfileDTO dto) {

        // get username from token
        String username = "phtrvinh";

        userService.changeUserProfile(username, dto);

        return new ResponseEntity<>("Change Profile Successfully!", HttpStatus.OK);
    }

    //them user (phan minh)
    @PostMapping("/new")
    public ResponseEntity<User> craeteUser(@RequestBody CreateUserDTO createUserDTO) {
        User user = userService.createUser(createUserDTO);
        return ResponseEntity.ok(user);
    }

    //chinh sua user theo user_id (phan minh)
    @PutMapping("{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody UpdateUserDTO updateUserDTO) {
        try {
            User user = userService.updateUser(userId, updateUserDTO);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(null);
        } catch (RuntimeException ex) {
            return ResponseEntity.status(404).body(null);
        }
    }

    //lay thong tin user theo userId (phan minh)
    @GetMapping("{userId}")
    public ResponseEntity<User> getUser(@PathVariable Long userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(user);
    }
}