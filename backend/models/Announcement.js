const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    text: { type: String, required: true },
    shop: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Announcement', announcementSchema);
