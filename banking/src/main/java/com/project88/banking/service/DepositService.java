package com.project88.banking.service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project88.banking.dto.DepositDTO;
import com.project88.banking.entity.Deposit;
import com.project88.banking.entity.DepositStatus;
import com.project88.banking.entity.User;
import com.project88.banking.repository.IDepositRepository;
import com.project88.banking.repository.IUserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class DepositService implements IDepositService {

    @Autowired
    private IDepositRepository depositRepository;

    @Autowired
    private IUserRepository userRepository;

    // Tạo mới deposit
    @Override
    public DepositDTO createDeposit(DepositDTO dto, long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));
        
        if (user.getBalance() < dto.getAmount()) {
            throw new RuntimeException("Số dư không đủ để thực hiện giao dịch");
        }
        Deposit deposit = new Deposit(
                dto.getAccountName(),
                dto.getInterestRate(),
                user,
                dto.getAmount(),
                dto.getTerm()
        );
        user.setBalance(user.getBalance() - dto.getAmount());
        userRepository.save(user);
        Deposit savedDeposit = depositRepository.save(deposit);
        return new DepositDTO(savedDeposit);
    }
    
 // Lấy danh sách deposits theo userId
    @Override
    public List<DepositDTO> getDepositsByUserId(long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));
        
        List<Deposit> deposits = depositRepository.findByUser(user);
        return deposits.stream()
                .map(DepositDTO::new)
                .collect(Collectors.toList());
    }

    // Lấy deposit theo ID
    @Override
    public DepositDTO getDepositById(Integer depositId) {
        Deposit deposit = depositRepository.findById(depositId)
                .orElseThrow(() -> new RuntimeException("Sổ tiết kiệm không tồn tại"));
        return new DepositDTO(deposit);
    }

    // Tất toán deposit
    @Override
    public DepositDTO redeemDeposit(Integer depositId, DepositDTO.RedeemRequestDTO redeemRequest) {
        Deposit deposit = depositRepository.findById(depositId)
                .orElseThrow(() -> new RuntimeException("Sổ tiết kiệm không tồn tại"));
        
        if (deposit.getStatus() != DepositStatus.ACTIVE) {
            throw new RuntimeException("Sổ tiết kiệm đã được tất toán hoặc không hợp lệ");
        }

        User user = deposit.getUser();
        
        // Tính toán lãi suất thực tế
        double actualInterest = calculateCurrentInterest(depositId);
        
        // Cập nhật trạng thái deposit
        deposit.setStatus(DepositStatus.REDEEMED);
        
        // Hoàn tiền gốc + lãi vào tài khoản user
        double totalAmount = deposit.getDepositAmount() + actualInterest;
        user.setBalance(user.getBalance() + (int) totalAmount);
        
        // Save changes
        userRepository.save(user);
        Deposit savedDeposit = depositRepository.save(deposit);
        
        return new DepositDTO(savedDeposit);
    }

    // Lấy deposits theo userId và status
    @Override
    public List<DepositDTO> getDepositsByUserIdAndStatus(long userId, String status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User không tồn tại"));
        
        DepositStatus depositStatus;
        try {
            depositStatus = DepositStatus.valueOf(status.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Trạng thái không hợp lệ: " + status);
        }
        
        List<Deposit> deposits = depositRepository.findByUserAndStatus(user, depositStatus);
        return deposits.stream()
                .map(DepositDTO::new)
                .collect(Collectors.toList());
    }

    // Tính lãi suất hiện tại
    @Override
    public Double calculateCurrentInterest(Integer depositId) {
        Deposit deposit = depositRepository.findById(depositId)
                .orElseThrow(() -> new RuntimeException("Sổ tiết kiệm không tồn tại"));
        
        LocalDate startDate = deposit.getCreateDate();
        LocalDate currentDate = LocalDate.now();
        
        // Tính số ngày đã gửi
        long daysPassed = ChronoUnit.DAYS.between(startDate, currentDate);
        
        // Tính lãi theo công thức(Số tiền gốc * Lãi suất * Số ngày) / 365
        double yearlyInterest = (deposit.getDepositAmount() * deposit.getInterestRate()) / 100;
        double dailyInterest = yearlyInterest / 365;
        double currentInterest = dailyInterest * daysPassed;
        
        return Math.round(currentInterest * 100.0) / 100.0; // Làm tròn 2 chữ số thập phân
    }

    // Kiểm tra deposit có đến hạn chưa
    public boolean isMatured(Integer depositId) {
        Deposit deposit = depositRepository.findById(depositId)
                .orElseThrow(() -> new RuntimeException("Sổ tiết kiệm không tồn tại"));
        
        LocalDate maturityDate = deposit.getCreateDate().plusMonths(deposit.getTermMonths());
        return LocalDate.now().isAfter(maturityDate) || LocalDate.now().isEqual(maturityDate);
    }

    // Tính số ngày còn lại đến hạn
    public long getDaysUntilMaturity(Integer depositId) {
        Deposit deposit = depositRepository.findById(depositId)
                .orElseThrow(() -> new RuntimeException("Sổ tiết kiệm không tồn tại"));
        
        LocalDate maturityDate = deposit.getCreateDate().plusMonths(deposit.getTermMonths());
        LocalDate currentDate = LocalDate.now();
        
        return ChronoUnit.DAYS.between(currentDate, maturityDate);
    }
}