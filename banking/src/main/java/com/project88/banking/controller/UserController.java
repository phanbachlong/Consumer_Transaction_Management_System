package com.project88.banking.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.project88.banking.dto.BillDTO;
import com.project88.banking.dto.ChangeProfileDTO;
import com.project88.banking.dto.ProfileDTO;
import com.project88.banking.dto.TransferDTO;
import com.project88.banking.dto.UserDTO;
import com.project88.banking.dto.UserDTOv2;
import com.project88.banking.entity.Bill;
import com.project88.banking.entity.User;
import com.project88.banking.service.IBillService;
import com.project88.banking.service.IUserService;

// import java.util.HashMap;
// import java.util.Map;

@RestController
@RequestMapping(value = "/api/v1/users")
@Validated
public class UserController {
    @Autowired
    private IUserService userService;
    
    @Autowired
    private IBillService billService;

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
    public void tranfer(@RequestBody TransferDTO form) {
        userService.transfer(form);
    }

    @GetMapping()
    public String findUserByCardNumber(@RequestParam(name = "cardNumber") int cardNumber) {
        String userName = userService.findUserByCardNumber(cardNumber);
        return userName;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        ProfileDTO profileDTO = userService.getProfile((short) 1);
        return new ResponseEntity<>(profileDTO, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public UserDTOv2 getUserById(@PathVariable(name = "id") short id) {
        User user = userService.findUserById(id);
        UserDTOv2 userDTOv2 = modelMapper.map(user, UserDTOv2.class);
        return userDTOv2;
    }

    @PutMapping("/profile")
    // validate: check exists, check not expired
    public ResponseEntity<?> changeUserProfile(@RequestBody ChangeProfileDTO dto) {

        // get username from token
        String username = "phtrvinh";

        userService.changeUserProfile(username, dto);

        return new ResponseEntity<>("Change Profile Successfully!", HttpStatus.OK);
    }
    
    @GetMapping("/bills")
    public List<BillDTO> getBill(@RequestParam(name = "userId") short userId) {
     	List<Bill> bills = billService.findBillByUserId(userId);
     	return bills.stream()
                .map(bill -> modelMapper.map(bill, BillDTO.class))
                .collect(Collectors.toList());
    }
    
    @PutMapping("/bills")
    public void payBill (@RequestParam(name = "billId") int billId) {
    	billService.payBill(billId);
    }

}