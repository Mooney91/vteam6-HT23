const express = require('express')
const router = express.Router()
// const pool = require('../../db/database.js')
const user = require('../models/User.js')

router.get('/', (req, res) => user.getAllUsers(req, res))
router.get('/:id', (req, res) => user.getSingleUser(req, res))

router.post('/', (req, res) => user.createUser(req, res))

router.put('/:id', (req, res) => user.updateUser(req, res))

router.delete('/', (req, res) => user.deleteAllUsers(req, res))
router.delete('/:id', (req, res) => user.deleteUser(req, res))

module.exports = router
