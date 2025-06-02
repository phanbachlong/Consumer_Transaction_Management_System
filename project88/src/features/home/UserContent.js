import React, { useEffect, useState } from "react";
import Transaction from "../user/Transaction";
import Transfer from "./Transfer";
import Deposit from "./Deposit";
import Redeem from "./Redeem";
import UserAPIv2 from "../../api/UserAPIv2";
import Bills from "./Bills";

const UserContent = () => {
  const userID = localStorage.getItem("userId");


  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    fullname: "",
    username: "",
    balance: null
  });

  const [showTransfer, setShowTransfer] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showRedeem, setShowRedeem] = useState(false);
  const [balance, setBalance] = useState(0);
  const [bills, setBills] = useState([]);


  const fetchUserById = async () => {
    try {
      const response = await UserAPIv2.FindUserById(userID);
      if (response && response.data) {
        setUser({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          fullname: `${response.data.lastName} ${response.data.firstName}`,
          username: response.data.username,
          balance: response.data.balance
        });
      }
    } catch (error) {
      console.error("Error fetching user by ID:", error);
    }
  }

  const fetchUserBalance = async () => {
    try {
      const response = await UserAPIv2.FindUserById(userID);
      if (response && response.data) {
        setBalance(response.data.balance);
      }
    } catch (error) {
      console.error("Error fetching user balance:", error);
    }
  }


  const fetchBills = async () => {
    try {
      const response = await UserAPIv2.GetBillsByUserId(userID);
      if (response && response.data) {
        setBills(response.data);
        console.log("Bills fetched successfully:", response.data);
      }
    } catch (error) {
      console.error("Error fetching bills:", error);

    }
  }

  const fetchPayBill = async (billId) => {
    try {
      const response = await UserAPIv2.PayBill(billId);
      alert("Thanh toán thành công!");
      console.log("Bill paid successfully:", response.data);
      fetchBills();
      fetchUserBalance();
    }
    catch (error) {
      alert(error.response?.data?.message || "Error paying bill");
      console.error("Error paying bill:", error);
    }
  }

  const handleAfterTransfer = () => {
    fetchUserBalance();
  };

  useEffect(() => {
    fetchUserById();
    fetchUserBalance();
    fetchBills();
  }, []);

  return (
    <main className="flex-1 p-8 flex flex-col lg:flex-row gap-8 bg-gray-100">
      {/* Left Section */}
      <div className="flex-1 space-y-8">
        {/* User Info */}
        <div className="bg-white p-6 rounded shadow">
          <div className="flex items-center space-x-4 ">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-xl font-bold text-red-600">
              AVA
            </div>
            <div>
              <h2 className="text-xl font-bold">{user.fullname}</h2>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex w-full mt-5 justify-between space-x-4">
              <div className="flex-1 text-center bg-white p-6 rounded shadow">
                <div className="text-gray-500 ">Số dư</div>
                <div className="text-2xl font-bold">
                  {Number(balance).toLocaleString("de-DE")}
                </div>
                <div className="flex justify-between space-x-4 mt-2">
                  <button className="w-full px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200"
                    onClick={() => setShowTransfer(true)}>
                    Chuyển khoản
                  </button>
                </div>
              </div>
              <div className="flex-1 text-center bg-white p-6 rounded shadow">
                <div className="text-gray-500 ">Tiết kiệm</div>
                <div className="text-2xl font-bold">1.000.000.000 VND</div>
                <div className="flex justify-between space-x-4 mt-2">
                  <button className="w-1/2 h-12 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 overflow-hidden whitespace-nowrap text-ellipsis"
                    onClick={() => setShowDeposit(true)}>
                    Gửi
                  </button>
                  <button className=" w-1/2 h-12 px-4 py-2 bg-red-100 text-red-600 rounded hover:bg-red-200 overflow-hidden whitespace-nowrap text-ellipsis"
                    onClick={() => setShowRedeem(true)}>
                    Rút
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg font-bold mb-4">Lịch sử giao dịch</h3>
          <Transaction userID={userID}></Transaction>

          {/* Page */}
          <div className="text-right mt-4">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              First
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              1
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              2
            </button>
            <span className="px-4 py-2">...</span>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              5
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              Last
            </button>
          </div>
        </div>
      </div>

      {/* Thanh toán hóa đơn */}
      <Bills
        data={bills}
        balance={balance}
        fetchPayBill={fetchPayBill}
      />

      {/* Transfer Modal */}
      {showTransfer && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-full p-6">
            <Transfer
              setShowTransfer={setShowTransfer}
              onAfterTransfer={handleAfterTransfer}
            />
          </div>
        </div>
      )}

      {/* Deposit Modal */}
      {showDeposit && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-full p-6">
            <Deposit
              setShowDeposit={setShowDeposit}
            />
          </div>
        </div>
      )}

      {/* Redeem Modal */}
      {showRedeem && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="w-full p-6">
            <Redeem
              setShowRedeem={setShowRedeem}
            />
          </div>
        </div>
      )}
    </main>
  );
};
export default UserContent;