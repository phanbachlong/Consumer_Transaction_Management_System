import React, { useState } from "react";
import PaymentModal from "../../components/PaymentModal";
const Bills = (props) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedBill, setSelectedBill] = useState([]);
    return (
        <div className="w-full lg:w-1/5 space-y-4">
            {props.data.map((bill) => (
                <div className="p-4 bg-white shadow rounded" key={bill.billId}>
                    <div className="text-lg font-bold">{bill.billName}</div>
                    <div className="text-gray-500 mt-2">
                        Mã HD: {bill.billId}
                        <br />
                        Số tiền cần thanh toán: {Number(bill.billAmount).toLocaleString("de-DE")} VND
                    </div>
                    <button
                        className="mt-4 w-full px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                    onClick={() => {
                        setSelectedBill(bill);
                        setShowModal(true)}}
                    >
                        Thanh Toán
                    </button>
                </div>
            ))}
            {showModal && (
                <PaymentModal
                    balance={props.balance}
                    bill={selectedBill}
                    onClose={() => setShowModal(false)}
                    fetchPayBill={props.fetchPayBill}
                />
            )}
        </div>
    );
}
export default Bills;