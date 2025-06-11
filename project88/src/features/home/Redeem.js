import React, { useState, useEffect } from "react";
import UserAPIv2 from "../../api/UserAPIv2";
import DepositAPI from "../../api/DepositAPI";

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

// Hàm tính số ngày còn lại
const calculateDaysLeft = (createDate, termMonths) => {
  const startDate = new Date(createDate);
  const endDate = new Date(startDate);

  if (!termMonths || termMonths <= 0) {
    return 0;
  }

  endDate.setMonth(endDate.getMonth() + termMonths);

  const now = new Date();

  // Reset time
  endDate.setHours(23, 59, 59, 999); // End of day
  now.setHours(0, 0, 0, 0); // Start of day

  const daysLeft = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
  return Math.max(0, daysLeft);
};

export default function Redeem({ setShowRedeem, onRedeemSuccess }) {
  const userId = localStorage.getItem("userId") || 1;

  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loadingBalance, setLoadingBalance] = useState(true);

  // Fetch balance
  useEffect(() => {
    const fetchUserBalance = async () => {
      setLoadingBalance(true);
      try {
        const response = await UserAPIv2.FindUserById(userId);
        console.log(response.data.balance);

        if (response && response.data) {
          setBalance(response.data.balance);
        }
      } catch (err) {
        console.error("Lỗi khi lấy balance:", err);
        setError("Không thể lấy thông tin số dư");
        setBalance(0);
      } finally {
        setLoadingBalance(false);
      }
    };

    if (userId) {
      fetchUserBalance();
    }
  }, [userId]);

  // Fetch dữ liệu sổ tiết kiệm
  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        setLoading(true);
        const response = await DepositAPI.getDeposit();
        console.log(response.data);


        if (!response) {
          throw new Error("Không thể tải dữ liệu sổ tiết kiệm");
        }

        const rs = response.data;

        // Transform data
        const transformedData = rs
          .map((deposit) => {
            const depositAmount = deposit.depositAmount || deposit.amount || 0;
            const interestRate = deposit.interestRate || 0;
            const termMonths = deposit.termMonths || deposit.term || 0;
            const createDate = deposit.createDate;

            if (!createDate || !depositAmount || !interestRate) {
              console.warn("Invalid deposit data:", deposit);
            }

            return {
              id: deposit.depositId || deposit.id,
              name: deposit.depositName || deposit.accountName,
              principal: depositAmount,
              interest: calculateInterest(
                depositAmount,
                interestRate,
                createDate
              ),
              term: termMonths,
              daysLeft: calculateDaysLeft(createDate, termMonths),
              interestRate: interestRate,
              createDate: createDate,
              transactionId: deposit.transactionId,
            };
          })
          .filter(
            (deposit) => deposit.principal > 0 && deposit.interestRate > 0
          );

        setDeposits(transformedData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching deposits:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchDeposits();
    }
  }, [userId]);

  // Tính tổng tiền gốc và lãi
  const totalAmount = deposits.reduce(
    (sum, item) => sum + item.principal + item.interest,
    0
  );

  const handleRedeem = async (deposit) => {
    if (
      window.confirm(`Bạn có chắc chắn muốn tất toán sổ "${deposit.name}"?`)
    ) {
      try {
        const currentInterest = calculateInterest(
          deposit.principal,
          deposit.interestRate,
          deposit.createDate
        );

        const response = await fetch(
          `http://localhost:8080/api/v1/deposits/${deposit.id}/redeem`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              redeemDate: new Date().toISOString().split("T")[0],
              interestAmount: currentInterest,
              userId: userId,
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(errorData || "Không thể thực hiện tất toán");
        }

        setDeposits((prev) => prev.filter((d) => d.id !== deposit.id));

        const balanceResponse = await fetch(
          `http://localhost:8080/api/v1/users/${userId}/balance`
        );
        if (balanceResponse.ok) {
          const newBalance = await balanceResponse.json();
          setBalance(newBalance);
        }

        alert(
          `Tất toán thành công sổ "${deposit.name
          }". Tổng tiền nhận được: ${formatCurrency(
            deposit.principal + currentInterest
          )}`
        );

        if (onRedeemSuccess) {
          onRedeemSuccess();
        }
        window.location.reload();
      } catch (err) {
        alert(`Lỗi: ${err.message}`);
        console.error("Error redeeming deposit:", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto mt-8 rounded-lg shadow-lg bg-white p-8 text-center">
        <div className="text-lg">Đang tải dữ liệu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto mt-8 rounded-lg shadow-lg bg-white p-8">
        <div className="text-red-500 text-center mb-4">{error}</div>
        <div className="text-center">
          <button
            className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors font-medium"
            onClick={() => setShowRedeem(false)}
          >
            Đóng
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="max-w-6xl mx-auto mt-8 rounded-lg overflow-hidden flex flex-col shadow-lg"
      style={{ background: "#fff" }}
    >
      {/* Balance Header */}
      <div className="text-2xl font-bold px-6 py-5 text-center bg-gray-50">
        {loadingBalance ? (
          <div className="text-gray-500">Đang tải số dư...</div>
        ) : (
          <>
            Số dư khả dụng:{" "}
            <span className="text-[#E65100]">
              {formatCurrency(balance || 0)}
            </span>
          </>
        )}
      </div>

      {/* Total Amount */}
      <div className="text-xl font-bold px-6 py-3 text-center bg-blue-50">
        Tổng tiền gốc và lãi:{" "}
        <span className="text-blue-600">{formatCurrency(totalAmount)}</span>
      </div>

      {deposits.length === 0 ? (
        <div className="px-6 py-8 text-center text-gray-500">
          Bạn chưa có sổ tiết kiệm nào đang hoạt động
        </div>
      ) : (
        /* Table Container với responsive scroll */
        <div className="px-2 sm:px-6 py-2 bg-white overflow-x-auto">
          <table className="w-full text-left min-w-[900px]">
            <thead>
              <tr className="text-gray-500 border-b bg-gray-50">
                <th className="py-3 px-2 font-medium">Tên sổ tiết kiệm</th>
                <th className="py-3 px-2 font-medium text-right">Tiền gốc</th>
                <th className="py-3 px-2 font-medium text-right">
                  Lãi suất (%)
                </th>
                <th className="py-3 px-2 font-medium text-right">
                  Tiền lãi tới hiện tại
                </th>
                <th className="py-3 px-2 font-medium text-center">
                  Kỳ hạn (Tháng)
                </th>
                <th className="py-3 px-2 font-medium text-center">
                  Số ngày còn lại
                </th>
                <th className="py-3 px-2 font-medium text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((item) => (
                <tr
                  key={item.id}
                  className="border-b last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-2 font-medium">
                    <div>
                      <div>{item.name}</div>
                      <div className="text-xs text-gray-500">
                        Mã GD: {item.transactionId}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-right font-mono">
                    {formatCurrency(item.principal)}
                  </td>
                  <td className="py-4 px-2 text-right font-mono text-blue-600">
                    {item.interestRate}%
                  </td>
                  <td className="py-4 px-2 text-right font-mono text-green-600">
                    {formatCurrency(item.interest)}
                  </td>
                  <td className="py-4 px-2 text-center">{item.term}</td>
                  <td className="py-4 px-2 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${item.daysLeft <= 0
                        ? "bg-red-100 text-red-700"
                        : item.daysLeft <= 5
                          ? "bg-orange-100 text-orange-700"
                          : item.daysLeft <= 15
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                    >
                      {item.daysLeft <= 0
                        ? "Đã đến hạn"
                        : `${item.daysLeft} ngày`}
                    </span>
                  </td>
                  <td className="py-4 px-2 text-center">
                    <button
                      className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors text-sm font-medium"
                      onClick={() => handleRedeem(item)}
                    >
                      Tất toán
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 text-center">
        <button
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors font-medium"
          onClick={() => setShowRedeem(false)}
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
