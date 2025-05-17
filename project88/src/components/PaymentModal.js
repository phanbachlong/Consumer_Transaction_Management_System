import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';
import SuccessModal from './SuccessModal';
import FailureModal from './FailureModal';

const PaymentModal = ({ isOpen, onClose, billData }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  
  const handlePaymentClick = () => {
    setShowConfirmation(true);
  };
  
  const handleConfirm = () => {
    setShowConfirmation(false);
    
    // Giả lập xử lý thanh toán - 80% thành công, 20% thất bại
    const isSuccessful = Math.random() < 0.8;
    
    if (isSuccessful) {
      // Tạo mã giao dịch ngẫu nhiên
      const txnId = 'TXN' + Math.floor(Math.random() * 10000000).toString().padStart(8, '0');
      setTransactionId(txnId);
      setShowSuccess(true);
    } else {
      setShowFailure(true);
    }
  };
  
  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };
  
  const handleCloseSuccess = () => {
    setShowSuccess(false);
    onClose();
  };
  
  const handleCloseFailure = () => {
    setShowFailure(false);
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h2 className="text-xl font-bold">Thanh Toán Hóa Đơn Điện</h2>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Mã Hóa Đơn:</span>
            <span className="font-medium">{billData.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Thời gian:</span>
            <span className="font-medium">04/05/2025</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center">
            <div className="flex items-center w-full border border-gray-300 rounded p-3">
              <span className="flex-1">Thanh toán từ Số Dư <span className="font-medium">(1.000.000.000 VND)</span></span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">
          Bạn có chắc chắn muốn thanh toán hóa đơn này không? Sau khi thanh toán sẽ không thể hoàn tác.
        </p>
        
        <div className="flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Hủy
          </button>
          <button 
            onClick={handlePaymentClick}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Xác nhận thanh toán
          </button>
        </div>
      </div>
      
      <ConfirmationModal 
        isOpen={showConfirmation} 
        onClose={handleCancelConfirmation} 
        onConfirm={handleConfirm} 
      />
      
      <SuccessModal 
        isOpen={showSuccess} 
        onClose={handleCloseSuccess}
        transactionId={transactionId}
      />
      
      <FailureModal 
        isOpen={showFailure} 
        onClose={handleCloseFailure}
        errorMessage="Vui lòng kiểm tra số dư tài khoản của bạn"
      />
    </div>
  );
};

export default PaymentModal;




