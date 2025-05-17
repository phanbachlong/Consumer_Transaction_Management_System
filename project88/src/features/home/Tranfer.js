import React from "react";
import "../../styles/TransferForm.scss";

const TransferForm = () => {
  return (
    <div className="transfer-form">
      <div className="logo">LOGO</div>
      <hr />

      <div className="user-info">
        <div className="avatar">AVA</div>
        <div className="info">
          <div className="name"><strong>Bùi Quang Huy</strong></div>
          <div className="balance-label">Số dư khả dụng</div>
          <div className="balance">1.000.000.000 VND</div>
        </div>
      </div>

      <form className="form">
        <label>
          Ngân hàng / icon
          <input type="text" value="Techcombank" />
          </label>
        <label>
          STK chuyển
          <input type="text" value="123323391232" />
        </label>
        <label>
          Tên người nhận
          <input type="text" value="Phan Trọng Vinh" />
        </label>
        <label>
          Số tiền chuyển
          <input type="text" value="1.000.000 VND" />
        </label>
        <label>
          Nội dung chuyển khoản
          <input type="text" value="tiền nhiều vô cùng" />
        </label>
        <div className="buttons">
          <button className="cancel" type="button">Hủy giao dịch</button>
          <button className="submit" type="submit">Chuyển Khoản</button>
        </div>
        <button
          type="submit"
          className="w-full bg-red-100 text-red-600 py-2 px-4 rounded-md hover:bg-red-200 transition"
        >
          Xác nhận
        </button>
      </form>
    </div>
  );
};

export default TransferForm;