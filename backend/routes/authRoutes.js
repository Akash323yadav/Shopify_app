const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Root entry (Shopify opens here)
router.get('/', (req, res) => {
    if (req.query.shop) {
        const query = new URLSearchParams(req.query).toString();
        return res.redirect(`/api/auth?${query}`);
    }
    res.status(200).send('Shopify API Service is running.');
});

// Direct OAuth routes (NO EXTRA REDIRECT)
router.get('/api/auth', authController.beginAuth);
router.get('/api/auth/callback', authController.authCallback);

// Optional check
router.get('/api/check-auth', authController.checkAuth);

module.exports = router;
