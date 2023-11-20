const express = require('express');
const router = express.Router();
// const pool = require('../../db/database.js')
const activityType = require("../models/ActivityType.js");

router.get('/', (req, res) => activityType.getAllActivityTypes(req, res));
router.get('/:id', (req, res) => activityType.getSingleActivityType(req,res));

router.post('/', (req, res) => activityType.createActivityType(req, res));

router.put('/:id', (req, res) => activityType.updateActivityType(req, res));

router.delete('/', (req, res) => activityType.deleteAllActivityTypes(req, res));
router.delete('/:id', (req, res) => activityType.deleteActivityType(req, res));

module.exports = router;