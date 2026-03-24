const Shop = require('../models/Shop');

const autoProvision = async () => {
    try {
        const manualToken = process.env.SHOPIFY_ACCESS_TOKEN;

        if (manualToken && !manualToken.includes('paste_karein')) {
            await Shop.findOneAndUpdate(
                { shop: 'chacyg-0c.myshopify.com' },
                { accessToken: manualToken },
                { upsert: true, new: true }
            );
            console.log('✅ Auto-provisioning: Token synced from .env to MongoDB.');
        }
    } catch (err) {
        console.warn('⚠️ Auto-provisioning failed:', err.message);
    }
};

module.exports = autoProvision;
