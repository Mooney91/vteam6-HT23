const pool = require('../../db/database')

const costStructure = {
  getAllCostStructures: async function (req, res) {
    try {
      const sql = `
                SELECT
                    *
                FROM
                    CostStructure
            `
      const rows = await pool.query(sql)
      res.status(200).json(rows)
    } catch (error) {
      res.status(400).send(error.message)
    }
  },

  getSingleCostStructure: async function (req, res) {
    try {
      const sql = `
                SELECT
                    *
                FROM
                    CostStructure
                WHERE
                    CostID = ?
            `
      const rows = await pool.query(sql, req.params.id)
      res.status(200).json(rows)
    } catch (error) {
      res.status(400).send(error.message)
    }
  },

  createCostStructure: async function (req, res) {
    try {
      const sql = `
                INSERT INTO
                    CostStructure (CostDesc, CostAmount)
                VALUES (?)
            `
      await pool.query(sql, req.body.CostStructureDesc, req.body.CostAmount)
      res.status(200).json({ message: 'The payment type was created successfully.' })
    } catch (error) {
      res.status(400).send(error.message)
    }
  },

  updateCostStructure: async function (req, res) {
    try {
      const sql = `
                UPDATE
                    CostStructure
                SET
                    CostDesc = ?
                    CostAmount = ?
                WHERE
                    CostID = ?;
            `
      await pool.query(sql, [req.body.CostDesc, req.body.CostAmount, req.params.id])
      res.status(200).json({ message: 'The cost structures was updated successfully.' })
    } catch (error) {
      res.status(400).send(error.message)
    }
  },

  deleteAllCostStructures: async function (req, res) {
    try {
      const sql = `
                DELETE FROM
                    CostStructure;
            `
      await pool.query(sql)
      res.status(200).json({ message: 'All cost structures were deleted successfully.' })
    } catch (error) {
      res.status(400).send(error.message)
    }
  },

  deleteCostStructure: async function (req, res) {
    try {
      const sql = `
                DELETE FROM
                    CostStructure
                WHERE
                    CostID = ?;
            `
      await pool.query(sql, req.params.id)
      res.status(200).json({ message: 'The cost structure was deleted successfully.' })
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
}

module.exports = costStructure
