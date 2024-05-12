const { Router } = require('express');
const router = Router();
const AuthController = require('../controllers/auth.controller');
const auth = require('../middleware/auth');

router.post('/login', AuthController.login)
router.post('/logout', AuthController.logout)
router.get('/session', auth)


module.exports = router