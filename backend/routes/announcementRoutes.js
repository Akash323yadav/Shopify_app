const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');

router.get('/api/get-announcement', announcementController.getAnnouncement);
router.get('/api/get-history', announcementController.getHistory);
router.post('/api/save-announcement', announcementController.saveAnnouncement);

module.exports = router;
