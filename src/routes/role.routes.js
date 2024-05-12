const express = require('express')
const router = express.Router()
const RoleController = require('../controllers/role.controller')

router.get('/', RoleController.getAll)

module.exports = router