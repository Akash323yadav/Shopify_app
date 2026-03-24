const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/api/auth', authController.beginAuth);
router.get('/api/auth/callback', authController.authCallback);
router.get('/api/check-auth', authController.checkAuth);

module.exports = router;
