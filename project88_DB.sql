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
    cccd			CHAR(12) NOT NULL UNIQUE, 
    balance			INT NOT NULL DEFAULT 0,
    birth			DATE NOT NULL,
    `password` 		VARCHAR(800) NOT NULL,
    `role` 			ENUM('Admin','Employee','User') DEFAULT 'User',
	`status`		TINYINT DEFAULT 0, -- 0: Not Active, 1: Active
    createdDate		DATETIME DEFAULT CURRENT_TIMESTAMP,
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
	`user_id` 		TINYINT NOT NULL,
	`expiryDate` 	DATETIME NOT NULL,
    FOREIGN KEY			(`user_id`) REFERENCES `user` (`user_id`)
);

-- Create table Transaction History(Lịch sử giao dịch)
CREATE TABLE IF NOT EXISTS `transaction_history`(
	trans_id TINYINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    transType ENUM('CK','HD','NT','TT') NOT NULL, -- CK: Chuyển khoản, HD: Hóa đơn, NT: Nạp tiền, TT: Tiết kiệm
    createDate DATETIME DEFAULT(CURRENT_TIMESTAMP()),
    content VARCHAR(800),
    user_id TINYINT NOT NULL,
    fee INT NOT NULL,
    end_balance INT NOT NULL DEFAULT(0),
    CONSTRAINT fk_trans_user FOREIGN KEY (user_id) REFERENCES `user` (user_id)
);

CREATE TABLE IF NOT EXISTS `bill`(
	bill_Id 		INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    bill_name 		VARCHAR(80) NOT NULL,
    createDate 		DATETIME DEFAULT(CURRENT_TIMESTAMP()),
    user_id 		TINYINT NOT NULL,
    bill_amount INT NOT NULL,
    FOREIGN KEY		(user_id) REFERENCES `user` (user_id)
)AUTO_INCREMENT = 985321;

CREATE TABLE IF NOT EXISTS `deposit` (
    deposit_Id 		INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    deposit_name 	VARCHAR(100) NOT NULL,
    createDate 		DATETIME NOT NULL DEFAULT(CURRENT_TIMESTAMP()),
    interest_rate 	FLOAT NOT NULL,
    term_months 	INT NOT NULL,
    transaction_id	VARCHAR(50) UNIQUE KEY,
    user_id 		TINYINT NOT NULL,
    deposit_amount 	INT NOT NULL,
    `status` 		ENUM('ACTIVE', 'REDEEMED', 'MATURED') NOT NULL DEFAULT 'ACTIVE', -- ACTIVE: Đang hoạt động, REDEEMED: Đã tất toán, MATURED: Đã đáo hạn
    FOREIGN KEY (user_id) REFERENCES `user` (user_id)
);

CREATE TABLE IF NOT EXISTS jwt_blacklist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(512) NOT NULL,
    expiry_date DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS password_reset_token (
    id INT AUTO_INCREMENT PRIMARY KEY,
    token CHAR(36) NOT NULL UNIQUE,
    user_id TINYINT NOT NULL,
    expiry_date DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);
 


-- insert value to user 
insert into `user`(firstName, lastName, username, email, gender, phone, cccd, birth, `password`, avatarUrl, `role`, `status`,balance) values("Phan Trong", "Vinh", "phtrvinh", "1phantrongvinh98@gmail.com", "Male", "0772661877", "079098009123","1998-01-01", "$2a$10$8rscmAyP5l1ijXPe.dNarembt.PgxrbfrK4LrH7K4U4o3cUMBIRG6", "a",'Admin',1,1000000);
insert into `user`(firstName, lastName, username, email, gender, phone, cccd, birth, `password`, avatarUrl, `role`, `status`,balance) values("Tran Huu Viet", "Van", "vantran195", "tran1951999@gmail.com", "Male", "0932006977", "01234455675","1990-01-01", "$2a$10$vEu9ah/1CLe.T9Oob/q4E.vgEEGYLiiCkNjaLCNa71P5lDVYZ5sam", "b",'Employee',1,2000000);

insert into `user`(firstName, lastName, username, email, gender, phone, cccd, birth, `password`, avatarUrl, `role`, `status`,balance) values("Tran Viet","Hoang", "hoangtran","tranhoang001@gmail.com","Male","0932006978","01234455677","1990-02-01","$2a$10$8rscmAyP5l1ijXPe.dNarembt.PgxrbfrK4LrH7K4U4o3cUMBIRG6","c","User",1,5000000);
-- insert value to Transaction History
insert into `transaction_history`(transType, content, user_id, fee) values
("CK", "abc123", 1, 100000),
("TT", "xyz456", 1, 200000),
("CK", "abc123", 3, 100000),
("TT", "xyz456", 3, 200000);

INSERT INTO `Registration_User_Token` (`token`, `user_id`, `expiryDate`) 
VALUES ('123e4567-e89b-12d3-a456-426614174000', 1, '2025-06-08 12:00:00');

INSERT INTO `Card_Number` (user_id) values (1);
INSERT INTO `Card_Number` (user_id) values (2);
INSERT INTO `Card_Number` (user_id) values (3);


INSERT INTO `bill` (bill_name, createDate, user_id, bill_amount) VALUES
('Hóa Đơn Điện', CURRENT_DATE, 1, 500000),
('Hóa Đơn Nước', CURRENT_DATE, 1, 300000),
('Hóa Đơn Internet', CURRENT_DATE, 1, 400000),
('Hóa Đơn Điện', CURRENT_DATE, 2, 500000),
('Hóa Đơn Nước', CURRENT_DATE, 2, 300000),
('Hóa Đơn Internet', CURRENT_DATE, 2, 400000),
('Hóa Đơn Điện', CURRENT_DATE, 3, 500000),
('Hóa Đơn Nước', CURRENT_DATE, 3, 300000),
('Hóa Đơn Internet', CURRENT_DATE, 3, 400000);

INSERT INTO `deposit` (deposit_name, interest_rate, term_months, user_id, deposit_amount, `status`) VALUES
('Sổ tiết kiệm 1', 4.20, 3, 1, 200000, 'ACTIVE'),
('Sổ tiết kiệm 2', 4.80, 6, 1, 300000, 'ACTIVE'),
('Sổ tiết kiệm 3', 5.20, 12, 3, 100000, 'ACTIVE'),
('Sổ tiết kiệm 4', 3.80, 1, 3, 1000000, 'MATURED');

-- thêm data để test
INSERT INTO `user` (firstName, lastName, username, email, gender, phone, cccd, birth, `password`, avatarUrl, `role`, `status`, balance) VALUES
('Nguyen', 'An', 'nguyenan01', 'nguyenan01@gmail.com', 'Male', '0900000001', '01234567001', '1995-01-01', 'password1', '', 'User', 1, 100000),
('Le', 'Binh', 'lebinh02', 'lebinh02@gmail.com', 'Male', '0900000002', '01234567002', '1996-02-02', 'password2', '', 'User', 1, 200000),
('Tran', 'Cuong', 'trancuong03', 'trancuong03@gmail.com', 'Male', '0900000003', '01234567003', '1997-03-03', 'password3', '', 'User', 1, 300000),
('Pham', 'Dung', 'phamdung04', 'phamdung04@gmail.com', 'Female', '0900000004', '01234567004', '1998-04-04', 'password4', '', 'User', 1, 400000),
('Hoang', 'Em', 'hoangem05', 'hoangem05@gmail.com', 'Female', '0900000005', '01234567005', '1999-05-05', 'password5', '', 'User', 1, 500000),
('Vo', 'Giang', 'vogiang06', 'vogiang06@gmail.com', 'Other', '0900000006', '01234567006', '1995-06-06', 'password6', '', 'User', 1, 600000),
('Do', 'Hanh', 'dohanh07', 'dohanh07@gmail.com', 'Female', '0900000007', '01234567007', '1996-07-07', 'password7', '', 'User', 1, 700000),
('Bui', 'Khanh', 'buikhanh08', 'buikhanh08@gmail.com', 'Male', '0900000008', '01234567008', '1997-08-08', 'password8', '', 'User', 1, 800000),
('Dang', 'Lam', 'danglam09', 'danglam09@gmail.com', 'Male', '0900000009', '01234567009', '1998-09-09', 'password9', '', 'User', 1, 900000),
('Nguyen', 'Minh', 'nguyenminh10', 'nguyenminh10@gmail.com', 'Other', '0900000010', '01234567010', '1999-10-10', 'password10', '', 'User', 1, 1000000);

