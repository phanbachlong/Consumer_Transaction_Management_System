const TransferForm = (props) => { 
  return (
    <>
    <form>
        <div className="transfer-group">
          <label>Ngân hàng</label>
          <input
            type="text"
            value="Ngân hàng G88"
            readOnly
          />
        </div>
        <div className="transfer-group">
          <label>STK chuyển</label>
          <input
            type="text"
            value={props.transferDTO.cardNumber || ''}
            placeholder="Nhập số tài khoản"
            name="cardNumber"
            onChange={props.handleInputChange}
          />
        </div>
        <div className="transfer-group">
          <label>Tên người nhận</label>
          <input
            type="text"
            value={props.receiverName || ''}
            readOnly
          />
        </div>
        <div className="transfer-group">
          <label>Số tiền chuyển</label>
          <input
            type="text"
            value={props.transferDTO.money || ''}
            name="money"
            onChange={props.handleInputChange}
          />
        </div>
        <div className="transfer-group">
          <label>Nội dung chuyển khoản</label>
          <input
            type="text"
            value={props.transferDTO.content || ''}
            name="content"
            onChange={props.handleInputChange}
          />
        </div>
        <div className="transfer-actions">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={() => props.setShowTransfer(false)
            }
          >
            Hủy giao dịch
          </button>

          <button type="button" className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick= {props.handleTransfer}>
            Chuyển Khoản
          </button>
        </div>
      </form>
    </>
  )
    
};

export default TransferForm;