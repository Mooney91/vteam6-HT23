const express = require('express');
const router = express.Router();
// const pool = require('../../db/database.js')
const scooter = require("../models/Scooter.js");

router.get('/', (req, res) => scooter.getAllScooters(req, res));
router.get('/:id', (req, res) => scooter.getSingleScooter(req,res));

router.post('/', (req, res) => scooter.createScooter(req, res));

router.put('/:id', (req, res) => scooter.updateScooter(req, res));

router.delete('/', (req, res) => scooter.deleteAllScooters(req, res));
router.delete('/:id', (req, res) => scooter.deleteScooter(req, res));

module.exports = router;