-- Thêm 10 bản ghi user với role là 'Employee'
INSERT INTO `user` (firstName, lastName, username, email, gender, phone, cccd, birth, `password`, avatarUrl, `role`, `status`, balance) VALUES
('Nguyen', 'Bao', 'nguyenbao01', 'nguyenbao01@gmail.com', 'Male', '0910000001', '02234567001', '1990-01-01', 'password1', '', 'Employee', 1, 110000),
('Le', 'Chau', 'lechau02', 'lechau02@gmail.com', 'Female', '0910000002', '02234567002', '1991-02-02', 'password2', '', 'Employee', 1, 120000),
('Tran', 'Dat', 'trandat03', 'trandat03@gmail.com', 'Male', '0910000003', '02234567003', '1992-03-03', 'password3', '', 'Employee', 1, 130000),
('Pham', 'Em', 'phamem04', 'phamem04@gmail.com', 'Female', '0910000004', '02234567004', '1993-04-04', 'password4', '', 'Employee', 1, 140000),
('Hoang', 'Giang', 'hoanggiang05', 'hoanggiang05@gmail.com', 'Other', '0910000005', '02234567005', '1994-05-05', 'password5', '', 'Employee', 1, 150000),
('Vo', 'Hieu', 'vohieu06', 'vohieu06@gmail.com', 'Male', '0910000006', '02234567006', '1995-06-06', 'password6', '', 'Employee', 1, 160000),
('Do', 'Kien', 'dokien07', 'dokien07@gmail.com', 'Male', '0910000007', '02234567007', '1996-07-07', 'password7', '', 'Employee', 1, 170000),
('Bui', 'Linh', 'builinh08', 'builinh08@gmail.com', 'Female', '0910000008', '02234567008', '1997-08-08', 'password8', '', 'Employee', 1, 180000),
('Dang', 'Minh', 'dangminh09', 'dangminh09@gmail.com', 'Male', '0910000009', '02234567009', '1998-09-09', 'password9', '', 'Employee', 1, 190000),
('Nguyen', 'Nam', 'nguyennam10', 'nguyennam10@gmail.com', 'Other', '0910000010', '02234567010', '1999-10-10', 'password10', '', 'Employee', 1, 200000);

INSERT INTO card_number (user_id) VALUES 
(4), (5), (6), (7), (8), (9), (10), (11), (12), (13),
(14), (15), (16), (17), (18), (19), (20), (21), (22), (23);

-- Thêm 10 bản ghi transaction_history cho mỗi user_id 1, 2, 3
INSERT INTO transaction_history (transType, content, user_id, fee) VALUES
('CK', 'Chuyen khoan 1', 1, 10000),
('TT', 'Thanh toan 2', 1, 20000),
('CK', 'Chuyen khoan 3', 1, 15000),
('TT', 'Thanh toan 4', 1, 25000),
('CK', 'Chuyen khoan 5', 1, 12000),
('TT', 'Thanh toan 6', 1, 22000),
('CK', 'Chuyen khoan 7', 1, 13000),
('TT', 'Thanh toan 8', 1, 21000),
('CK', 'Chuyen khoan 9', 1, 14000),
('TT', 'Thanh toan 10', 1, 23000),

('CK', 'Chuyen khoan 1', 2, 11000),
('TT', 'Thanh toan 2', 2, 21000),
('CK', 'Chuyen khoan 3', 2, 16000),
('TT', 'Thanh toan 4', 2, 26000),
('CK', 'Chuyen khoan 5', 2, 12500),
('TT', 'Thanh toan 6', 2, 22500),
('CK', 'Chuyen khoan 7', 2, 13500),
('TT', 'Thanh toan 8', 2, 21500),
('CK', 'Chuyen khoan 9', 2, 14500),
('TT', 'Thanh toan 10', 2, 23500),

