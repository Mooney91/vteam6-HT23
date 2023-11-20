const pool = require('../../db/database')

const city = {
    /**
     * Get all the Cities.
     * @function
     * @async
     * @param {Object} req - Request
     * @param {Object} res - Response
     * @returns {Object} - The list of cities.
     */
    getAllCities: async function getAllCities(req, res) {
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

    /**
     * Get single City.
     * @function
     * @async
     * @param {Object} req - Request.
     * @param {Object} res - Response.
     * @returns {Object} - Details about a single city.
     */
    getSingleCity: async function getSingleCity(req, res) {
        try {
            const sql = `
                SELECT
                    CityName
                FROM
                    City
                WHERE
                    CityID = ?
               `
            const rows = await pool.query(sql, req.params.id)
            res.status(200).json(rows);
        } catch (error) {
            res.status(400).send(error.message)
        }
    },

    /**
     * Create a new City.
     * @function
     * @async
     * @param {Object} req - Request (with CityName).
     * @param {Object} res - Response.
     * @returns {Object} - Details of the new City.
     */
    createCity: async function createCity(req, res) {
        try {
            const sql = `
                INSERT INTO
                    City (CityName)
                VALUES (?)`
            const rows = await pool.query(sql, req.body.CityName)
            res.status(200).json({message: 'The city was created successfully.'});
        } catch (error) {
            res.status(400).send(error.message)
        }
    },

    /**
     * Update a City.
     * @function
     * @async
     * @param {Object} req - Request (CityName, CityID).
     * @param {Object} res - Response.
     * @returns {Object} - Details of the updated City.
     */
    updateCity: async function updateCity(req, res) {
        try {
            const sql = `
                UPDATE City
                SET CityName = ?
                WHERE CityID = ?;`
            const rows = await pool.query(sql, [req.body.CityName, req.params.id])
            res.status(200).json({message: 'The city was updated successfully.'});
        } catch (error) {
            res.status(400).send(error.message)
        }
    },

    /**
     * Delete all Cities.
     * @function
     * @async
     * @param {Object} req - Request.
     * @param {Object} res - Response.
     * @returns {Object} - Success response.
     */
    deleteAllCities: async function deleteAllCities(req, res) {
        try {
            const sql = `
                DELETE FROM City;`
            const rows = await pool.query(sql)
            res.status(200).json({message: 'All cities were deleted successfully.'});
        } catch (error) {
            res.status(400).send(error.message)
        }
    },

    /**
     * Delete a single City.
     * @function
     * @async
     * @param {Object} req - Request (CityID).
     * @param {Object} res - Response.
     * @returns {Object} - Success response.
     */
    deleteCity: async function deleteCity(req, res) {
        try {
            const sql = `
                DELETE FROM City
                WHERE CityID = ?;`
            const rows = await pool.query(sql, req.params.id)
            res.status(200).json({message: 'The city was deleted successfully.'});
        } catch (error) {
            res.status(400).send(error.message)
        }
    }
};

module.exports = city;
