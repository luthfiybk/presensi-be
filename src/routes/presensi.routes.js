const express = require('express')
const router = express.Router()
const PresensiController = require('../controllers/presensi.controller')
const auth = require('../middleware/auth')

router.get('/', PresensiController.getAll)
router.get('/:id', PresensiController.getById)
router.post('/masuk', PresensiController.presensiMasuk)
router.get('/check', PresensiController.getByDate)

module.exports = router