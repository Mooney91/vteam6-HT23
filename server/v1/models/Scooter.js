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
