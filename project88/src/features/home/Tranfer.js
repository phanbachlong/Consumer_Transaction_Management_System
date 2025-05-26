import React, { useState } from "react";
import "../../styles/TransferForm.scss";

const TransferForm = ({ setShowTransfer }) => {
  
  const [bank, setBank] = useState("Ngân hàng G88");
  const [accountNumber, setAccountNumber] = useState("123323391232");
  const [receiverName, setReceiverName] = useState("Phan Trọng Vinh");
  const [amount, setAmount] = useState("1.000.000 VND");
  const [content, setContent] = useState("tiền nhiều vô cùng");

  const handleTransfer = (e) => {
    e.preventDefault();
    alert("Chuyển khoản thành công");
    console.log("Transfer confirmed");
    console.log({
      bank,
      accountNumber,
      receiverName,
      amount,
      content
    });
    setShowTransfer(false);
  }

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

      <form>
        <div className="transfer-group">
          <label>Ngân hàng</label>
          <input
            type="text"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            readOnly
          />
        </div>
        <div className="transfer-group">
          <label>STK chuyển</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </div>
        <div className="transfer-group">
          <label>Tên người nhận</label>
          <input
            type="text"
            value={receiverName}
            onChange={(e) => setReceiverName(e.target.value)}
          />
        </div>
        <div className="transfer-group">
          <label>Số tiền chuyển</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="transfer-group">
          <label>Nội dung chuyển khoản</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="transfer-actions">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={() => setShowTransfer(false)}
          >
            Hủy giao dịch
          </button>
          <button type="button" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={handleTransfer}>
            Chuyển Khoản
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransferForm;