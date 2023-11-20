const pool = require('../../db/database')

const station = {
    getAllStations: async function(req, res) {
        try {
            const sql = `
                SELECT
                    *
                FROM
                    Station
            `;
            const rows = await pool.query(sql);
            res.status(200).json(rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    getSingleStation: async function(req, res) {
        try {
            const sql = `
                SELECT
                    StationName, Location, ScooterCapacity, ScooterOccupancy, StationType, CityID
                FROM
                    Station
                WHERE
                    StationID = ?
            `;
            const rows = await pool.query(sql, req.params.id);
            res.status(200).json(rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    createStation: async function(req, res) {
        try {
            const sql = `
                INSERT INTO
                    Station (StationName, Location, ScooterCapacity, ScooterOccupancy, StationType, CityID)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            const values = [
                req.body.StationName,
                req.body.Location,
                req.body.ScooterCapacity,
                req.body.ScooterOccupancy,
                req.body.StationType,
                req.body.CityID
            ];
            const rows = await pool.query(sql, values);
            res.status(200).json({ message: 'The station was created successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    updateStation: async function(req, res) {
        try {
            const sql = `
                UPDATE
                    Station
                SET
                    StationName = ?,
                    Location = ?,
                    ScooterCapacity = ?,
                    ScooterOccupancy = ?,
                    StationType = ?,
                    CityID = ?
                WHERE
                    StationID = ?;
            `;
            const values = [
                req.body.StationName,
                req.body.Location,
                req.body.ScooterCapacity,
                req.body.ScooterOccupancy,
                req.body.StationType,
                req.body.CityID,
                req.params.id
            ];
            const rows = await pool.query(sql, values);
            res.status(200).json({ message: 'The station was updated successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    deleteAllStations: async function(req, res) {
        try {
            const sql = `
                DELETE FROM
                    Station;
            `;
            const rows = await pool.query(sql);
            res.status(200).json({ message: 'All stations were deleted successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    deleteStation: async function(req, res) {
        try {
            const sql = `
                DELETE FROM
                    Station
                WHERE
                    StationID = ?;
            `;
            const rows = await pool.query(sql, req.params.id);
            res.status(200).json({ message: 'The station was deleted successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};

module.exports = station;
