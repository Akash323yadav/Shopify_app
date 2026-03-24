const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    shop: { type: String, unique: true, required: true },
    accessToken: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shop', shopSchema);
