const express = require('express')
const router = express.Router()
const IzinController = require('../controllers/izin.controller')
const upload = require('../helpers/uploadThing')

router.get('/', IzinController.getAll)
router.post('/apply', upload.single('file'), IzinController.applyIzin)

module.exports = router