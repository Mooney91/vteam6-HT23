const express = require('express');
const router = express.Router();
// const pool = require('../../db/database.js')
const stationType = require("../models/StationType.js");

router.get('/', (req, res) => stationType.getAllStationTypes(req, res));
router.get('/:id', (req, res) => stationType.getSingleStationType(req,res));

router.post('/', (req, res) => stationType.createStationType(req, res));

router.put('/:id', (req, res) => stationType.updateStationType(req, res));

router.delete('/', (req, res) => stationType.deleteAllStationTypes(req, res));
router.delete('/:id', (req, res) => stationType.deleteStationType(req, res));

module.exports = router;