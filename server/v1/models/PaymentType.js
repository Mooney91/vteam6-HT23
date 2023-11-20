const pool = require('../../db/database')

const paymentType = {
    getAllPaymentTypes: async function(req, res) {
        try {
            const sql = `
                SELECT
                    *
                FROM
                    PaymentType
            `;
            const rows = await pool.query(sql);
            res.status(200).json(rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    getSinglePaymentType: async function(req, res) {
        try {
            const sql = `
                SELECT
                    PaymentTypeDesc
                FROM
                    PaymentType
                WHERE
                    PaymentTypeID = ?
            `;
            const rows = await pool.query(sql, req.params.id);
            res.status(200).json(rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    createPaymentType: async function(req, res) {
        try {
            const sql = `
                INSERT INTO
                    PaymentType (PaymentTypeDesc)
                VALUES (?)
            `;
            const rows = await pool.query(sql, req.body.PaymentTypeDesc);
            res.status(200).json({ message: 'The payment type was created successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    updatePaymentType: async function(req, res) {
        try {
            const sql = `
                UPDATE
                    PaymentType
                SET
                    PaymentTypeDesc = ?
                WHERE
                    PaymentTypeID = ?;
            `;
            const rows = await pool.query(sql, [req.body.PaymentTypeDesc, req.params.id]);
            res.status(200).json({ message: 'The payment type was updated successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    deleteAllPaymentTypes: async function(req, res) {
        try {
            const sql = `
                DELETE FROM
                    PaymentType;
            `;
            const rows = await pool.query(sql);
            res.status(200).json({ message: 'All payment types were deleted successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    },

    deletePaymentType: async function(req, res) {
        try {
            const sql = `
                DELETE FROM
                    PaymentType
                WHERE
                    PaymentTypeID = ?;
            `;
            const rows = await pool.query(sql, req.params.id);
            res.status(200).json({ message: 'The payment type was deleted successfully.' });
        } catch (error) {
            res.status(400).send(error.message);
        }
    }
};

module.exports = paymentType;
