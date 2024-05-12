const express = require('express')
const router = express.Router()
const DivisiController = require('../controllers/divisi.controller')

router.get('/', DivisiController.getAll)

module.exports = router