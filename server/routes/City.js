const express = require('express');
const pool = require('../db/database')
const router = express.Router();

// GET ALL CITIES
router.get('/', async function(req, res) {
    try {
        const sql = `
            SELECT
                *
            FROM
                City
            `
        const rows = await pool.query(sql)
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// GET CITY BY CityID
router.get('/:id', async function(req, res) {
    try {
        const sql = `
            SELECT
                CityName
            FROM
                City
            WHERE
                CityID=?`
        const rows = await pool.query(sql, req.params.id)
        res.status(200).json(rows);
    } catch (error) {
        res.status(400).send(error.message)
    }

    // res.status(200).json({
    //     id: req.params.id
    // })
})

module.exports = router;