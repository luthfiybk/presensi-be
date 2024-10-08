const PresensiController = require('../controllers/presensi.controller')
const UserController = require('../controllers/user.controller')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

router.get('/', auth.isAuth, UserController.getAll)
router.get('/:userId', UserController.getByNIP)
router.post('/create', UserController.create)
router.put('/:nip', UserController.update)
router.delete('/:nip', UserController.delete)
router.get('/presensi/check', auth.isAuth, PresensiController.check)

module.exports = router