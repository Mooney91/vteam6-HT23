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
                    RentalLog (ScooterID, UserID, StartTime, EndTime, StartStation, EndStation, Cost, Paid)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
                req.body.ScooterID,
                req.body.UserID,
                req.body.StartTime,
                req.body.EndTime,
                req.body.StartStation,
                req.body.EndStation,
                req.body.Cost,
                req.body.Paid
            ];
            const rows = await pool.query(sql, values);
            res.status(200).json({ message: 'The rental log was created successfully.' });
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
    }
};

module.exports = rentalLog;
