const express = require('express')
const router = express.Router()
const GedungController = require('../controllers/gedung.controller')

router.get('/', GedungController.getAll)

module.exports = router