const express = require('express');
const router = express.Router();
// const pool = require('../../db/database.js')
const rentalLog = require("../models/RentalLog.js");

router.get('/', (req, res) => rentalLog.getAllRentalLogs(req, res));
router.get('/:id', (req, res) => rentalLog.getSingleRentalLog(req,res));

router.post('/', (req, res) => rentalLog.createRentalLog(req, res));

router.put('/:id', (req, res) => rentalLog.updateRentalLog(req, res));

router.patch('/:id', (req, res) => rentalLog.stopRentalLog(req, res));

router.delete('/', (req, res) => rentalLog.deleteAllRentalLogs(req, res));
router.delete('/:id', (req, res) => rentalLog.deleteRentalLog(req, res));

module.exports = router;