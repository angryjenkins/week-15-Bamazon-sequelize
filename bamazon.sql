CREATE DATABASE Bamazon;
USE Bamazon;

-- script to create Products table
CREATE TABLE `Bamazon`.`Products` (
  `ItemID` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(60) NOT NULL,
  `DepartmentName` VARCHAR(45) NOT NULL,
  `Price` DECIMAL(13,4) NOT NULL,
  `StockQuantity` INT(4) NOT NULL,
  PRIMARY KEY (`ItemID`)
);

-- need mysql --local-infile to run this script
LOAD DATA LOCAL INFILE 'initial_inventory.csv' INTO TABLE Products;

-- query to show all available products on program load.
SELECT * FROM Bamazon.Products;
