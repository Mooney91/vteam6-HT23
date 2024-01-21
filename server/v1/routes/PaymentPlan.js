const express = require('express')
const router = express.Router()
// const pool = require('../../db/database.js')
const plan = require('../models/PaymentPlan.js')

router.get('/:id', (req, res) => plan.getSinglePlan(req, res))

router.post('/', (req, res) => plan.createPlan(req, res))

router.put('/:id', (req, res) => plan.updatePlan(req, res))

router.delete('/:id', (req, res) => plan.deletePlan(req, res))

module.exports = router
