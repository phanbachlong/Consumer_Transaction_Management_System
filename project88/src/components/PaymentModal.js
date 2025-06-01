import React, { useState } from 'react';


const PaymentModal = ({ bill, balance, onClose, fetchPayBill}) => {
  
 
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <h2 className="text-xl font-bold">{bill?.billName}</h2>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Mã Hóa Đơn:</span>
            <span className="font-medium">{bill?.billId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Thời gian:</span>
            <span className="font-medium">{bill?.createDate}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center">
            <div className="flex items-center w-full border border-gray-300 rounded p-3">
              <span className="flex-1">
                Thanh toán từ Số Dư <span className="font-medium">({Number(balance).toLocaleString("de-DE")} VND)</span>
              </span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">
          Bạn có chắc chắn muốn thanh toán hóa đơn này không? Sau khi thanh toán sẽ không thể hoàn tác.
        </p>
        
        <div className="flex justify-end space-x-3">
          <button 
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Hủy
          </button>
          <button 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={async () => {
              await fetchPayBill(bill?.billId);
              onClose();
            }}
          >
            Xác nhận thanh toán
          </button>
        </div>
      </div>
      
      {/* <ConfirmationModal />
      
      <SuccessModal/>
      
      <FailureModal/> */}
    </div>
  );
};

export default PaymentModal;





