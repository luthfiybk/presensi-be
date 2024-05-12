const express = require('express')
const router = express.Router()
const StatusController = require('../controllers/status.controller')

router.get('/', StatusController.getAll)

module.exports = router