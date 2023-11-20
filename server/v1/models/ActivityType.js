const pool = require('../../db/database')

const activityType = {
    getAllActivityTypes: async function(req, res) {
        try {
            const sql = `
                SELECT
                    *
                FROM
                    ActivityType
            `;
            const rows = await pool.query(sql);
            res.status(200).json(rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    getSingleActivityType: async function(req, res) {
        try {
            const sql = `
                SELECT
                    ActivityTypeDesc
                FROM
                    ActivityType
                WHERE
                    ActivityTypeID = ?
            `;
            const rows = await pool.query(sql, req.params.id);
            res.status(200).json(rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    createActivityType: async function(req, res) {
        try {
            const sql = `
                INSERT INTO
                    ActivityType (ActivityTypeDesc)
                VALUES (?)
            `;
            const rows = await pool.query(sql, req.body.ActivityTypeDesc);
            res.status(200).json({ message: 'The activity type was created successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    updateActivityType: async function(req, res) {
        try {
            const sql = `
                UPDATE
                    ActivityType
                SET
                    ActivityTypeDesc = ?
                WHERE
                    ActivityTypeID = ?;
            `;
            const rows = await pool.query(sql, [req.body.ActivityTypeDesc, req.params.id]);
            res.status(200).json({ message: 'The activity type was updated successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    deleteAllActivityTypes: async function(req, res) {
        try {
            const sql = `
                DELETE FROM
                    ActivityType;
            `;
            const rows = await pool.query(sql);
            res.status(200).json({ message: 'All activity types were deleted successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    deleteActivityType: async function(req, res) {
        try {
            const sql = `
                DELETE FROM
                    ActivityType
                WHERE
                    ActivityTypeID = ?;
            `;
            const rows = await pool.query(sql, req.params.id);
            res.status(200).json({ message: 'The activity type was deleted successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};

module.exports = activityType;
