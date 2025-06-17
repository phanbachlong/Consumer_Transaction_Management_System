import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../redux/slices/userSlice";
import { format, set } from "date-fns";
import EditEmployee from "../employee/EditEmployee";
import UserApi from "../../api/UserApi";
import { useNavigate } from "react-router-dom";



const ProfileContent = () => {
    const dispatch = useDispatch();
    const { profile, loading } = useSelector((state) => state.profile);
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click(); // Mở cửa sổ chọn file
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setPreview(URL.createObjectURL(selectedFile));
        // TODO: Gọi API upload nếu muốn upload ngay
    }



    const handleShowForm = () => {
        setShowForm(!showForm);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        if (!file) {
            alert("Vui lòng chọn ảnh để cập nhật!")
            return
        };

        formData.append("avatarUrl", file);

        const res = await UserApi.updateProfile(formData);
        console.log(res);

        setImageUrl(res.data); // đường dẫn từ server
        alert("Cập nhật thông tin thành công!");
        navigate("/homepage"); // Điều hướng về homepage

    }

    useEffect(() => {
        dispatch(userProfile());
    }, [dispatch]);

    if (loading) {
        return <div className="p-8">Đang tải thông tin...</div>;
    }

    return (
        <div className="flex-1 p-8 flex flex-col lg:flex-row gap-8 bg-gray-100">
            <div className="flex-1 space-y-8">
                <div className="bg-white p-6 rounded shadow">
                    {profile ? (
                        <div className="flex items-center m-8 w-400 min-w-[430px]">
                            <div className="flex-none w-1/3 flex flex-col items-center text-center border-r border-gray-400">
                                <img src={preview ? preview : `./${profile.profile.avatarUrl}`} className="w-40 h-40 rounded-full object-cover" />
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                                <div className="mt-8 font-bold text-xl">
                                    <p>{profile.profile.firstName} {profile.profile.lastName} </p>
                                </div>
                                <div className="mt-4 font-semibold text-xs">
                                    <p>{profile.profile.username}</p>
                                </div>
                                {showForm && (
                                    <button
                                        type="button"
                                        className="mt-4 w-1/2 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                                        onClick={handleButtonClick}
                                    >
                                        Thay đổi ảnh
                                    </button>
                                )}
                            </div>
                            <div className="flex-none w-2/3 ml-8 ">
                                <div className="mb-12 font-bold text-sm">
                                    <p>Thông tin cá nhân</p>
                                </div>
                                <div className="mb-8 flex w-full">
                                    <div className="ml-12 flex-none" >Số tài khoản:</div>
                                    <div className="flex-none ml-auto mr-32">{profile.profile.cardNumber} </div>
                                </div>
                                <div className="mb-8 flex w-full">
                                    <div className="ml-12 flex-none" >Email:</div>
                                    <div className="flex-none ml-auto mr-32">{profile.profile.email} </div>
                                </div>
                                <div className="mb-8 flex w-full">
                                    <div className="ml-12 flex-none" >birth:</div>
                                    <div className="flex-none ml-auto mr-32">{format(new Date(profile.profile.birth), 'dd-MM-yyyy')}</div>
                                </div>
                                <div className="mb-8 flex w-full">
                                    <div className="ml-12 flex-none" >CCCD:</div>
                                    <div className="flex-none ml-auto mr-32">{profile.profile.cccd} </div>
                                </div>
                                <div className="mb-8 flex w-full">
                                    <div className="ml-12 flex-none" >SDT:</div>
                                    <div className="flex-none ml-auto mr-32">{profile.profile.phone} </div>
                                </div>

                                {showForm === false ? (
                                    <div className="mb-8 flex justify-end w-full">
                                        <button className="mt-4 w-1/4 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 mr-32" onClick={handleShowForm}>
                                            chỉnh sửa thông tin
                                        </button>
                                    </div>
                                ) : (
                                    <div className="mb-8 flex justify-end w-full">
                                        <button className="mt-4 w-1/4 px-4 py-2 bg-gray-100 text-red-600 rounded hover:bg-red-200 mr-8" onClick={handleShowForm}>
                                            Hủy bỏ
                                        </button>
                                        <button className="mt-4 w-1/4 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 mr-32" onClick={handleSubmit}>
                                            Cập nhật
                                        </button>
                                    </div>

                                )}

                            </div>
                        </div>
                    ) : (
                        <div>{loading}</div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default ProfileContent;
