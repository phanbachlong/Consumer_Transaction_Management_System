import React from "react";
import "../../styles/TransferForm.scss";

const TransferForm = ({setShowTransfer}) => {
  return (
    <div className="transfer-form">
      <div className="transfer-logo">LOGO</div>
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
          <input type="text" defaultValue="Techcombank" />
        </div>
        <div className="transfer-group">
          <label>STK chuyển</label>
          <input type="text" defaultValue="123323391232" />
        </div>
        <div className="transfer-group">
          <label>Tên người nhận</label>
          <input type="text" defaultValue="Phan Trọng Vinh" />
        </div>
        <div className="transfer-group">
          <label>Số tiền chuyển</label>
          <input type="text" defaultValue="1.000.000 VND" />
        </div>
        <div className="transfer-group">
          <label>Nội dung chuyển khoản</label>
          <input type="text" defaultValue="tiền nhiều vô cùng" />
        </div>
        <div className="transfer-actions">
          <button type="button" className="transfer-cancel" onClick={() => setShowTransfer(false)}>
            Hủy giao dịch
          </button>
          <button type="submit" className="transfer-submit">
            Chuyển Khoản
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransferForm;