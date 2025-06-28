import React, { useState } from "react";
import Form from "./Form";
import { EditUserValidation } from "../validation/EditUserValidatiion";
import UserApi from "../api/UserApi";
import { debounce } from "lodash";
import { editUserByEmployee, getAllUsers } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { getAllEmployees } from "../redux/slices/employeeSlice";
import { toast } from "react-toastify";



const EditUserModal = ({ user, onClose, onSave }) => {

    const initialValues = { email: user?.email || "", phone: user?.phone || "" };

    const dispatch = useDispatch();


    const onSubmit = async (dataForm) => {
        // 1. So sánh và lọc chỉ những trường thay đổi
        const patchData = {};
        for (const key in dataForm) {
            if (dataForm[key] !== initialValues[key]) {
                patchData[key] = dataForm[key];
            }
        }

        // 2. Nếu không có trường nào thay đổi
        if (Object.keys(patchData).length === 0) {
            toast.info("Không có thay đổi nào để cập nhật.");
            return { success: false };
        }

        try {
            // 3. Gửi chỉ dữ liệu thay đổi
            await dispatch(editUserByEmployee({ userID: user?.userID, body: patchData }));
            toast.success("Cập nhật thành công! Kiểm tra email để active nếu có thay đổi email");

            await dispatch(getAllUsers({ page: 1, size: 5, filter: { name: "" } }));
            await dispatch(getAllEmployees({ page: 1, size: 5, filter: { name: "" } }));

            onClose(false);
            return { success: true };
        } catch (error) {
            console.error("Lỗi khi submit:", error);
            toast.error("Cập nhật thất bại!");
            return { success: false };
        }
    };



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
            <Form onSubmit={onSubmit} initialValues={initialValues} btn="Cập nhật" validation={EditUserValidation(user?.email, user?.phone)} ></Form>
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