('CK', 'Chuyen khoan 1', 3, 12000),
('TT', 'Thanh toan 2', 3, 22000),
('CK', 'Chuyen khoan 3', 3, 17000),
('TT', 'Thanh toan 4', 3, 27000),
('CK', 'Chuyen khoan 5', 3, 12800),
('TT', 'Thanh toan 6', 3, 22800),
('CK', 'Chuyen khoan 7', 3, 13800),
('TT', 'Thanh toan 8', 3, 21800),
('CK', 'Chuyen khoan 9', 3, 14800),
('TT', 'Thanh toan 10', 3, 23800);

-- Thêm 10 bản ghi deposit cho mỗi user_id 1, 2, 3
INSERT INTO deposit (deposit_name, createDate, interest_rate, term_months, transaction_id, user_id, deposit_amount, status) VALUES
('So tiet kiem 1', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 5.5, 12, 'TXN1001', 1, 1000000, 'ACTIVE'),
('So tiet kiem 2', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 6.0, 6, 'TXN1002', 1, 2000000, 'ACTIVE'),
('So tiet kiem 3', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 5.0, 3, 'TXN1003', 1, 1500000, 'ACTIVE'),
('So tiet kiem 4', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 5.8, 12, 'TXN1004', 1, 1200000, 'ACTIVE'),
('So tiet kiem 5', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 6.2, 6, 'TXN1005', 1, 1800000, 'ACTIVE'),
('So tiet kiem 6', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 5.7, 3, 'TXN1006', 1, 1300000, 'ACTIVE'),
('So tiet kiem 7', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 6.1, 12, 'TXN1007', 1, 1700000, 'ACTIVE'),
('So tiet kiem 8', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 5.9, 6, 'TXN1008', 1, 1100000, 'ACTIVE'),
('So tiet kiem 9', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 6.3, 3, 'TXN1009', 1, 1600000, 'ACTIVE'),
('So tiet kiem 10', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 5.6, 12, 'TXN1010', 1, 1400000, 'ACTIVE'),

('So tiet kiem 1', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 5.5, 12, 'TXN2001', 2, 1000000, 'ACTIVE'),
('So tiet kiem 2', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 6.0, 6, 'TXN2002', 2, 2000000, 'ACTIVE'),
('So tiet kiem 3', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 5.0, 3, 'TXN2003', 2, 1500000, 'ACTIVE'),
('So tiet kiem 4', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 5.8, 12, 'TXN2004', 2, 1200000, 'ACTIVE'),
('So tiet kiem 5', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 6.2, 6, 'TXN2005', 2, 1800000, 'ACTIVE'),
('So tiet kiem 6', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 5.7, 3, 'TXN2006', 2, 1300000, 'ACTIVE'),
('So tiet kiem 7', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 6.1, 12, 'TXN2007', 2, 1700000, 'ACTIVE'),
('So tiet kiem 8', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 5.9, 6, 'TXN2008', 2, 1100000, 'ACTIVE'),
('So tiet kiem 9', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 6.3, 3, 'TXN2009', 2, 1600000, 'ACTIVE'),
('So tiet kiem 10', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 5.6, 12, 'TXN2010', 2, 1400000, 'ACTIVE'),

('So tiet kiem 1', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 5.5, 12, 'TXN3001', 3, 1000000, 'ACTIVE'),
('So tiet kiem 2', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 6.0, 6, 'TXN3002', 3, 2000000, 'ACTIVE'),
('So tiet kiem 3', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 5.0, 3, 'TXN3003', 3, 1500000, 'ACTIVE'),
('So tiet kiem 4', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 5.8, 12, 'TXN3004', 3, 1200000, 'ACTIVE'),
('So tiet kiem 5', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 6.2, 6, 'TXN3005', 3, 1800000, 'ACTIVE'),
('So tiet kiem 6', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 5.7, 3, 'TXN3006', 3, 1300000, 'ACTIVE'),
('So tiet kiem 7', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 6.1, 12, 'TXN3007', 3, 1700000, 'ACTIVE'),
('So tiet kiem 8', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 5.9, 6, 'TXN3008', 3, 1100000, 'ACTIVE'),
('So tiet kiem 9', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 6.3, 3, 'TXN3009', 3, 1600000, 'ACTIVE'),
('So tiet kiem 10', DATE_SUB(CURRENT_DATE, INTERVAL FLOOR(RAND()*29)+1 DAY), 5.6, 12, 'TXN3010', 3, 1400000, 'ACTIVE');
