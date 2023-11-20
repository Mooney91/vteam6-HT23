const express = require('express');
const router = express.Router();
// const pool = require('../../db/database.js')
const station = require("../models/Station.js");

router.get('/', (req, res) => station.getAllStations(req, res));
router.get('/:id', (req, res) => station.getSingleStation(req,res));

router.post('/', (req, res) => station.createStation(req, res));

router.put('/:id', (req, res) => station.updateStation(req, res));

router.delete('/', (req, res) => station.deleteAllStations(req, res));
router.delete('/:id', (req, res) => station.deleteStation(req, res));

module.exports = router;