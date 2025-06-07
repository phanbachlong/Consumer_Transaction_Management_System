import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import Form from "../../components/Form";
import { Validation } from "../../validation/Validation";
import { register } from "../../redux/slices/registerSlice"

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialValues = { username: '', firstName: '', lastName: '', email: '', birth: '', cccd: '', gender: '', phone: '', password: '', confirmPassword: '' };


    const onSubmit = (dataForm) => {
        dispatch(register(dataForm)).then((rs) => {
            if (rs.payload) {
                alert("dk thanh cong")
                navigate('/login');
            }
        })
        // console.log(dataForm)
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6">Đăng Ký</h1>
                <Form onSubmit={onSubmit} initialValues={initialValues} btn="Đăng Ký" validation={Validation}></Form>
                <div className="mt-4 text-center">
                    <pp
                        className="text-sm text-gray-500 hover:underline"
                    >
                        Đã có tài khoản?
                    </pp>
                    <button
                        onClick={() => navigate('/login')}
                        className="text-sm text-red-600 font-medium hover:underline"
                    >
                        Đăng nhập
                    </button>

                </div>
            </div>

        </div>
    )
}

export default Register;