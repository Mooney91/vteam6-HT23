const express = require('express')
const router = express.Router()
// const pool = require('../../db/database.js')
const city = require('../models/City.js')

router.get('/', (req, res) => city.getAllCities(req, res))
router.get('/:id', (req, res) => city.getSingleCity(req, res))

router.post('/', (req, res) => city.createCity(req, res))

router.put('/:id', (req, res) => city.updateCity(req, res))

router.delete('/', (req, res) => city.deleteAllCities(req, res))
router.delete('/:id', (req, res) => city.deleteCity(req, res))

module.exports = router
