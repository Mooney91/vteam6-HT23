const pool = require('../db/database')

const cities = {
    getCities: async function getCities(req, res) {
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
    },

    getSingleCity: async function getSingleCity(req, res) {
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
    },
};

module.exports = cities;
