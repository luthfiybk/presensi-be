const AuthRoutes = require('./auth.routes')
const UserRoutes = require('./user.routes')
const DivisiRoutes = require('./divisi.routes')
const RoleRoutes = require('./role.routes')
const StatusRoutes = require('./status.routes')
const GedungRoutes = require('./gedung.routes')
const IzinRoutes = require('./izin.routes')
const PresensiRoutes = require('./presensi.routes')
const AdminRoutes = require('./admin.routes')
const SupervisorRoutes = require('./supervisor.routes')

const auth = require('../middleware/auth')

const express = require('express')
const router = express.Router()

router.use('/auth', AuthRoutes)
router.use('/user', UserRoutes)
router.use('/divisi', DivisiRoutes)
router.use('/role', RoleRoutes)
router.use('/status', StatusRoutes)
router.use('/gedung', GedungRoutes)
router.use('/izin', IzinRoutes)
router.use('/presensi', PresensiRoutes)
router.use('/admin', AdminRoutes)
router.use('/supervisor', SupervisorRoutes)

module.exports = router