const pool = require('../../db/database')

const stationType = {
    getAllStationTypes: async function(req, res) {
        try {
            const sql = `
                SELECT
                    *
                FROM
                    StationType
            `;
            const rows = await pool.query(sql);
            res.status(200).json(rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    getSingleStationType: async function(req, res) {
        try {
            const sql = `
                SELECT
                    StationTypeDesc
                FROM
                    StationType
                WHERE
                    StationTypeID = ?
            `;
            const rows = await pool.query(sql, req.params.id);
            res.status(200).json(rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    createStationType: async function(req, res) {
        try {
            const sql = `
                INSERT INTO
                    StationType (StationTypeDesc)
                VALUES (?)
            `;
            const values = [req.body.StationTypeDesc];
            const rows = await pool.query(sql, values);
            res.status(200).json({ message: 'The station type was created successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    updateStationType: async function(req, res) {
        try {
            const sql = `
                UPDATE
                    StationType
                SET
                    StationTypeDesc = ?
                WHERE
                    StationTypeID = ?;
            `;
            const values = [req.body.StationTypeDesc, req.params.id];
            const rows = await pool.query(sql, values);
            res.status(200).json({ message: 'The station type was updated successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    deleteAllStationTypes: async function(req, res) {
        try {
            const sql = `
                DELETE FROM
                    StationType;
            `;
            const rows = await pool.query(sql);
            res.status(200).json({ message: 'All station types were deleted successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    deleteStationType: async function(req, res) {
        try {
            const sql = `
                DELETE FROM
                    StationType
                WHERE
                    StationTypeID = ?;
            `;
            const rows = await pool.query(sql, req.params.id);
            res.status(200).json({ message: 'The station type was deleted successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};

module.exports = stationType;
