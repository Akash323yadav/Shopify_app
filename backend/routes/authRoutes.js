const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Shopify always redirects to APP_URL/auth?shop=... — forward to actual routes
router.get('/auth', (req, res) => {
    const query = new URLSearchParams(req.query).toString();
    res.redirect(`/api/auth?${query}`);
});
router.get('/auth/callback', (req, res) => {
    const query = new URLSearchParams(req.query).toString();
    res.redirect(`/api/auth/callback?${query}`);
});

// Actual OAuth routes
router.get('/api/auth', authController.beginAuth);
router.get('/api/auth/callback', authController.authCallback);
router.get('/api/check-auth', authController.checkAuth);

module.exports = router;
