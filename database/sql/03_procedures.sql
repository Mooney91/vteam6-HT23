DROP PROCEDURE IF EXISTS AddRentalLog;

DELIMITER ;;

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
END ;;

DELIMITER ;

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

DROP PROCEDURE IF EXISTS AddScooterOccupancy;

DELIMITER ;;

CREATE PROCEDURE AddScooterOccupancy(IN a_StationID INT, IN a_RentalLogID INT)
BEGIN
    DECLARE occupancy INT;
    DECLARE capacity INT;

    -- Fetch values for occupancy and capacity
    SELECT ScooterOccupancy, ScooterCapacity INTO occupancy, capacity
    FROM Station
    WHERE StationID = a_StationID;

    -- Check if it will exceed capacity
    IF (occupancy + 1) <= capacity THEN
        UPDATE Station
        SET ScooterOccupancy = occupancy + 1
        WHERE StationID = a_StationID;
        
        SELECT 'Update successful' AS Result;
    ELSE
        SELECT 'Scooter capacity exceeded' AS Result;
    END IF;
END ;;

DELIMITER ;

DROP PROCEDURE IF EXISTS RemoveScooterOccupancy;

DELIMITER ;;

CREATE PROCEDURE RemoveScooterOccupancy(IN a_StationID INT, IN a_RentalLogID INT)
BEGIN
    DECLARE occupancy INT;
    DECLARE capacity INT;

    -- Fetch values for occupancy and capacity
    SELECT ScooterOccupancy, ScooterCapacity INTO occupancy, capacity
    FROM Station
    WHERE StationID = a_StationID;

    -- Check if it will exceed capacity
    IF (occupancy - 1) >= 0 THEN
        UPDATE Station
        SET ScooterOccupancy = occupancy - 1
        WHERE StationID = a_StationID;
        
        SELECT 'Update successful' AS Result;
    ELSE
        SELECT 'Occupancy below zero...!' AS Result;
    END IF;
END ;;

DELIMITER ;