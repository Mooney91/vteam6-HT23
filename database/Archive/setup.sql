-- DROP THE TABLES
DROP TABLE IF EXISTS `Scooter`;
DROP TABLE IF EXISTS `City`;
DROP TABLE IF EXISTS `Station`;
DROP TABLE IF EXISTS `PermittedZone`;
DROP TABLE IF EXISTS `User`;
DROP TABLE IF EXISTS `RentalLog`;
DROP TABLE IF EXISTS `ScooterLog`;
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
    `PaymentType` INT
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

-- Create ScooterLog
CREATE TABLE IF NOT EXISTS `ScooterLog` (
    `ScooterLogID` INT AUTO_INCREMENT PRIMARY KEY,
    `ScooterID` INT,
    `ActivityType` INT,
    `StartStation` INT,
    `EndStation` INT
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
ALTER TABLE `RentalLog` ADD FOREIGN KEY (`ScooterID`) REFERENCES `Scooter`(`ScooterID`);
ALTER TABLE `RentalLog` ADD FOREIGN KEY (`UserID`) REFERENCES `User`(`UserID`);
ALTER TABLE `RentalLog` ADD FOREIGN KEY (`StartStation`) REFERENCES `Station`(`StationID`);
ALTER TABLE `RentalLog` ADD FOREIGN KEY (`EndStation`) REFERENCES `Station`(`StationID`);
ALTER TABLE `ScooterLog` ADD FOREIGN KEY (`ScooterID`) REFERENCES `Scooter`(`ScooterID`);
ALTER TABLE `ScooterLog` ADD FOREIGN KEY (`ActivityType`) REFERENCES `ActivityType`(`ActivityTypeID`);
ALTER TABLE `ScooterLog` ADD FOREIGN KEY (`StartStation`) REFERENCES `Station`(`StationID`);
ALTER TABLE `ScooterLog` ADD FOREIGN KEY (`EndStation`) REFERENCES `Station`(`StationID`);
ALTER TABLE `Station` ADD FOREIGN KEY (`StationType`) REFERENCES `StationType`(`StationTypeID`);

INSERT INTO `City` (`CityName`, `CityPosition`) VALUES
    ('Stockholm', '59.334591, 18.063240'),
    ('Gothenburg', '57.708870, 11.974560'),
    ('Malmö', '55.60587, 13.00073');

INSERT INTO `ActivityType` (`ActivityTypeDesc`) VALUES
    ('Parked'),
    ('Maintenance'),
    ('Charging'),
    ('In use'),
    ('Free Parking');

INSERT INTO `StationType` (`StationTypeDesc`) VALUES
    ('Parking'),
    ('Charging');

INSERT INTO `PaymentType` (`PaymentTypeDesc`) VALUES
    ('Card'),
    ('Swish');

INSERT INTO `Scooter` (`Status`, `Location`, `Speed`, `Battery`) VALUES
    ('Parked', '59.3293, 18.0686', 10.5, 80),
    ('In Use', '57.7089, 11.9746', 15.3, 60),
    ('Free Parking', '55.605, 13.0038', 12.7, 75),
    ('Charging', '59.9139, 10.7522', 8.2, 90),
    ('Maintenance', '57.7055, 11.9668', 14.6, 70);

INSERT INTO `Station` (`StationName`, `Location`, `ScooterCapacity`, `ScooterOccupancy`, `StationType`, `CityID`) VALUES
    ('Station A', '59.3293, 18.0686', 10, 5, 1, 1),
    ('Station B', '57.7089, 11.9746', 12, 8, 2, 2),
    ('Station C', '55.605, 13.0038', 15, 7, 1, 3),
    ('Station D', '59.9139, 10.7522', 8, 2, 2, 1),
    ('Station E', '57.7055, 11.9668', 10, 6, 1, 2);

INSERT INTO `PermittedZone` (`ZoneName`, `ZoneArea`, `CityID`) VALUES
    ('Södermalm', '{"type": "Polygon", "coordinates": [[[18.06046, 59.31189], [18.07034, 59.31675], [18.07557, 59.31547], [18.08274, 59.31471], [18.08477, 59.31442], [18.08464, 59.31395], [18.07935, 59.31317], [18.07546, 59.31159], [18.07467, 59.30953], [18.06046, 59.31189]]}', 1),
    ('Kungsholmen', '{"type": "Polygon", "coordinates": [[[17.98997, 59.32822], [18.01151, 59.32878], [18.01523, 59.32894], [18.01674, 59.32952], [18.02122, 59.32963], [18.02862, 59.32945], [18.02757, 59.32751], [18.02801, 59.32719], [18.02363, 59.32609], [18.01322, 59.32756], [17.98997, 59.32822]]}', 1),
    ('Gamla Stan', '{"type": "Polygon", "coordinates": [[[18.07084, 59.32533], [18.07799, 59.32429], [18.07975, 59.32512], [18.07975, 59.32611], [18.08183, 59.32633], [18.08432, 59.32591], [18.08425, 59.32532], [18.08362, 59.32457], [18.07923, 59.32438], [18.07885, 59.325], [18.075, 59.32532], [18.07439, 59.32511], [18.07189, 59.325], [18.07117, 59.32532], [18.07084, 59.32533]]}', 1);

INSERT INTO `User` (`FirstName`, `LastName`, `Password`, `Email`, `AccountBalance`, `PaymentType`) VALUES
    ('Elsa', 'Andersson', 'password1', 'elsa@example.com', 500.00, 1),
    ('Oskar', 'Berg', 'password2', 'oskar@example.com', 700.00, 2),
    ('Maja', 'Carlsson', 'password3', 'maja@example.com', 300.00, 1),
    ('Erik', 'Dahl', 'password4', 'erik@example.com', 900.00, 2),
    ('Hanna', 'Eriksson', 'password5', 'hanna@example.com', 600.00, 1);

INSERT INTO `RentalLog` (`Active`,`ScooterID`, `UserID`, `StartTime`, `EndTime`, `StartStation`, `EndStation`, `Cost`, `Paid`) VALUES
    (true, 1, 1, '2023-01-01T09:00:00', '2023-01-01T09:30:00', 1, 2, 10.00, 1),
    (true, 2, 2, '2023-01-02T10:00:00', '2023-01-02T11:30:00', 2, 3, 15.00, 1),
    (false, 3, 3, '2023-01-03T12:00:00', '2023-01-03T12:45:00', 3, 1, 8.00, 1),
    (false, 4, 4, '2023-01-04T14:00:00', '2023-01-04T15:15:00', 4, 2, 12.00, 1),
    (true, 5, 5, '2023-01-05T16:00:00', '2023-01-05T16:30:00', 1, 3, 9.00, 1),
    (true, 2, 3, '2023-01-05T16:00:00', null, null, null, 10.00, 0);

-- INSERT INTO `ScooterLog` (`ScooterID`, `ActivityType`, `StartStation`, `EndStation`) VALUES
--     (1, 1, 1, 2),
--     (2, 2, 2, 3),
--     (3, 1, 3, 1),
--     (4, 3, 4, 2),
--     (5, 2, 1, 3);

INSERT INTO `CostStructure` (`CostDesc`, `CostAmount`) VALUES
    ('Fixed', 10.00),
    ('Time-based', 3.00),
    ('Fine', 10.00),
    ('Discount', -5.00);

-- Triggers

-- DELIMITER //
-- CREATE TRIGGER add_rental_log
-- AFTER INSERT
-- ON `RentalLog` FOR EACH ROW
-- BEGIN
--     DECLARE fixedCost DECIMAL(15,2);
    
--     -- The Fixed fee has a CostID of 1 in the CostStructure table
--     SELECT `CostAmount` INTO fixedCost FROM `CostStructure` WHERE `CostID` = 1;
    
--     -- Add the fee to the newly created RentalLog, set Rental as active, and add StartTime
--     UPDATE `RentalLog`
--     SET NEW.`Cost` = NEW.`Cost` + fixedCost, NEW.`Active` = true, NEW.`StartTime` = NOW()
--     WHERE `RentalLogID` = NEW.`RentalLogID`;

--     -- Update Scooter status
--     UPDATE `Scooter`
--     SET `Status` = "In Use"
--     WHERE `ScooterID` = NEW.`ScooterID`;
-- END;
-- //

DELIMITER //

CREATE PROCEDURE AddRentalLog(IN newRentalLogID INT, IN newScooterID INT)
BEGIN
    DECLARE fixedCost DECIMAL(15, 2);

    -- The Fixed fee has a CostID of 1 in the CostStructure table
    SELECT `CostAmount` INTO fixedCost FROM `CostStructure` WHERE `CostID` = 1;

    -- Add the fee to the newly created RentalLog, set Rental as active, and add StartTime
    UPDATE `RentalLog`
    SET `Cost` = fixedCost, `Active` = true, `StartTime` = NOW()
    WHERE `RentalLogID` = newRentalLogID;

    -- Update Scooter status
    UPDATE `Scooter`
    SET `Status` = "In Use"
    WHERE `ScooterID` = newScooterID;
END //

DELIMITER ;

-- DELIMITER //

-- CREATE PROCEDURE StopRentalLog(IN thisRentalLogID INT)
-- BEGIN

--     DECLARE costAmount DECIMAL(15, 2);
--     DECLARE timeBasedFee DECIMAL(15,2);
--     DECLARE thisTimeBasedFee DECIMAL(15,2);
--     DECLARE thisEndStation INT;
--     DECLARE thisStartStation INT;
--     DECLARE thisScooter INT;
--     DECLARE thisStationType VARCHAR(50);
--     DECLARE thisStatus VARCHAR(50);
--     DECLARE thisStartTime DATETIME;
--     DECLARE thisEndTime DATETIME;
--     DECLARE timeInMinutes INT;

--     SELECT `EndStation` INTO thisEndStation FROM `RentalLog` WHERE `RentalLogID` = thisRentalLogID;
--     SELECT `StartStation` INTO thisStartStation FROM `RentalLog` WHERE `RentalLogID` = thisRentalLogID;
--     SELECT `ScooterID` INTO thisScooter FROM `RentalLog` WHERE `RentalLogID` = thisRentalLogID;

--     -- If the Scooter has now been parked in a Station
--     IF thisEndStation IS NOT NULL THEN
--         -- If the scooter was NOT rented from a Station at the beginning
--         SELECT `StationTypeDesc` INTO thisStationType FROM `StationType` WHERE `StationTypeID` = thisEndStation;

--         IF thisStartStation IS NULL THEN
--             -- Update Cost with a discount
--             SELECT `CostAmount` INTO costAmount FROM `CostStructure` WHERE `CostID` = 4;

--             UPDATE `RentalLog`
--             SET `Cost` = `Cost` - costAmount
--             WHERE `RentalLogID` = thisRentalLogID;
--         END IF;
--     ELSE 
--         -- Add a fine to the cost
--         SELECT `CostAmount` INTO costAmount FROM `CostStructure` WHERE `CostID` = 3;

--         UPDATE `RentalLog`
--         SET `Cost` = `Cost` + costAmount
--         WHERE `RentalLogID` = thisRentalLogID;

--     END IF;
    
--     -- Find the status of the Scooter
--     IF thisStationType IS NULL THEN
--         SET thisStatus = 'Parked (Outside of Station)';
--     ELSEIF thisStationType = 'Parking' THEN
--         SET thisStatus = 'Parked (At Station)';
--     ELSE
--         SET thisStatus = 'Charging';
--     END IF;

--     -- Scooter status
--     UPDATE `Scooter`
--     SET `Status` = thisStatus
--     WHERE `ScooterID` = thisScooter;

--     -- Calculate the time-based fee
--     SELECT `CostAmount` INTO timeBasedFee FROM `CostStructure` WHERE `CostID` = 2;
--     SELECT `StartTime`, `EndTime` INTO thisStartTime, thisEndTime FROM `RentalLog` WHERE `RentalLogID` = thisRentalLogID;
--     SET timeInMinutes = TIMESTAMPDIFF(MINUTE, thisStartTime, thisEndTime);
--     SET thisTimeBasedFee = timeInMinutes * timeBasedFee;
--     UPDATE `RentalLog`
--     SET `Cost` = `Cost` + thisTimeBasedFee
--     WHERE `RentalLogID` = thisRentalLogID;

-- END //

-- DELIMITER ;

DROP PROCEDURE IF EXISTS AddRentalLogCost;

DELIMITER ;;

CREATE PROCEDURE AddRentalLogCost(IN a_RentalLogID INT, IN a_CostID INT, IN factor INT)
BEGIN
    DECLARE oldCost DECIMAL(15, 2);
    DECLARE newCost DECIMAL(15, 2);

        -- Set the cost as the CostAmount from the CostID parameter
    SELECT `Cost`
    INTO oldCost
    FROM `RentalLog`
    WHERE `RentalLogID` = a_RentalLogID;

    -- Set the cost as the CostAmount from the CostID parameter
    SELECT `CostAmount`
    INTO newCost
    FROM `CostStructure`
    WHERE `CostID` = a_CostID;

    -- Update the cost of the Rental by adding the cost
    UPDATE `RentalLog`
    SET `Cost` = oldCost + (newCost*factor)
    WHERE `RentalLogID` = a_RentalLogID;

END ;;

DELIMITER ;