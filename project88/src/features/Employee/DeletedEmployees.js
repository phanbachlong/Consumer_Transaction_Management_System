import React, { useEffect, useState } from "react";
import { BiUndo } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

const DeletedEmployees = () => {
    const [deletedEmployees, setDeletedEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchDeletedEmployees = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:8080/api/v1/employees/delete");
            if (!response.ok) throw new Error("Lỗi khi lấy dữ liệu nhân viên đã xóa");
            const data = await response.json();
            setDeletedEmployees(data.content || data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeletedEmployees();
    }, []);

    const handleRestore = async (userID) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/employees/${userID}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: 0 }),
            });
            if (!response.ok) throw new Error("Lỗi khi khôi phục nhân viên");
            await fetchDeletedEmployees();
        } catch (err) {
            alert("Khôi phục thất bại: " + err.message);
        }
    };

    const handlePermanentDelete = async (userID) => {
        const result = await Swal.fire({
            title: "Xác nhận xóa?",
            text: "Bạn có chắc muốn xóa vĩnh viễn nhân viên này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xóa",
            cancelButtonText: "Hủy",
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/employees/delete/${userID}`, {
                    method: "DELETE",
                });
                if (!response.ok) throw new Error("Lỗi khi xóa vĩnh viễn nhân viên");
                await fetchDeletedEmployees();
            } catch (err) {
                Swal.fire("Lỗi", "Xóa thất bại: " + err.message, "error");
            }
        }
    };

    if (loading)
        return <div className="p-4 text-center text-gray-600">Đang tải danh sách nhân viên đã xóa...</div>;
    if (error)
        return (
            <div className="p-4 text-center text-red-600 font-semibold">
                Lỗi: {error}
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
                    Danh sách nhân viên đã bị xóa
                </h1>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                Username
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                First Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                Last Name
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                CCCD
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap max-w-[200px]">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                Phone
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                Gender
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                Actions
                            </th>
                        </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200 text-sm text-gray-900">
                        {deletedEmployees.length === 0 ? (
                            <tr>
                                <td colSpan="10" className="text-center py-8 text-gray-400 italic">
                                    Không có nhân viên nào bị xóa.
                                </td>
                            </tr>
                        ) : (
                            deletedEmployees.map((emp) => (
                                <tr
                                    key={emp.userID}
                                    className="hover:bg-gray-50 transition-colors duration-150"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap">{emp.userID}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{emp.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{emp.firstName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{emp.lastName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{emp.cccd}</td>
                                    <td className="px-6 py-4 max-w-[200px] truncate">{emp.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{emp.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{emp.gender}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-red-600 font-semibold">
                                        {emp.status === 2 ? "Đã xóa" : emp.status}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center space-x-4">
                                        <button
                                            onClick={() => handleRestore(emp.userID)}
                                            className="text-green-600 hover:text-green-800 transition"
                                            title="Khôi phục"
                                        >
                                            <BiUndo size={24} />
                                        </button>
                                        <button
                                            onClick={() => handlePermanentDelete(emp.userID)}
                                            className="text-red-600 hover:text-red-800 transition"
                                            title="Xóa vĩnh viễn"
                                        >
                                            <MdDeleteForever size={24} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DeletedEmployees;
