const pool = require('../../db/database')

const scooter = {
    getAllScooters: async function(req, res) {
        try {
            const sql = `
                SELECT
                    *
                FROM
                    Scooter
            `;
            const rows = await pool.query(sql);
            res.status(200).json(rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    getAvailableScooters: async function(req, res) {
        try {
            const sql = `
                SELECT
                    *
                FROM
                    Scooter
                WHERE
                    Status = 'Available'
            `;
            const rows = await pool.query(sql);
            res.status(200).json(rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    getSingleScooter: async function(req, res) {
        try {
            const sql = `
                SELECT
                    *
                FROM
                    Scooter
                WHERE
                    ScooterID = ?
            `;
            const rows = await pool.query(sql, req.params.id);
            res.status(200).json(rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    createScooter: async function(req, res) {
        try {
            const sql = `
                INSERT INTO
                    Scooter (Status, Location, Speed, Battery, StationID)
                VALUES (?, ?, ?, ?, ?)
            `;
            const values = [
                req.body.Status,
                req.body.Location,
                req.body.Speed,
                req.body.Battery,
                req.body.StationID
            ];
            const rows = await pool.query(sql, values);
            res.status(200).json({ message: 'The scooter was created successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    updateScooter: async function(req, res) {
        try {
            const sql = `
                UPDATE
                    Scooter
                SET
                    Status = ?,
                    Location = ?,
                    Speed = ?,
                    Battery = ?,
                    StationID = ?
                WHERE
                    ScooterID = ?;
            `;
            const values = [
                req.body.Status,
                req.body.Location,
                req.body.Speed,
                req.body.Battery,
                req.body.StationID,
                req.params.id
            ];
            const rows = await pool.query(sql, values);
            res.status(200).json({ message: 'The scooter was updated successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    parkScooter: async function(req, res) {
        try {
            const values = [
                req.params.StationID,
                req.params.id,
            ]

            const stationTypeSQL = `
                SELECT StationType
                FROM Station
                WHERE StationID = ?;
            `

            let stationTypeRows;

            try {
                stationTypeRows = await pool.query(stationTypeSQL, [req.params.StationID]);
                console.log("StationType fetched: ", stationTypeRows);
            } catch (error)  {
                console.log("StationID on Scooter could not be updated.")
            }

            let scooterStatus;

            if (stationTypeRows[0].StationType === 1) {
                scooterStatus = "Parked";
            } else if (stationTypeRows[0].StationType === 2) {
                scooterStatus = "Charging";
            }

            console.log(stationTypeRows);
            console.log(scooterStatus);

            const stationSQL = `
                CALL AddScooterOccupancy(?, ?);
            `
            try {
                const stationRows = await pool.query(stationSQL, values);
                console.log("Station updated: ", stationRows)
            } catch (error)  {
                console.log("Station could not be updated.")
            }

            const sql = `
                UPDATE
                    Scooter
                SET
                    Status = ?,
                    StationID = ?
                WHERE
                    ScooterID = ?
            `
            try {
                const rows = await pool.query(sql, [
                    scooterStatus,
                    req.params.StationID,
                    req.params.id
                ]);
                console.log("Station updated on Scooter: ", rows);
            } catch (error)  {
                console.log("StationID on Scooter could not be updated.")
            }

            res.status(200).json({ message: 'The scooter was parked successfully.' });

        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    unparkScooter: async function(req, res) {
        try {
            const values = [
                req.params.StationID,
                req.params.id,
            ]

            const stationSQL = `
                CALL RemoveScooterOccupancy(?, ?);
            `
            try {
                const stationRows = await pool.query(stationSQL, values);
                console.log("Station updated: ", stationRows)
            } catch (error)  {
                console.log("Station could not be updated.")
            }

            const sql = `
                UPDATE
                    Scooter
                SET
                    StationID = null
                WHERE
                    ScooterID = ?
            `
            try {
                const rows = await pool.query(sql, [req.params.id]);
                console.log("Station updated on Scooter: ", rows);
            } catch (error)  {
                console.log("StationID on Scooter could not be updated.")
            }

            res.status(200).json({ message: 'The scooter was unparked successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    deleteAllScooters: async function(req, res) {
        try {
            const sql = `
                DELETE FROM
                    Scooter;
            `;
            const rows = await pool.query(sql);
            res.status(200).json({ message: 'All scooters were deleted successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    deleteScooter: async function(req, res) {
        try {
            const sql = `
                DELETE FROM
                    Scooter
                WHERE
                    ScooterID = ?;
            `;
            const rows = await pool.query(sql, req.params.id);
            res.status(200).json({ message: 'The scooter was deleted successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};

module.exports = scooter;
