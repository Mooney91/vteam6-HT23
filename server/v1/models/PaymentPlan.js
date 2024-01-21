const pool = require('../../db/database')

const plan = {

  getSinglePlan: async function (req, res) {
    try {
      const sql = `
                SELECT
                    *
                FROM
                    PaymentPlan
                WHERE
                    UserID = ?
            `
      const rows = await pool.query(sql, req.params.id)
      res.status(200).json(rows)
    } catch (error) {
      res.status(400).send(error.message)
    }
  },

  createPlan: async function (req, res) {
    try {
      const sql = `
                INSERT INTO
                    PaymentPlan (UserID, Cost, Unpaid)
                VALUES (?, ?, ?)
            `
      const values = [
        req.body.UserID,
        req.body.Cost,
        req.body.Unpaid,
      ]
      await pool.query(sql, values)
      res.status(200).json({ message: 'The payment plan was created successfully.' })
    } catch (error) {
      res.status(400).send(error.message)
    }
  },

  updatePlan: async function (req, res) {
    try {
      const sql = `
                UPDATE
                    PaymentPlan
                SET
                    Cost = ?,
                    Unpaid = ?
                WHERE
                    UserID = ?;
            `
      const values = [
        req.body.Cost,
        req.body.Unpaid,
        req.body.UserID
      ]
      await pool.query(sql, values)
      res.status(200).json({ message: 'The payment plan was updated successfully.' })
    } catch (error) {
      res.status(400).send(error.message)
    }
  },

  deletePlan: async function (req, res) {
    try {
      const sql = `
                DELETE FROM
                    PaymentPlan
                WHERE
                    UserID = ?;
            `
      await pool.query(sql, req.params.id)
      res.status(200).json({ message: 'The payment plan was deleted successfully.' })
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
}

module.exports = plan
