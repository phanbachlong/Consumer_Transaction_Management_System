drop schema if exists project88;
-- create schema
CREATE SCHEMA project88;

USE project88;

-- create table user
CREATE TABLE `user`(
	user_id 		TINYINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	firstName 		VARCHAR(50) NOT NULL,
    lastName 		VARCHAR(50) NOT NULL,
    username 		VARCHAR(50) NOT NULL UNIQUE CHECK(length(username) >=6), 
    email 			VARCHAR(50) NOT NULL UNIQUE,
    gender 			ENUM('Male','Female','Other') not null,
    `password` 		VARCHAR(800) NOT NULL,
    `role` 			ENUM('Admin','Employee','User') DEFAULT 'User',
	`status`		TINYINT DEFAULT 0, -- 0: Not Active, 1: Active
    `avatarUrl`		VARCHAR(500)
);

-- Create table Registration_User_Token
DROP TABLE IF EXISTS 	`Registration_User_Token`;
CREATE TABLE IF NOT EXISTS `Registration_User_Token` ( 	
	id 				INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	`token`	 		CHAR(36) NOT NULL UNIQUE,
	`user_id` 		SMALLINT UNSIGNED NOT NULL,
	`expiryDate` 	DATETIME NOT NULL
);

-- insert value to user 
-- INSERT INTO `user`(firstName, lastName, userName, email, `password`) VALUE ('Phan Trong', 'Vinh', 'phtrvinh', '1phantrongvinh98@gmail.com', '123456')