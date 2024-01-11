const express = require('express')
const router = express.Router()
// const pool = require('../../db/database.js')
const scooterLog = require('../models/ScooterLog.js')

router.get('/', (req, res) => scooterLog.getAllScooterLogs(req, res))
router.get('/:id', (req, res) => scooterLog.getSingleScooterLog(req, res))

router.post('/', (req, res) => scooterLog.createScooterLog(req, res))

router.put('/:id', (req, res) => scooterLog.updateScooterLog(req, res))

router.delete('/', (req, res) => scooterLog.deleteAllScooterLogs(req, res))
router.delete('/:id', (req, res) => scooterLog.deleteScooterLog(req, res))

module.exports = router
