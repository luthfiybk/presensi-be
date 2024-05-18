const express = require('express')
const router = express.Router()
const IzinController = require('../controllers/izin.controller')
const upload = require('../helpers/uploadThing')

router.get('/', IzinController.getAll)
router.post('/apply', upload.single('file'), IzinController.applyIzin)
router.get('/:id', IzinController.getById)
router.put('/:id/approve', IzinController.approveIzin)
router.put('/:id/reject', IzinController.rejectIzin)

module.exports = router