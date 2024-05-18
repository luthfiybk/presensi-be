const UserController = require('../controllers/user.controller')
const express = require('express')
const router = express.Router()

router.get('/', UserController.getAll)
router.get('/:userId', UserController.getByNIP)

module.exports = router