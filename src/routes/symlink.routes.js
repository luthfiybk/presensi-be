const express = require('express')
const router = express.Router()
const SymlinkController = require('../controllers/symlink.controller')

router.get('/file/:filename', SymlinkController.getFile)

module.exports = router