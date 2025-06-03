import React from "react";

const DeleteConfirmationModal = ({ employeeToDelete, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-red-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Xác nhận xóa tài khoản
            </h3>
            <p className="text-sm text-gray-600">
              Hành động này không thể hoàn tác
            </p>
          </div>
        </div>

        {employeeToDelete && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700">
              Thông tin nhân viên:
            </p>
            <p className="text-sm text-gray-600">ID: {employeeToDelete.id}</p>
            <p className="text-sm text-gray-600">Tên: {employeeToDelete.name}</p>
          </div>
        )}

        <p className="text-gray-700 mb-6">
          Bạn có chắc chắn muốn xóa tài khoản nhân viên{" "}
          <strong>{employeeToDelete?.name}</strong> không?
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
            aria-label="Hủy xóa tài khoản"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            aria-label="Xác nhận xóa tài khoản"
          >
            Xóa tài khoản
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;