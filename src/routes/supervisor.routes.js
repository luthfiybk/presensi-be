const express = require('express')
const router = express.Router()
const SupervisorController = require('../controllers/supervisor.controller')

router.get('/', SupervisorController.dashboard)
router.get('/karyawan', SupervisorController.getKaryawan)
router.get('/izin', SupervisorController.getIzin)
router.get('/presensi', SupervisorController.getPresensi)

module.exports = router