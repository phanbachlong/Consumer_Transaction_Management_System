drop schema if exists project88;
-- create schema
CREATE SCHEMA project88;

USE project88;

-- create table user
CREATE TABLE `user`(
	user_id			TINYINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	firstName 		VARCHAR(50) NOT NULL,
    lastName 		VARCHAR(50) NOT NULL,
    username 		VARCHAR(50) NOT NULL UNIQUE CHECK(length(username) >=6), 
    email 			VARCHAR(50) NOT NULL UNIQUE,
    gender 			ENUM('Male','Female','Other') NOT NULL,
    phone 			CHAR(10) NOT NULL UNIQUE,
    cccd			CHAR(12) NOT NULL, 
    balance			INT NOT NULL DEFAULT 0,
    birth			DATE,
    `password` 		VARCHAR(800) NOT NULL,
    `role` 			ENUM('Admin','Employee','User') DEFAULT 'User',
	`status`		TINYINT DEFAULT 0, -- 0: Not Active, 1: Active
    `avatarUrl`		VARCHAR(500)
);

CREATE TABLE IF NOT EXISTS `card_number` (
card_number			INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
user_id				TINYINT NOT NULL UNIQUE KEY,
FOREIGN KEY			(user_id) REFERENCES `user` (user_id)
)AUTO_INCREMENT = 111111;

-- Create table Registration_User_Token
CREATE TABLE IF NOT EXISTS `Registration_User_Token` ( 	
	id 				INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	`token`	 		CHAR(36) NOT NULL UNIQUE,
	`user_id` 		SMALLINT UNSIGNED NOT NULL,
	`expiryDate` 	DATETIME NOT NULL
);

-- Create table Transaction History(Lịch sử giao dịch)
CREATE TABLE IF NOT EXISTS `transaction_history`(
	trans_id TINYINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    transType ENUM('CK','HD','NT') NOT NULL, -- CK: Chuyển khoản, HD: Hóa đơn, NT: Nạp tiền 
    createDate DATE default(CURRENT_DATE),
    content VARCHAR(800),
    user_id TINYINT NOT NULL,
    fee INT NOT NULL,
    end_balance INT NOT NULL DEFAULT(0),
    CONSTRAINT fk_trans_user FOREIGN KEY (user_id) REFERENCES `user` (user_id)
);

CREATE TABLE IF NOT EXISTS `bill`(
	bill_Id 		INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    bill_name 		VARCHAR(80) NOT NULL,
    createDate 		DATE default(CURRENT_DATE),
    user_id 		TINYINT NOT NULL,
    bill_amount INT NOT NULL,
    FOREIGN KEY		(user_id) REFERENCES `user` (user_id)
)AUTO_INCREMENT = 985321;
 


-- insert value to user 
insert into `user`(firstName, lastName, username, email, gender, phone, cccd, birth, `password`, avatarUrl, `role`, `status`,balance) values("Phan Trong", "Vinh", "phtrvinh", "1phantrongvinh98@gmail.com", "Male", "0772661877", "079098009123","1998-01-01", "123456", "a",'Admin',1,1000000);
insert into `user`(firstName, lastName, username, email, gender, phone, cccd, birth, `password`, avatarUrl, `role`, `status`,balance) values(" Tran Huu Viet", "Van", "vantran195", "tran1951999@gmail.com", "Male", "0932006977", "01234455675","1990-01-01", "123456", "b",'Admin',1,2000000);
-- insert value to Transaction History
insert into `transaction_history`(transType, content, user_id, fee) values("CK", "abc123", 1, 100000);

INSERT INTO `Card_Number` (user_id) values (1);
INSERT INTO `Card_Number` (user_id) values (2);

INSERT INTO `bill` (bill_name, createDate, user_id, bill_amount) VALUES
('Electricity Bill', CURRENT_DATE, 1, 500000),
('Water Bill', CURRENT_DATE, 1, 300000),
('Internet Bill', CURRENT_DATE, 1, 400000),
('Rent', CURRENT_DATE, 2, 1500000),
('Electricity Bill', CURRENT_DATE, 2, 700000);

CREATE TABLE IF NOT EXISTS `log`(
`date` 		DATETIME DEFAULT CURRENT_TIMESTAMP,
content		VARCHAR(100)
)
