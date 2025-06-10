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
import com.project88.banking.entity.TransactionHistory;
import com.project88.banking.entity.User;
import com.project88.banking.repository.IDepositRepository;
import com.project88.banking.repository.ITransactionRepository;
import com.project88.banking.repository.IUserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class DepositService implements IDepositService {

        @Autowired
        private IDepositRepository depositRepository;

        @Autowired
        private IUserRepository userRepository;

        @Autowired
        private ITransactionRepository transactionRepository;

        // Tạo mới deposit
        @Override
        public DepositDTO createDeposit(DepositDTO dto, String username) {
                User user = userRepository.findByUsername(username);

                if (user == null) {
                        return null;
                }

                if (user.getBalance() < dto.getAmount()) {
                        throw new RuntimeException("Số dư không đủ để thực hiện giao dịch");
                }

                Deposit deposit = new Deposit(
                                dto.getAccountName(),
                                dto.getInterestRate(),
                                user,
                                dto.getAmount(),
                                dto.getTerm());

                // Trừ tiền từ tài khoản
                int oldBalance = user.getBalance();
                user.setBalance(oldBalance - dto.getAmount());

                // Tạo lịch sử giao dịch cho việc gửi tiết kiệm
                String transType = "TT";
                String content = String.format("Gửi tiết kiệm sổ : %s số tiền %d - Kỳ hạn %d tháng",
                                dto.getAccountName(), dto.getAmount(), dto.getTerm());
                int newBalance = user.getBalance();

                TransactionHistory depositTransaction = new TransactionHistory(
                                transType,
                                content,
                                -dto.getAmount(), // Trừ tiền ra khỏi tài khoản
                                user,
                                newBalance);

                // Lưu vào database
                userRepository.save(user);
                Deposit savedDeposit = depositRepository.save(deposit);
                transactionRepository.save(depositTransaction);

                return new DepositDTO(savedDeposit);
        }

        // Lấy danh sách deposits theo userId
        @Override
        public List<DepositDTO> getDepositsByUsername(String username) {
                User user = userRepository.findByUsername(username);
                if (user == null) {
                        throw new RuntimeException("User không tồn tại");
                }

                List<Deposit> deposits = depositRepository.findByUserNameActive(username);
                return deposits.stream()
                                .map(DepositDTO::new)
                                .collect(Collectors.toList());
        }

        @Override
        public List<DepositDTO> getDepositsByUserId(long userId) {
                // TODO Auto-generated method stub
                return null;
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
                int oldBalance = user.getBalance();
                user.setBalance(user.getBalance() + (int) totalAmount);

                // Tạo lịch sử giao dịch cho việc tất toán tiết kiệm
                String transType = "TT";
                String content = String.format("Tất toán tiết kiệm sổ : %s - Tiền góc: %d, Lãi: %.2f, Tổng: %.2f",
                                deposit.getDepositName(),
                                deposit.getDepositAmount(),
                                actualInterest,
                                totalAmount);
                int newBalance = user.getBalance();

                TransactionHistory redeemTransaction = new TransactionHistory(
                                transType,
                                content,
                                (int) totalAmount, // Số tiền dương vì đây là tiền vào tài khoản
                                user,
                                newBalance);

                // Save changes
                userRepository.save(user);
                Deposit savedDeposit = depositRepository.save(deposit);
                transactionRepository.save(redeemTransaction);

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

        // Method tiện ích tạo transaction history (có thể tái sử dụng)
        private void createTransactionHistory(String transType, String content, int amount, User user, int newBalance) {
                TransactionHistory transaction = new TransactionHistory(transType, content, amount, user, newBalance);
                transactionRepository.save(transaction);
        }
}
