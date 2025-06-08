import React, { useState, useEffect } from "react";
import axios from "axios";

const Deposit = ({ setShowDeposit, onDepositSuccess }) => {
  const userId = localStorage.getItem("userId") || 1;
  // state
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("3");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [balance, setBalance] = useState(null);

  const [loadingBalance, setLoadingBalance] = useState(true);

  const interestRates = {
    1: "3.8%",
    3: "4.2%",
    6: "4.8%",
    12: "5.2%",
  };
  const interestRate = interestRates[parseInt(term)] || "4.2%";
  const terms = [
    { value: "1", label: "1 tháng" },
    { value: "3", label: "3 tháng" },
    { value: "6", label: "6 tháng" },
    { value: "12", label: "12 tháng" },
  ];

  // Lấy balance từ API
  useEffect(() => {
    const fetchUserBalance = async () => {
      setLoadingBalance(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/users/${userId}/balance`
        );
        setBalance(response.data);
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

  // format số tiền
  const formatAmount = (value) => {
    const cleanValue = value.replace(/[^0-9]/g, "");
    return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // xử lý input amount
  const handleAmountChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    setAmount(formatAmount(rawValue));
  };

  // validate input
  const validateInput = () => {
    if (!accountName.trim()) return "Tên sổ tiết kiệm không được để trống";
    const rawAmount = parseInt(amount.replace(/[^0-9]/g, ""));
    if (isNaN(rawAmount) || rawAmount <= 0) return "Số tiền phải là số dương";
    const MIN_AMOUNT = 100000;
    if (rawAmount < MIN_AMOUNT)
      return `Số tiền tối thiểu là ${formatAmount(MIN_AMOUNT.toString())} VND`;
    if (balance && rawAmount > balance) {
      return "Số dư không đủ để thực hiện giao dịch";
    }
    if (!interestRates[term]) return "Kỳ hạn không hợp lệ";
    return null;
  };

  // gửi request tới API
  const handleDeposit = async (e) => {
    e.preventDefault();
    const validationError = validateInput();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/deposits?userId=${userId}`,
        {
          accountName,
          amount: parseInt(amount.replace(/[^0-9]/g, "")),
          term: parseInt(term),
          interestRate: parseFloat(interestRate.replace("%", "")),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(
        "Gửi tiền thành công! Mã giao dịch: " + response.data.transactionId
      );

      setTimeout(() => {
        setShowDeposit(false);
        if (onDepositSuccess) {
          onDepositSuccess();
        }
        setTimeout(() => {
          window.location.reload();
        }, 100);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Đã có lỗi xảy ra khi gửi tiền");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 bg-white rounded-lg shadow p-0">
      {/* Balance Header */}
      <div className="text-2xl font-bold px-6 py-5 text-center">
        {loadingBalance ? (
          <div className="text-gray-500">Đang tải số dư...</div>
        ) : (
          <>
            Số dư khả dụng:{" "}
            <span className="text-[#E65100]">
              {formatAmount((balance || 0).toString())} VND
            </span>
          </>
        )}
      </div>
      {/* Form */}
      <form className="p-8 space-y-4" onSubmit={handleDeposit}>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <div>
          <label className="block mb-1 font-medium">Tên sổ tiết kiệm</label>
          <input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="w-full rounded bg-gray-50 border border-gray-200 px-4 py-2 focus:outline-none"
            placeholder="Vui lòng nhập tên sổ tiết kiệm"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Số tiền muốn gửi</label>
          <input
            type="text"
            value={amount}
            onChange={handleAmountChange}
            className="w-full rounded bg-gray-50 border border-gray-200 px-4 py-2 focus:outline-none"
            placeholder="VD: 1.000.000"
            disabled={loading}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Kỳ hạn</label>
          <select
            className="w-full rounded bg-gray-50 border border-gray-200 px-4 py-2 focus:outline-none"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            disabled={loading}
          >
            {terms.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Lãi suất</label>
          <input
            type="text"
            value={interestRate}
            readOnly
            className="w-full rounded bg-red-50 border border-gray-200 px-4 py-2 text-red-600 font-semibold focus:outline-none"
          />
        </div>
        {/* Buttons */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50"
            onClick={() => setShowDeposit(false)}
            disabled={loading}
          >
            Hủy
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Xác nhận"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Deposit;
