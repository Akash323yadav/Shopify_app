const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.get('/auth', authController.beginAuth);
router.get('/auth/callback', authController.authCallback);
router.get('/check-auth', authController.checkAuth);

module.exports = router;
