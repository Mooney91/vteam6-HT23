const express = require('express')
const router = express.Router()
// const pool = require('../../db/database.js')
const paymentType = require('../models/PaymentType.js')

router.get('/', (req, res) => paymentType.getAllPaymentTypes(req, res))
router.get('/:id', (req, res) => paymentType.getSinglePaymentType(req, res))

router.post('/', (req, res) => paymentType.createPaymentType(req, res))

router.put('/:id', (req, res) => paymentType.updatePaymentType(req, res))

router.delete('/', (req, res) => paymentType.deleteAllPaymentTypes(req, res))
router.delete('/:id', (req, res) => paymentType.deletePaymentType(req, res))

module.exports = router
