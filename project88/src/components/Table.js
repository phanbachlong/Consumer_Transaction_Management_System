import { format } from "date-fns";
import React from "react";

const Table = ({ initialValues, content, onTopUp, onEditUp }) => {

    const formatDate = (value) => {
        const date = new Date(value);
        // Kiểm tra nếu `value` là ngày hợp lệ
        return isNaN(date.getTime()) ? value : format(date, 'dd-MM-yyyy HH:mm:ss');
    };

    const hasActionsColumn = Object.keys(initialValues).includes("Thao tác");

    return (
        <table className="min-w-full" style={{ minHeight: "240px" }} initialValues={initialValues} content={content}>
            <thead>
                <tr className="bg-gray-50">

                    {Object.keys(initialValues).filter(filed => filed != "Thao tác").map((field, index) => (
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" key={index}>{field}</th>
                    ))}
                    {hasActionsColumn && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>}
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {content.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                        {Object.entries(row).map(([key, value], i) => (
                            <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 truncate overflow-hidden whitespace-nowrap">
                                {key === "createDate" ? formatDate(value) : key === "endBalance" || key === "balance" || key === "fee" ? Number(value).toLocaleString("de-DE") : value}
                            </td>
                        ))}

                        {hasActionsColumn && (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 ">
                                {/* Edit icon */}
                                <button
                                    type="button"
                                    className=" p-1 rounded-full hover:bg-gray-200 active:bg-gray-300 transition"
                                    title="Chỉnh sửa"
                                    onClick={() => onEditUp(row)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>

                                {/* Top Up icon */}
                                <button
                                    type="button"
                                    className=" p-1 rounded-full hover:bg-gray-200 active:bg-gray-300 transition"
                                    title="Giao dịch"
                                    //onClick={() => setShowTopUp(true)}
                                    onClick={() => onTopUp(row)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </button>
                            </td>
                        )}
                    </tr>
                ))}
                {/* Thêm dòng trống nếu thiếu */}
                {Array.from({ length: 5 - content.length }).map((_, idx) => (
                    <tr key={`empty-${idx}`}>
                        <td colSpan={Object.keys(initialValues).length} className="h-12"></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
export default Table;