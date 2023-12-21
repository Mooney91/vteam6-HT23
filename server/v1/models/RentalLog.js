const pool = require('../../db/database')

const rentalLog = {
    getAllRentalLogs: async function(req, res) {
        try {
            const sql = `
                SELECT
                    *
                FROM
                    RentalLog
            `;
            const rows = await pool.query(sql);
            res.status(200).json(rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    getSingleRentalLog: async function(req, res) {
        try {
            const sql = `
                SELECT
                    *
                FROM
                    RentalLog
                WHERE
                    RentalLogID = ?
            `;
            const rows = await pool.query(sql, req.params.id);
            res.status(200).json(rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    createRentalLog: async function(req, res) {
        try {
            const sql = `
                INSERT INTO
                    RentalLog (ScooterID, UserID, StartStation)
                VALUES (?, ?, ?)
            `;
            const values = [
                req.body.ScooterID,
                req.body.UserID,
                req.body.StartStation,
            ];
                
            const rows = await pool.query(sql, values);
            console.log(rows);
             // Check if the insert was successful
            if (rows.affectedRows > 0) {
                // Call AddRentalLog: add fixed fee, update Scooter Status
                console.log(rows.insertId)
                const sqlCall = 'CALL AddRentalLog(?, ?)';
                const valuesCall = [rows.insertId, req.body.ScooterID];
                await pool.query(sqlCall, valuesCall);

                res.status(200).json({ RentalLogID: rows.insertId });
            } else {
                res.status(400).json({ message: 'Failed to create the rental log.' });
            }
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    updateRentalLog: async function(req, res) {
        try {
            const sql = `
                UPDATE
                    RentalLog
                SET
                    Active = ?,
                    ScooterID = ?,
                    UserID = ?,
                    StartTime = ?,
                    EndTime = ?,
                    StartStation = ?,
                    EndStation = ?,
                    Cost = ?,
                    Paid = ?
                WHERE
                    RentalLogID = ?;
            `;
            const values = [
                req.body.Active,
                req.body.ScooterID,
                req.body.UserID,
                req.body.StartTime,
                req.body.EndTime,
                req.body.StartStation,
                req.body.EndStation,
                req.body.Cost,
                req.body.Paid,
                req.params.id
            ];
            const rows = await pool.query(sql, values);
            res.status(200).json({ message: 'The rental log was updated successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    stopRentalLog: async function(req, res) {
        try {
            // Update Active, the EndStation, and EndTime
            const sql = `
                UPDATE
                    RentalLog
                SET
                    Active = false,
                    EndStation = ?,
                    EndTime = NOW()
                WHERE
                    RentalLogID = ?;
            `;
            const values = [
                req.body.EndStation,
                req.params.id
            ];

            // Update Rental Log
            let rows;

            try {
                rows = await pool.query(sql, values);
                console.log("Rental Log update:", rows);
            } catch (error) {
                console.error("Error while updating RentalLog:", error);
                return res.status(400).json({ message: 'Error while updating RentalLog.' });
            }

            if (rows.affectedRows > 0) {
                // Fetch the rental data for this RentalLog
                const rentalSQL = `
                SELECT
                    *
                FROM
                    RentalLog
                WHERE
                    RentalLogID = ?;
            `
                let rentalData;
                let startStation;

                try {
                    rentalData = await pool.query(rentalSQL, req.params.id);
                    startStation = rentalData[0].StartStation;
                    console.log("Fetching Rental Data:", rentalData);
                    console.log("Start Station: ", startStation)
                } catch (error) {
                    console.error("Error while querying the StartStation:", error);
                    return res.status(400).json({ message: 'Error while querying the StartStation.' });
                }

                // Adding Costs
                if (req.body.EndStation === null) {
                    console.log("Adding a fine");
                    // Add a fine
                    await this.AddRentalLogCost(req.params.id, 3, 1)
                } else if (startStation === null) {
                    console.log("Adding a discount");
                    // Add a discount
                    await this.AddRentalLogCost(req.params.id, 4, 1)
                }

                // Calculate the total time, in minutes, of the  rental
                const endTime = new Date(rentalData[0].EndTime);
                const startTime = new Date(rentalData[0].StartTime);
                const timeDifference = endTime - startTime;
                const factor = timeDifference / (1000 * 60);

                console.log("EndTime: ", endTime)
                console.log("StartTime: ", startTime)
                console.log("Factor: ", factor)
                
                // Add time-based cost
                console.log("Adding time-based cost");
                await this.AddRentalLogCost(req.params.id, 2, factor)

                console.log("Updating status on Scooter")

                const stationSQL = `
                    SELECT st.StationTypeDesc
                    FROM Station AS s
                    JOIN StationType AS st ON s.StationType = st.StationTypeID
                    WHERE s.StationID = ?;
                `

                let stationRows;

                try {
                    stationRows =  await pool.query(stationSQL, [rentalData[0].EndStation]);
                    console.log("Fetching StationType: ", stationRows[0])
                } catch (error) {
                    console.error("Error while fetching StationTypeDesc:", error);
                    return res.status(400).json({ message: 'Error while fetching StationTypeDesc.' });
                }

                let scooterStatus;

                switch (stationRows[0].StationTypeDesc) {
                    case null:
                        scooterStatus = "Free Parking";
                        break;
                    case "Parking":
                        scooterStatus = "Parked";
                        break;
                    case "Charging":
                        scooterStatus = "Charging";
                        break;
                    default:
                        scooterStatus = "Unknown";
                        break;
                }
                  
                console.log("ScooterStatus: ", scooterStatus)

                const scooterSQL = `
                UPDATE
                    Scooter
                SET
                    Status = ?
                WHERE
                    ScooterID = ?;
                `;
                const scooterValues = [scooterStatus, rentalData[0].ScooterID];

                let scooterRows;
                try {
                    scooterRows = await pool.query(scooterSQL, scooterValues);
                    console.log("Update Scooter: ", scooterRows)
                } catch (error) {
                    console.error("Error while updating Scooter's status:", error);
                    return res.status(400).json({ message: 'Error while updating Scooter status.' });
                }

                res.status(200).json({ message: 'The rental log was stopped successfully.' });
            } else {
                res.status(400).json({ message: 'Failed to stop the rental log.' });
            }

        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    deleteAllRentalLogs: async function(req, res) {
        try {
            const sql = `
                DELETE FROM
                    RentalLog;
            `;
            const rows = await pool.query(sql);
            res.status(200).json({ message: 'All rental logs were deleted successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    deleteRentalLog: async function(req, res) {
        try {
            const sql = `
                DELETE FROM
                    RentalLog
                WHERE
                    RentalLogID = ?;
            `;
            const rows = await pool.query(sql, req.params.id);
            res.status(200).json({ message: 'The rental log was deleted successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    AddRentalLogCost: async function(rentalLogID, costType, factor) {
        const sqlCall = 'CALL AddRentalLogCost(?, ?, ?)';
        const valuesCall = [rentalLogID, costType, factor];
        let fee;

        try {
            fee = await pool.query(sqlCall, valuesCall);
            console.log("Adding new cost: ", fee)
        } catch (error) {
            console.error("Error while adding a fee:", error);
            return res.status(400).json({ message: 'Error while adding a fee.' });
        }
    }
};

module.exports = rentalLog;
