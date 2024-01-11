const express = require('express')
const router = express.Router()
// const pool = require('../../db/database.js')
const permittedZone = require('../models/PermittedZone.js')

router.get('/', (req, res) => permittedZone.getAllPermittedZones(req, res))
router.get('/:id', (req, res) => permittedZone.getSinglePermittedZone(req, res))

router.post('/', (req, res) => permittedZone.createPermittedZone(req, res))

router.put('/:id', (req, res) => permittedZone.updatePermittedZone(req, res))

router.delete('/', (req, res) => permittedZone.deleteAllPermittedZones(req, res))
router.delete('/:id', (req, res) => permittedZone.deletePermittedZone(req, res))

module.exports = router
