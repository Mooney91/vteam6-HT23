const express = require('express')
const router = express.Router()
// const pool = require('../../db/database.js')
const costStructure = require('../models/CostStructure.js')

router.get('/', (req, res) => costStructure.getAllCostStructures(req, res))
router.get('/:id', (req, res) => costStructure.getSingleCostStructure(req, res))

router.post('/', (req, res) => costStructure.createCostStructure(req, res))

router.put('/:id', (req, res) => costStructure.updateCostStructure(req, res))

router.delete('/', (req, res) => costStructure.deleteAllCostStructures(req, res))
router.delete('/:id', (req, res) => costStructure.deleteCostStructure(req, res))

module.exports = router
