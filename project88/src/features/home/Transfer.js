import React, { useState, useEffect } from "react";
import "../../styles/TransferForm.scss";
import TransferForm from "../../components/TransferForm";
import UserAPIv2 from "../../api/UserAPIv2";

const Transfer = ({ setShowTransfer }) => {

  const userID = 1;

  const [transferDTO, settransferDTO] = useState({
    senderID: userID,
    cardNumber: null,
    money: null,
    content:""
  }
  );

  const [receiverName, setReceiverName] = useState("");

  const fetchTransferData = async () => {
    try {
      const response = await UserAPIv2.Transfer(transferDTO);
      alert("Chuyển khoản thành công!");
      console.log("Transfer successful:", response);
    } catch (error) {
      alert("Chuyển khoản thất bại! Vui lòng kiểm tra lại thông tin.");
      console.error("Transfer failed:", error);
    }
  }

  const fetchUserByCardNumber = async (cardNumber) => {
    try {
      const response = await UserAPIv2.FindUserByCardNumber(cardNumber);
      if (response && response.data) {
        setReceiverName(response.data);
      } else {
        setReceiverName("Không tìm thấy người dùng với số tài khoản này.");
      }
    }
    catch (error) {
      console.error("Error fetching user by card number:", error);
      setReceiverName("STK không tồn tại!");
    } 
  }

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    settransferDTO( preTransferDTO => ({
      ...preTransferDTO,
      [name]: value
    }));
  };

  const handleTransfer = () => {
    // Kiểm tra dữ liệu đầu vào
    if (
      !transferDTO.cardNumber ||
      !transferDTO.money ||
      !transferDTO.content
    ) {
      alert("Vui lòng nhập đầy đủ Số tài khoản, Số tiền và Nội dung chuyển khoản.");
      return;
    }

    // Gọi API để thực hiện chuyển khoản
    fetchTransferData();
    console.log("Transfer initiated with data:", transferDTO);
    // Reset form or close modal after transfer
    setShowTransfer(false);
  };

  useEffect(() => {
    if (transferDTO.cardNumber) {
      const timer = setTimeout(() => {
        fetchUserByCardNumber(transferDTO.cardNumber);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setReceiverName("");
    }
  }, [transferDTO.cardNumber]);


  return (
    <div className="transfer-form">
      <hr className="transfer-divider" />
      <div className="transfer-user">
        <div className="transfer-avatar">AVA</div>
        <div>
          <div className="transfer-username">Bùi Quang Huy</div>
          <div className="transfer-balance-label">Số dư khả dụng</div>
          <div className="transfer-balance">1.000.000.000 VND</div>
        </div>
      </div>

      <TransferForm 
      transferDTO={transferDTO}
      handleInputChange={handleInputChange}
      setShowTransfer={setShowTransfer}
      handleTransfer={handleTransfer}
      receiverName={receiverName}
      />
      
    </div>
  );
};

export default Transfer;