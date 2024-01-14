const pool = require('../../db/database')

const scooterLog = {
  getAllScooterLogs: async function (req, res) {
    try {
      const sql = `
                SELECT
                    *
                FROM
                    ScooterLog
            `
      const rows = await pool.query(sql)
      res.status(200).json(rows)
    } catch (error) {
      res.status(400).send(error.message)
    }
  },

  getSingleScooterLog: async function (req, res) {
    try {
      const sql = `
                SELECT
                    *
                FROM
                    ScooterLog
                WHERE
                    ScooterLogID = ?
            `
      const rows = await pool.query(sql, req.params.id)
      res.status(200).json(rows)
    } catch (error) {
      res.status(400).send(error.message)
    }
  },

  createScooterLog: async function (req, res) {
    try {
      const sql = `
                INSERT INTO
                    ScooterLog (ScooterID, ActivityType, StartStation, EndStation)
                VALUES (?, ?, ?, ?)
            `
      const values = [
        req.body.ScooterID,
        req.body.ActivityType,
        req.body.StartStation,
        req.body.EndStation
      ]
      await pool.query(sql, values)
      res.status(200).json({ message: 'The scooter log was created successfully.' })
    } catch (error) {
      res.status(400).send(error.message)
    }
  },

  updateScooterLog: async function (req, res) {
    try {
      const sql = `
                UPDATE
                    ScooterLog
                SET
                    ScooterID = ?,
                    ActivityType = ?,
                    StartStation = ?,
                    EndStation = ?
                WHERE
                    ScooterLogID = ?;
            `
      const values = [
        req.body.ScooterID,
        req.body.ActivityType,
        req.body.StartStation,
        req.body.EndStation,
        req.params.id
      ]
      await pool.query(sql, values)
      res.status(200).json({ message: 'The scooter log was updated successfully.' })
    } catch (error) {
      res.status(400).send(error.message)
    }
  },

  deleteAllScooterLogs: async function (req, res) {
    try {
      const sql = `
                DELETE FROM
                    ScooterLog;
            `
      await pool.query(sql)
      res.status(200).json({ message: 'All scooter logs were deleted successfully.' })
    } catch (error) {
      res.status(400).send(error.message)
    }
  },

  deleteScooterLog: async function (req, res) {
    try {
      const sql = `
                DELETE FROM
                    ScooterLog
                WHERE
                    ScooterLogID = ?;
            `
      await pool.query(sql, req.params.id)
      res.status(200).json({ message: 'The scooter log was deleted successfully.' })
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
}

module.exports = scooterLog
