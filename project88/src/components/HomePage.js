import React, { useState, useEffect } from "react";
import styles from "../styles/homepage.module.scss";

const Header = ({ toggleTheme, currentTheme }) => (
  <header className={styles.header}>
    <div className={styles.logo}>LOGO</div>
    <div className={styles["header-right"]}>
      <button onClick={toggleTheme} className={styles["mode-btn"]}>
        {currentTheme === "light" ? "Dark" : "Light"} Mode
      </button>
      <button>EN/VN</button>
    </div>
  </header>
);

const Footer = () => (
  <footer className={styles.footer}>&copy; 2025 Bank app</footer>
);

const Content = () => (
  <main className={styles.content}>
    <div className={styles["main-section"]}>
      <div className={styles["user-info"]}>
        <div className={styles.avatar}>Image</div>
        <div>
          <h2><b>Bùi Quang Huy</b></h2>
          <button className={styles["pay-btn"]}>Lịch sử giao dịch</button>
        </div>
      </div>

      <div className={styles["balance-section"]}>
        <div className={styles.card}>
          <div className={styles["card-title"]}>Số dư</div>
          <div className={styles["card-amount"]}>1.000.000.000 VND</div>
          <button className={styles["pay-btn"]}>Chuyển khoản</button>
        </div>
        <div className={styles.card}>
          <div className={styles["card-title"]}>Tiết kiệm</div>
          <div className={styles["card-amount"]}>1.000.000.000 VND</div>
          <button className={styles["pay-btn"]}>Nộp Tiết Kiệm</button>
          <button className={styles["pay-btn"]}>Rút Tiết Kiệm</button>
        </div>
      </div>

      <table className={styles["transaction-table"]}>
        <thead>
          <tr>
            <th>Ngày</th>
            <th>Loại</th>
            <th>Nội dung</th>
            <th>Phí</th>
            <th>Số dư</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(6)].map((_, i) => (
            <tr key={i}>
              <td>04/05/2025</td>
              <td>{i % 2 === 0 ? "CK" : "HD"}</td>
              <td>
                {i % 2 === 0
                  ? "Chuyển khoản đến 123456789"
                  : "Thanh toán HD 987654321"}
              </td>
              <td>-1.000.000 VND</td>
              <td>900.000.000 VND</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination}>First 1 2 ... 5 Last</div>
    </div>

    <div className={styles["bill-section"]}>
      {[...Array(3)].map((_, i) => (
        <div className={styles["bill-card"]} key={i}>
          <div className={styles["bill-title"]}>Hóa đơn điện</div>
          <div className={styles["bill-details"]}>
            Mã HD: 987654321<br />
            Số tiền cần thanh toán: 1.000.000 VND
          </div>
          <button className={styles["pay-btn"]}>Thanh Toán</button>
        </div>
      ))}
    </div>
  </main>
);

export default function HomePage() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className={styles.app}>
      <Header toggleTheme={toggleTheme} currentTheme={theme} />
      <Content />
      <Footer />
    </div>
  );
}