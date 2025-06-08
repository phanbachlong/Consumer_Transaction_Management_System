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
import { useDispatch } from "react-redux";

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
  const [savingsTotal, setSavingsTotal] = useState(0);

  // Hàm format số tiền
  const formatAmount = (value) => {
    const cleanValue = value.toString().replace(/[^0-9]/g, "");
    return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const formatCurrency = (amount) => {
    return formatAmount(amount.toString()) + " VND";
  };

  // Hàm tính tiền lãi dựa trên thông tin từ API
  const calculateInterest = (depositAmount, interestRate, createDate) => {
    const startDate = new Date(createDate);
    const now = new Date();
    
    startDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    
    const daysPassed = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    const actualDaysPassed = Math.max(0, daysPassed);
    
    const yearlyInterest = (depositAmount * interestRate) / 100;
    const dailyInterest = yearlyInterest / 365;
    
    return Math.round(dailyInterest * actualDaysPassed);
  };

  // Fetch tổng tiền tiết kiệm
  const fetchSavingsTotal = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/deposits/user/${userID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        
        // Tính tổng tiền gốc và lãi
        const total = data
          .filter(deposit => deposit.status === 'ACTIVE')
          .reduce((sum, deposit) => {
            const principal = deposit.depositAmount || deposit.amount || 0;
            const interest = calculateInterest(
              principal,
              deposit.interestRate || 0,
              deposit.createDate
            );
            return sum + principal + interest;
          }, 0);
        
        setSavingsTotal(total);
      }
    } catch (error) {
      console.error("Error fetching savings total:", error);
      setSavingsTotal(0);
    }
  };

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

  // Callback sau khi gửi tiết kiệm hoặc tất toán
  const handleAfterDepositAction = () => {
    fetchSavingsTotal();
    fetchUserBalance();
    fetchTransaction();
  };

  useEffect(() => {
    fetchUserById();
    fetchUserBalance();
    fetchBills();
    fetchTransaction();
    fetchSavingsTotal();
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
                <div className="text-2xl font-bold">{formatCurrency(savingsTotal)}</div>
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
              onAfterDeposit={handleAfterDepositAction}
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
              onAfterRedeem={handleAfterDepositAction}
            />
          </div>
        </div>
      )}
    </main>
  );
};
export default UserContent;