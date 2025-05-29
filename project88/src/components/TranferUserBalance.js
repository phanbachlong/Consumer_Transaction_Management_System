const TransferUserBalance = (props) => {
    return (
        <div className="transfer-user-balance-center">
            <hr className="transfer-divider" />
            <div className="transfer-user justify-content-center">
                {/* <div className="transfer-avatar">AVA</div> */}
                <div className="align-items-center" style={{ textAlign: "center", width: "100%" }}>
                    <div className="transfer-username">{props.userBalance.fullName}</div>
                    <div>
                        <div className="transfer-balance-label">Số dư khả dụng</div>
                        <div className="transfer-balance">
                            {Number(props.userBalance.balance).toLocaleString("de-DE")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default TransferUserBalance;