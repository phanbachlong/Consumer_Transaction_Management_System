import React, { useState, useEffect } from "react";
import "../../styles/TransferForm.scss";
import TransferForm from "../../components/TransferForm";
import UserAPIv2 from "../../api/UserAPIv2";
import TransferUserBalance from "../../components/TranferUserBalance";

const Transfer = ({ setShowTransfer, onAfterTransfer }) => {

  const userID = 1;

  const [transferDTO, settransferDTO] = useState({
    senderID: userID,
    cardNumber: null,
    money: null,
    content:""
  }
  );

  const [userBalance, setUserBalance] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    balance: 0
  });

  const [receiverName, setReceiverName] = useState("");

  const fetchUserBalance = async () => {
    try {
      const response = await UserAPIv2.FindUserById(userID);
      if (response && response.data) {
        setUserBalance({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          fullName: `${response.data.lastName} ${response.data.firstName}`,
          balance: response.data.balance
        });
      } else {
        console.error("No user data found.");
      }
    } catch (error) {
      console.error("Error fetching user balance:", error);
    }
  }
  const fetchTransferData = async () => {
    try {
      const response = await UserAPIv2.Transfer(transferDTO);
      alert("Chuyển khoản thành công!");
      console.log("Transfer successful:", response);
      if (onAfterTransfer) onAfterTransfer();
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

  useEffect(() => {
    fetchUserBalance();
  }, []);

  return (
    <div className="transfer-form">

      <TransferUserBalance userBalance = {userBalance} />

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