import React, { useState } from 'react';
import ConfirmationPopup from './ConfirmationPopup';
import SuccessModal from './SuccessModal';

const DepositModal = ({ isOpen, onClose, customerData }) => {
  const [amount, setAmount] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  if (!isOpen) return null;

  const handleAmountChange = (e) => {
    // Chỉ cho phép nhập số
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
  };

  const handleDepositClick = () => {
    if (!amount || parseInt(amount) <= 0) return;
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    
    // Tạo mã giao dịch ngẫu nhiên
    const txnId = 'TXN' + Math.floor(Math.random() * 10000000).toString().padStart(8, '0');
    setTransactionId(txnId);
    setShowSuccess(true);
  };

  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setAmount('');
    onClose();
  };

  // Format số tiền với dấu chấm ngăn cách hàng nghìn
  const formatCurrency = (value) => {
    if (!value) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Nạp Tiền</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
            <span className="text-xl font-bold text-red-600">
              {customerData?.name ? customerData.name.split(' ').slice(-1)[0][0] : 'A'}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-lg">{customerData?.name || 'Nguyễn Văn A'}</h3>
            <p className="text-gray-600">{customerData?.accountNumber || '0123456789'}</p>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Nạp Tiền</label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Nhập số tiền cần nạp"
            value={formatCurrency(amount)}
            onChange={handleAmountChange}
          />
        </div>

        <button
          onClick={handleDepositClick}
          disabled={!amount || parseInt(amount) <= 0}
          className={`w-full py-3 rounded text-white text-lg font-medium ${
            !amount || parseInt(amount) <= 0 ? 'bg-red-300' : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          Nạp tiền
        </button>
      </div>

      <ConfirmationPopup
        isOpen={showConfirmation}
        onClose={handleCancelConfirmation}
        onConfirm={handleConfirm}
        amount={formatCurrency(amount)}
      />

      <SuccessModal
        isOpen={showSuccess}
        onClose={handleCloseSuccess}
        transactionId={transactionId}
        type="deposit"
      />
    </div>
  );
};

export default DepositModal;

