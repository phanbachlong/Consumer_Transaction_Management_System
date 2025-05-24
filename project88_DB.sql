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
    cccd			CHAR(12) NOT NULL, 
    balance			INT NOT NULL DEFAULT 0,
    birth			DATE,
    `password` 		VARCHAR(50) NOT NULL,
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
    content VARCHAR(800),
    user_id TINYINT NOT NULL,
    fee INT NOT NULL,
    CONSTRAINT fk_trans_user FOREIGN KEY (user_id) REFERENCES `user` (user_id)
);


-- insert value to user 
insert into `user`(firstName, lastName, username, email, gender, cccd, birth, `password`, avatarUrl, `role`, `status`) values("Phan Trong", "Vinh", "phtrvinh", "1phantrongvinh98@gmail.com", "Male", "079098009123","1998-01-01", "123456", "a",'Admin',1);
insert into `user`(firstName, lastName, username, email, gender, cccd, birth, `password`, avatarUrl, `role`, `status`) values(" Tran Huu Viet", "Van", "vantran195", "tran1951999@gmail.com", "Male", "01234455675","1990-01-01", "123456", "b",'Admin',1);
-- insert value to Transaction History
insert into `transaction_history`(transType, content, user_id, fee) values("CK", "abc123", 1, 100000);

INSERT INTO `Card_Number` (user_id) values (1);
INSERT INTO `Card_Number` (user_id) values (2)
