import React from 'react';

const FailureModal = ({ isOpen, onClose, errorMessage }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <div className="flex flex-col items-center mb-4">
          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-center">Không đủ số dư</h2>
        </div>
        
        <p className="text-gray-600 text-center mb-6">
          {errorMessage || 'Vui lòng kiểm tra số dư tài khoản của bạn'}
        </p>
        
        <div className="flex justify-center">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default FailureModal;