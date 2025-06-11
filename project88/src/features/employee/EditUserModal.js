import React, { useState } from "react";
import Form from "../../components/Form";
import { EditUserValidation } from "../../validation/EditUserValidatiion";


const EditUserModal = ({ user, onClose, onSave }) => {

    const initialValues = { email: user?.email || "", phone: user?.phone || "" };

    const onSubmit = (dataForm) => {
        if (dataForm.email === user.email && dataForm.phone === user.phone) {
            onClose(false);
            return;
        } else {
            console.log("Thông tin người dùng đã được cập nhật:", dataForm);

        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white relative">
            <h2 className="text-xl font-bold mb-4">Chỉnh sửa thông tin người dùng</h2>
            <div className="flex items-center bg-gray-100 rounded-lg mb-6 p-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center font-bold text-orange-500 text-xl mr-4">
                    A
                </div>
                <div>
                    <div className="font-bold text-base">{user?.fullName}</div>
                    <div className="text-gray-600 text-sm">STK: {user?.cardNumber}</div>
                </div>
            </div>
            <Form onSubmit={onSubmit} initialValues={initialValues} btn="Cập nhật" validation={EditUserValidation}></Form>
            <button
                type="button"
                className="w-full mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                onClick={() => onClose(false)}
            >
                Hủy
            </button>
        </div>
    )
}

export default EditUserModal;