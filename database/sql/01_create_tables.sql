-- DROP THE TABLES
DROP TABLE IF EXISTS `Scooter`;
DROP TABLE IF EXISTS `City`;
DROP TABLE IF EXISTS `Station`;
DROP TABLE IF EXISTS `PermittedZone`;
DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS `RentalLog`;
DROP TABLE IF EXISTS `PaymentType`;
DROP TABLE IF EXISTS `StationType`;
DROP TABLE IF EXISTS `ActivityType`;
DROP TABLE IF EXISTS `CostStructure`;

-- Create Scooter table
CREATE TABLE IF NOT EXISTS `Scooter` (
    `ScooterID` INT AUTO_INCREMENT PRIMARY KEY,
    `Status` VARCHAR(50),
    `Location` VARCHAR(100),
    `Speed` DECIMAL(5, 2),
    `Battery` INT,
    `StationID` INT
);

-- Create City table
CREATE TABLE IF NOT EXISTS `City` (
    `CityID` INT AUTO_INCREMENT PRIMARY KEY,
    `CityName` VARCHAR(50),
    `CityPosition` VARCHAR(50)
);

-- Create the Station table
CREATE TABLE IF NOT EXISTS `Station` (
    `StationID` INT AUTO_INCREMENT PRIMARY KEY,
    `StationName` VARCHAR(50),
    `Location` VARCHAR(100),
    `ScooterCapacity` INT,
    `ScooterOccupancy` INT,
    `StationType` INT,
    `CityID` INT
);

-- Create the PermittedZone table
CREATE TABLE IF NOT EXISTS `PermittedZone` (
    `PermittedZoneID` INT AUTO_INCREMENT PRIMARY KEY,
    `ZoneName` VARCHAR(50),
    `ZoneArea` VARCHAR(500),
    `CityID` INT
);

-- Create the User table
CREATE TABLE IF NOT EXISTS `User` (
    `UserID` INT AUTO_INCREMENT PRIMARY KEY,
    `FirstName` VARCHAR(50),
    `LastName` VARCHAR(50),
    `Password` VARCHAR(100),
    `Email` VARCHAR(100),
    `AccountBalance` DECIMAL(10, 2),
    `PaymentType` INT,
    `Role` VARCHAR(50)
);

-- Create RentalLog
CREATE TABLE IF NOT EXISTS `RentalLog` (
    `RentalLogID` INT AUTO_INCREMENT PRIMARY KEY,
    `Active` BOOLEAN,
    `ScooterID` INT,
    `UserID` INT,
    `StartTime` DATETIME,
    `EndTime` DATETIME,
    `StartStation` INT,
    `EndStation` INT,
    `Cost` DECIMAL(10, 2),
    `Paid` BOOLEAN
);

-- Create PaymentType
CREATE TABLE IF NOT EXISTS `PaymentType` (
    `PaymentTypeID` INT AUTO_INCREMENT PRIMARY KEY,
    `PaymentTypeDesc` VARCHAR(50)
);

-- Create StationType
CREATE TABLE IF NOT EXISTS `StationType` (
    `StationTypeID` INT AUTO_INCREMENT PRIMARY KEY,
    `StationTypeDesc` VARCHAR(50)
);

-- Create ActivityType
CREATE TABLE IF NOT EXISTS `ActivityType` (
    `ActivityTypeID` INT AUTO_INCREMENT PRIMARY KEY,
    `ActivityTypeDesc` VARCHAR(50)
);

-- Create CostStructure
CREATE TABLE IF NOT EXISTS `CostStructure` (
    `CostID` INT AUTO_INCREMENT PRIMARY KEY,
    `CostDesc` VARCHAR(50),
    `CostAmount` DECIMAL(15,2)
);

-- ADD THE FOREIGN KEYS!
ALTER TABLE `Scooter` ADD FOREIGN KEY (`StationID`) REFERENCES `Station`(`StationID`);
ALTER TABLE `Station` ADD FOREIGN KEY (`CityID`) REFERENCES `City`(`CityID`);
ALTER TABLE `PermittedZone` ADD FOREIGN KEY (`CityID`) REFERENCES `City`(`CityID`);
ALTER TABLE `User` ADD FOREIGN KEY (`PaymentType`) REFERENCES `PaymentType`(`PaymentTypeID`);
ALTER TABLE `Station` ADD FOREIGN KEY (`StationType`) REFERENCES `StationType`(`StationTypeID`);
ALTER TABLE `RentalLog` ADD FOREIGN KEY (`ScooterID`) REFERENCES `Scooter`(`ScooterID`);
ALTER TABLE `RentalLog` ADD FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`);
ALTER TABLE `RentalLog` ADD FOREIGN KEY (`StartStation`) REFERENCES `Station`(`StationID`);
ALTER TABLE `RentalLog` ADD FOREIGN KEY (`EndStation`) REFERENCES `Station`(`StationID`);