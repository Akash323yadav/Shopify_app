const express = require('express');
const router = express.Router();
const announcementController = require('../controllers/announcementController');

router.get('/get-announcement', announcementController.getAnnouncement);
router.get('/get-history', announcementController.getHistory);
router.post('/save-announcement', announcementController.saveAnnouncement);

module.exports = router;
