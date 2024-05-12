const express = require('express')
const router = express.Router()
const PresensiController = require('../controllers/presensi.controller')
const auth = require('../middleware/auth')

router.get('/', PresensiController.getAll)
router.post('/masuk', PresensiController.presensiMasuk)

module.exports = router