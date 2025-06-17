package com.project88.banking.controller;

import com.project88.banking.dto.*;
import com.project88.banking.dto.filter.UserFilter;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.project88.banking.entity.Bill;
import com.project88.banking.entity.Deposit;
import com.project88.banking.entity.User;
import com.project88.banking.service.IBillService;
import com.project88.banking.service.IDepositService;
import com.project88.banking.service.IUserService;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

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
        userService.registerUser(userDTO.toEntity());

        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers(@PageableDefault(size = 5) Pageable pageable, UserFilter filter,
            Authentication authentication) {
        String username = authentication.getName();
        Page<GetAllUserDTO> usersPage = userService.findAllUsers(pageable, filter, username);
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

    @PutMapping("/edit")
    public void editUser(@RequestBody EditUserDTO editUserDTO, @RequestParam(name = "userID") long userID) {
        try {
            userService.editUserByEmployee(userID, editUserDTO);
        } catch (RuntimeException e) {
            throw new RuntimeException("Không tìm thấy người dùng với username: " + userID);
        } catch (Exception e) {
            throw new RuntimeException("Lỗi khi cập nhật thông tin người dùng: " + e.getMessage());
        }
    }

    @GetMapping()
    public String findUserByCardNumber(@RequestParam(name = "cardNumber") int cardNumber) {
        String userName = userService.findUserByCardNumber(cardNumber);
        return userName;
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        String name = authentication.getName();
        ProfileDTO profileDTO = userService.getProfile(name);
        return ResponseEntity.ok(profileDTO);
    }

    @PutMapping("/profile")
    // validate: check exists, check not expired
    public ResponseEntity<?> changeUserProfile(@RequestParam("avatarUrl") MultipartFile file,
            Authentication authentication) {

        try {
            String usename = authentication.getName();
            String avatarUrl = userService.changeUserProfile(usename, file);
            return ResponseEntity.ok(avatarUrl);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi cập nhật thông tin người dùng: " + e.getMessage());
        }
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

    // @PutMapping("/deposit")
    // public void deposit(@RequestBody DepositDTO form, @RequestParam(name =
    // "userId") Long userId) {
    // depositService.createDeposit(form, userId);

    // }

    @GetMapping("/{id}/balance")
    public ResponseEntity<Integer> getUserBalance(@PathVariable(name = "id") long id) {
        User user = userService.findUserById(id);
        return new ResponseEntity<>(user.getBalance(), HttpStatus.OK);
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

    @GetMapping("/check-email")
    public ResponseEntity<Boolean> isEmailExists(@RequestParam String email) {
        boolean isExists = userService.isEmailExists(email);
        return ResponseEntity.ok(isExists);
    }

    @GetMapping("/check-phone")
    public ResponseEntity<Boolean> isPhoneExists(@RequestParam String phone) {
        boolean isExists = userService.isPhoneExists(phone);
        return ResponseEntity.ok(isExists);
    }

}