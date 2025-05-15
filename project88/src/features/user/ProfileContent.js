import React from "react";
import Form from "../../components/Form";

const ProfileContent = () => {

    const initialValues = {};

    return (
        <div className="flex-1 p-8 flex flex-col lg:flex-row gap-8 bg-gray-100">
            <div className="flex-1 space-y-8">
                <div className="bg-white p-6 rounded shadow">
                    <div className="flex items-center m-8 ">
                        <div className="flex-none w-1/3 flex flex-col items-center text-center border-r border-gray-400">
                            <img src="/download.jpg" className="w-40 h-40 rounded-full object-cover" />
                            <div className="mt-8 font-bold text-xl">
                                <p>Phan Trọng Vinh</p>
                            </div>
                            <button className="mt-4 w-1/2 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200">
                                Thay đổi ảnh
                            </button>
                        </div>
                        <div className="flex-none w-2/3 ml-8 ">
                            <div className="mb-12 font-bold text-sm">
                                <p>Thông tin cá nhân</p>
                            </div>
                            <div className="mb-8 flex w-full">
                                <div className="ml-12 flex-none" >Email:</div>
                                <div className="flex-none ml-auto mr-32">1phantrongvinh98@gmail.com </div>
                            </div>
                            <div className="mb-8 flex w-full">
                                <div className="ml-12 flex-none" >Username:</div>
                                <div className="flex-none ml-auto mr-32">phtrvinh</div>
                            </div>
                            <div className="mb-8 flex w-full">
                                <div className="ml-12 flex-none" >CCCD:</div>
                                <div className="flex-none ml-auto mr-32">123456789 </div>
                            </div>
                            <div className="mb-8 flex w-full">
                                <div className="ml-12 flex-none" >SDT:</div>
                                <div className="flex-none ml-auto mr-32">123456789 </div>
                            </div>

                            <div className="mb-8 flex justify-end w-full">
                                <button className="mt-4 w-1/4 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 mr-32">
                                    chỉnh sửa thông tin
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileContent;