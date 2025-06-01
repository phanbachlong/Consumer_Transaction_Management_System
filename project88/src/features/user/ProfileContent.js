import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../redux/slices/userSlice";
import { format } from "date-fns";
import EditEmployee from "../../components/EditEmployee";


const ProfileContent = () => {
    const dispatch = useDispatch();
    const { profile, loading } = useSelector((state) => state.profile);
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () => {
        setShowForm(!showForm);
    };

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
                        <>
                            {!showForm ? (
                                <div className="flex items-center m-8 w-400 min-w-[430px]">
                                    <div className="flex-none w-1/3 flex flex-col items-center text-center border-r border-gray-400">
                                        <img src="/download.jpg" className="w-40 h-40 rounded-full object-cover" />
                                        <div className="mt-8 font-bold text-xl">
                                            <p>{profile.profile.firstName} {profile.profile.lastName}</p>
                                        </div>
                                        <div className="mt-4 font-semibold text-xs">
                                            <p>{profile.profile.username}</p>
                                        </div>
                                    </div>
                                    <div className="flex-none w-2/3 ml-8">
                                        <div className="mb-12 font-bold text-sm">
                                            <p>Thông tin cá nhân</p>
                                        </div>
                                        <div className="mb-8 flex w-full">
                                            <div className="ml-12 flex-none">Email:</div>
                                            <div className="flex-none ml-auto mr-32">{profile.profile.email}</div>
                                        </div>
                                        <div className="mb-8 flex w-full">
                                            <div className="ml-12 flex-none">Birth:</div>
                                            <div className="flex-none ml-auto mr-32">{format(new Date(profile.profile.birth), 'dd-MM-yyyy')}</div>
                                        </div>
                                        <div className="mb-8 flex w-full">
                                            <div className="ml-12 flex-none">CCCD:</div>
                                            <div className="flex-none ml-auto mr-32">{profile.profile.cccd}</div>
                                        </div>
                                        <div className="mb-8 flex w-full">
                                            <div className="ml-12 flex-none">SDT:</div>
                                            <div className="flex-none ml-auto mr-32">{profile.profile.phone}</div>
                                        </div>
                                        <div className="mb-8 flex justify-end w-full">
                                            <button
                                                className="mt-4 w-1/4 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 mr-32"
                                                onClick={handleShowForm}
                                            >
                                                Chỉnh sửa thông tin
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <EditEmployee profile={profile.profile} onCancel={handleShowForm} />
                            )}
                        </>
                    ) : (
                        <div>Không tìm thấy thông tin người dùng.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileContent;
