package com.project88.banking.service;

import java.util.List;
import com.project88.banking.dto.DepositDTO;
import com.project88.banking.dto.DepositDTO.RedeemRequestDTO;

public interface IDepositService {

    // Tạo mới deposit
    DepositDTO createDeposit(DepositDTO dto, String username);

    List<DepositDTO> getDepositsByUserId(long userId);

    List<DepositDTO> getDepositsByUsername(String username);

    DepositDTO getDepositById(Integer depositId);

    DepositDTO redeemDeposit(Integer depositId, RedeemRequestDTO redeemRequest);

    List<DepositDTO> getDepositsByUserIdAndStatus(long userId, String status);

    Double calculateCurrentInterest(Integer depositId);
}
