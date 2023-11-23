const pool = require('../../db/database')

const user = {
    getAllUsers: async function(req, res) {
        try {
            const sql = `
                SELECT
                    *
                FROM
                    User
            `;
            const rows = await pool.query(sql);
            res.status(200).json(rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    getSingleUser: async function(req, res) {
        try {
            const sql = `
                SELECT
                    FirstName, LastName, Password, Email, AccountBalance, PaymentType
                FROM
                    User
                WHERE
                    UserID = ?
            `;
            const rows = await pool.query(sql, req.params.id);
            res.status(200).json(rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    createUser: async function(req, res) {
        try {
            const sql = `
                INSERT INTO
                    User (FirstName, LastName, Password, Email, AccountBalance, PaymentType)
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            const values = [
                req.body.FirstName,
                req.body.LastName,
                req.body.Password,
                req.body.Email,
                req.body.AccountBalance,
                req.body.PaymentType
            ];
            const rows = await pool.query(sql, values);
            res.status(200).json({ message: 'The user was created successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    updateUser: async function(req, res) {
        try {
            const sql = `
                UPDATE
                    User
                SET
                    FirstName = ?,
                    LastName = ?,
                    Password = ?,
                    Email = ?,
                    AccountBalance = ?,
                    PaymentType = ?
                WHERE
                    UserID = ?;
            `;
            const values = [
                req.body.FirstName,
                req.body.LastName,
                req.body.Password,
                req.body.Email,
                req.body.AccountBalance,
                req.body.PaymentType,
                req.params.id
            ];
            const rows = await pool.query(sql, values);
            res.status(200).json({ message: 'The user was updated successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    deleteAllUsers: async function(req, res) {
        try {
            const sql = `
                DELETE FROM
                    User;
            `;
            const rows = await pool.query(sql);
            res.status(200).json({ message: 'All users were deleted successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    deleteUser: async function(req, res) {
        try {
            const sql = `
                DELETE FROM
                    User
                WHERE
                    UserID = ?;
            `;
            const rows = await pool.query(sql, req.params.id);
            res.status(200).json({ message: 'The user was deleted successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};

module.exports = user;
