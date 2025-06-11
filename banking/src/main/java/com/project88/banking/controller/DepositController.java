package com.project88.banking.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project88.banking.dto.DepositDTO;
import com.project88.banking.dto.DepositDTO.RedeemRequestDTO;
import com.project88.banking.service.IDepositService;

@RestController
@RequestMapping("/api/v1/deposits")
public class DepositController {

    @Autowired
    private IDepositService depositService;

    // API tạo sổ tiết kiệm
    @PostMapping
    public ResponseEntity<?> createDeposit(
            @RequestBody DepositDTO depositDTO,
            @RequestParam("userId") long userId) {
        try {
            DepositDTO createdDeposit = depositService.createDeposit(depositDTO, userId);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdDeposit);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("ERROR", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("ERROR", "Có lỗi xảy ra khi tạo sổ tiết kiệm"));
        }
    }

    // API lấy danh sách sổ tiết kiệm theo userId
    @GetMapping("/user")
    public ResponseEntity<?> getDepositsByUsername(Authentication authentication) {
        try {
            String username = authentication.getName();
            System.out.println("Username frontend đang gọi: " + username);
            List<DepositDTO> deposits = depositService.getDepositsByUsername(username);
            return ResponseEntity.ok(deposits);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("ERROR", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("ERROR", "Có lỗi xảy ra khi lấy danh sách sổ tiết kiệm"));
        }
    }

    // API lấy chi tiết một sổ tiết kiệm
    @GetMapping("/{depositId}")
    public ResponseEntity<?> getDepositById(@PathVariable Integer depositId) {
        try {
            DepositDTO deposit = depositService.getDepositById(depositId);
            return ResponseEntity.ok(deposit);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("ERROR", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("ERROR", "Có lỗi xảy ra khi lấy thông tin sổ tiết kiệm"));
        }
    }

    // API tất toán sổ tiết kiệm
    @PutMapping("/{depositId}/redeem")
    public ResponseEntity<?> redeemDeposit(
            @PathVariable Integer depositId,
            @RequestBody RedeemRequestDTO redeemRequest) {
        try {
            DepositDTO redeemedDeposit = depositService.redeemDeposit(depositId, redeemRequest);
            return ResponseEntity.ok(new SuccessResponse("SUCCESS", "Tất toán thành công", redeemedDeposit));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("ERROR", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("ERROR", "Có lỗi xảy ra khi tất toán sổ tiết kiệm"));
        }
    }

    // API lấy danh sách sổ tiết kiệm theo trạng thái
    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<?> getDepositsByUserIdAndStatus(
            @PathVariable long userId,
            @PathVariable String status) {
        try {
            List<DepositDTO> deposits = depositService.getDepositsByUserIdAndStatus(userId, status);
            return ResponseEntity.ok(deposits);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("ERROR", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("ERROR", "Có lỗi xảy ra khi lấy danh sách sổ tiết kiệm"));
        }
    }

    // API tính toán lãi suất hiện tại
    @GetMapping("/{depositId}/interest")
    public ResponseEntity<?> calculateCurrentInterest(@PathVariable Integer depositId) {
        try {
            Double currentInterest = depositService.calculateCurrentInterest(depositId);
            return ResponseEntity.ok(new InterestResponse("SUCCESS", currentInterest));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new ErrorResponse("ERROR", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("ERROR", "Có lỗi xảy ra khi tính toán lãi suất"));
        }
    }

    public static class ErrorResponse {
        private String status;
        private String message;

        public ErrorResponse(String status, String message) {
            this.status = status;
            this.message = message;
        }

        public String getStatus() {
            return status;
        }

        public String getMessage() {
            return message;
        }
    }

    public static class SuccessResponse {
        private String status;
        private String message;
        private Object data;

        public SuccessResponse(String status, String message, Object data) {
            this.status = status;
            this.message = message;
            this.data = data;
        }

        public String getStatus() {
            return status;
        }

        public String getMessage() {
            return message;
        }

        public Object getData() {
            return data;
        }
    }

    public static class InterestResponse {
        private String status;
        private Double currentInterest;

        public InterestResponse(String status, Double currentInterest) {
            this.status = status;
            this.currentInterest = currentInterest;
        }

        public String getStatus() {
            return status;
        }

        public Double getCurrentInterest() {
            return currentInterest;
        }
    }
}