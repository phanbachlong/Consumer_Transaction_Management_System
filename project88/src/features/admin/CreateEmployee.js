import React from "react";
import Form from "../../components/Form";
import { CreateEmployeeValidation } from "../../validation/CreateEmployeeValidation";
import { useDispatch } from "react-redux";
import { createEmployee } from "../../redux/slices/employeeSlice";
import { toast } from "react-toastify";



const CreateEmployee = ({ onClose }) => {
    const initialValues = { firstName: "", lastName: "", username: "", email: "", gender: "", phone: "", cccd: "", birth: "" };
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        try {
            const res = await dispatch(createEmployee(data));
            toast.success("Tạo nhân viên thành công!");
            onClose(false);
        } catch (err) {
            toast.error("Tạo thất bại!");
            return { success: false };
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white relative">
            <h2 className="text-xl font-bold mb-4">Tạo nhân viên</h2>

            <Form onSubmit={onSubmit} initialValues={initialValues} btn="Tạo mới" validation={CreateEmployeeValidation}  ></Form>
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

export default CreateEmployee;