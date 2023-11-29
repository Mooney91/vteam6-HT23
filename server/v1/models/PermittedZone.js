const pool = require('../../db/database')

const permittedZone = {
    getAllPermittedZones: async function(req, res) {
        try {
            const sql = `
                SELECT
                    *
                FROM
                    PermittedZone
            `;
            const rows = await pool.query(sql);
            res.status(200).json(rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    getSinglePermittedZone: async function(req, res) {
        try {
            const sql = `
                SELECT
                    *
                FROM
                    PermittedZone
                WHERE
                    PermittedZoneID = ?
            `;
            const rows = await pool.query(sql, req.params.id);
            res.status(200).json(rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    createPermittedZone: async function(req, res) {
        try {
            const sql = `
                INSERT INTO
                    PermittedZone (ZoneName, ZoneArea, CityID)
                VALUES (?, ?, ?)
            `;
            const values = [req.body.ZoneName, req.body.ZoneArea, req.body.CityID];
            const rows = await pool.query(sql, values);
            res.status(200).json({ message: 'The permitted zone was created successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    updatePermittedZone: async function(req, res) {
        try {
            const sql = `
                UPDATE
                    PermittedZone
                SET
                    ZoneName = ?, ZoneArea = ?, CityID = ?
                WHERE
                    PermittedZoneID = ?;
            `;
            const values = [req.body.ZoneName, req.body.ZoneArea, req.body.CityID, req.params.id];
            const rows = await pool.query(sql, values);
            res.status(200).json({ message: 'The permitted zone was updated successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    deleteAllPermittedZones: async function(req, res) {
        try {
            const sql = `
                DELETE FROM
                    PermittedZone;
            `;
            const rows = await pool.query(sql);
            res.status(200).json({ message: 'All permitted zones were deleted successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    deletePermittedZone: async function(req, res) {
        try {
            const sql = `
                DELETE FROM
                    PermittedZone
                WHERE
                    PermittedZoneID = ?;
            `;
            const rows = await pool.query(sql, req.params.id);
            res.status(200).json({ message: 'The permitted zone was deleted successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};

module.exports = permittedZone;
