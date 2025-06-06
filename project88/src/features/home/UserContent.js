import React, { useEffect, useState } from "react";
import Transaction from "../user/Transaction";
import Transfer from "./Transfer";
import Deposit from "./Deposit";
import Redeem from "./Redeem";
import UserAPIv2 from "../../api/UserAPIv2";
import Bills from "./Bills";
import TransactionService from "../user/TransactionService";
import transactionApi from "../../api/TransactionAPI";
import { transaction } from "../../redux/slices/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import Search from "../../components/Search";
import MyDatePicker from "../../components/MyDatePicker";
import { set } from "lodash";
import Pagination from "../../components/Pagination";

const UserContent = () => {
  const userID = localStorage.getItem("userId");
  const dispatch = useDispatch();


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
      fetchTransaction();
    }
    catch (error) {
      alert(error.response?.data?.message || "Error paying bill");
      console.error("Error paying bill:", error);
    }
  }

  const fetchTransaction = async () => {
    try {
      const response = await dispatch(transaction(userID));
      if (response && response.data) {
        console.log("Transactions fetched successfully:", response.data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }

  const handleAfterTransfer = () => {
    fetchTransaction()
    fetchUserBalance();
  };

  useEffect(() => {
    fetchUserById();
    fetchUserBalance();
    fetchBills();
    fetchTransaction();
  }, []);

  const [params, setParams] = useState("")
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isReset, setIsReset] = useState(false);

  const today = new Date();
  const startToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const endToday = new Date(today);
  endToday.setHours(23, 59, 59, 999);

  const handleResetTable = () => {
    setIsReset(true);
    setParams("");
    setStartDate(null);
    setEndDate(null);
    setTimeout(() => setIsReset(false), 0);
  }

  const { totalPages, totalElements, currentPage } = useSelector((state) => state.transaction);
  const [page, setPage] = useState(1);

  const onPageChange = (currentPage) => {
    setPage(currentPage);
  }

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
          <div className="flex justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">Từ ngày</span>
              <MyDatePicker value={startDate} onChange={(date) => { setStartDate(date) }} typeDate={startToday}></MyDatePicker>
              <span className="text-gray-500">đến</span>
              <MyDatePicker value={endDate} onChange={(date) => setEndDate(date)} typeDate={endToday}></MyDatePicker>
            </div>
            <Search onChangeSearch={setParams} isReset={isReset}></Search>
          </div>
          <Transaction userID={userID} params={params} startDate={startDate} endDate={endDate} currentPage={page}></Transaction>

          {/* Page */}
          <div className="flex justify-between items-center mt-4">
            <button className="px-4 py-2 bg-gray-100 bg-red-100 text-red-600 rounded hover:bg-red-200" onClick={handleResetTable}>
              Tải lại
            </button>
            <Pagination totalPages={totalPages} onPageChange={onPageChange}></Pagination>
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