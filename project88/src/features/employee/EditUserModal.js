import React, { useState } from "react";
import Form from "../../components/Form";
import { EditUserValidation } from "../../validation/EditUserValidatiion";
import UserApi from "../../api/UserApi";
import { debounce } from "lodash";


const EditUserModal = ({ user, onClose, onSave }) => {

    const initialValues = { email: user?.email || "", phone: user?.phone || "" };


    const handleWatchChange = React.useCallback(
        debounce(async ({ email, phone, setError, clearErrors }) => {
            if (!email || email === user?.email) {
                clearErrors("email");
                return;
            }
            if (!phone || phone === user?.phone) {
                clearErrors("phone");
                return;
            }

            try {
                const resEmail = await UserApi.isExistEmail(email);
                const resPhone = await UserApi.isExistPhone(phone);
                if (resEmail.data === true) {
                    setError("email", {
                        type: "manual",
                        message: "Email đã tồn tại",
                    });
                } else {
                    clearErrors("email");
                }
                if (resPhone.data === true) {
                    setError("phone", {
                        type: "manual",
                        message: "Số điện thoại đã tồn tại",
                    });
                } else {
                    clearErrors("phone");
                }
            } catch (error) {
                console.error("Lỗi kiểm tra email:", error);
            }
        }, 500),
        [user?.email, user?.phone]
    );

    const onSubmit = async (dataForm) => {
        try {
            if (dataForm.email !== user?.email) {
                const res = await UserApi.isExistEmail(dataForm.email);
                if (res.data === true) {
                    // setError được gọi ở Form rồi → không cần ở đây nữa
                    return { success: false };
                }
            }
            if (dataForm.phone !== user?.phone) {
                const res = await UserApi.isExistPhone(dataForm.phone);
                if (res.data === true) {
                    // setError được gọi ở Form rồi → không cần ở đây nữa
                    return { success: false };
                }
            }

            console.log("SUBMIT:", dataForm);
            onClose(false);
            return { sucess: true }
        } catch (error) {
            console.error("Lỗi khi submit:", error);
            return { sucess: false }
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
            <Form onSubmit={onSubmit} initialValues={initialValues} btn="Cập nhật" validation={EditUserValidation} onWatchChange={handleWatchChange}></Form>
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