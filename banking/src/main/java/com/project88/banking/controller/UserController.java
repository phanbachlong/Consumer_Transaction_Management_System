package com.project88.banking.controller;

import com.project88.banking.dto.*;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.project88.banking.entity.Bill;
import com.project88.banking.entity.Deposit;
import com.project88.banking.entity.User;
import com.project88.banking.service.IBillService;
import com.project88.banking.service.IDepositService;
import com.project88.banking.service.IUserService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "/api/v1/users")
@Validated
public class UserController {
    @Autowired
    private IUserService userService;

    @Autowired
    private IBillService billService;

    @Autowired
    private IDepositService depositService;

    @Autowired
    private ModelMapper modelMapper;

    @PostMapping()
    public ResponseEntity<?> registerUser(@RequestBody UserDTO userDTO) {
        User user = userDTO.toEntity();
        userService.registerUser(userDTO.toEntity());

        return new ResponseEntity<>("Register successfully!!", HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(@RequestParam(name = "size", defaultValue = "10") int size,
            @RequestParam(name = "page", defaultValue = "0") int page) {
        var usersPage = userService.findAllUsers(size, page);
        return new ResponseEntity<>(usersPage, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public UserDTOv2 getUserById(@PathVariable(name = "id") Long id) {
        User user = userService.findUserById(id);
        UserDTOv2 userDTOv2 = modelMapper.map(user, UserDTOv2.class);
        return userDTOv2;
    }

    @PutMapping("/transfer")
    public void transfer(@RequestBody TransferDTO form) {
        userService.transfer(form);
    }

    @GetMapping()
    public String findUserByCardNumber(@RequestParam(name = "cardNumber") int cardNumber) {
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

    @GetMapping("/bills")
    public List<BillDTO> getBill(@RequestParam(name = "userId") Long userId) {
        List<Bill> bills = billService.findBillByUserId(userId);
        return bills.stream()
                .map(bill -> modelMapper.map(bill, BillDTO.class))
                .collect(Collectors.toList());
    }

    @PutMapping("/bills")
    public void payBill(@RequestParam(name = "billId") int billId) {
        billService.payBill(billId);
    }

    @PutMapping("/deposit")
    public void deposit(@RequestBody DepositDTO form, @RequestParam(name = "userId") Long userId) {
        depositService.createDeposit(form, userId);

    }


    @PostMapping("/top-up")
    public ResponseEntity<String> topUpBalance(@RequestBody TopUpDTO dto) {
        try {
            userService.topUpBalance(dto);
            return ResponseEntity.ok("Nạp tiền thành công");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }




}