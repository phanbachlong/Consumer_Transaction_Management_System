import React from 'react';

const ConfirmationPopup = ({ isOpen, onClose, onConfirm, amount }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Xác nhận nạp tiền</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">
          Bạn có chắc chắn muốn nạp số tiền {amount} VND không?
        </p>
        
        <div className="flex justify-between space-x-3">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
          >
            Hủy
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
