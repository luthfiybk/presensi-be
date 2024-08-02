const express = require('express')
const router = express.Router()
const SupervisorController = require('../controllers/supervisor.controller')
const auth = require('../middleware/auth')

router.get('/', auth.isAuth, SupervisorController.dashboard)
router.get('/karyawan', auth.isAuth, SupervisorController.getKaryawan)
router.get('/izin', auth.isAuth, SupervisorController.getIzin)
router.get('/presensi', auth.isAuth, SupervisorController.getPresensi)

module.exports = router