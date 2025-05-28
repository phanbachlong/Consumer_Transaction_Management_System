package com.project88.banking.controller;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.project88.banking.dto.TransferDTO;
import com.project88.banking.dto.UserDTO;
import com.project88.banking.dto.UserDTOv2;
import com.project88.banking.entity.User;
import com.project88.banking.service.IUserService;

import java.util.HashMap;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping(value = "/api/v1/users")
@Validated
public class UserController {
    @Autowired
    private IUserService userService;
    
    @Autowired
	private ModelMapper modelMapper;

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

    @GetMapping("/{id}")
    public UserDTOv2 getUserById(@PathVariable(name = "id") short id) {
         User user = userService.findUserById(id);
         UserDTOv2 userDTOv2 = modelMapper.map(user, UserDTOv2.class);
         return userDTOv2;
    }
    


}