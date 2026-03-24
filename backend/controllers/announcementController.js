const shopify = require('../config/shopify');
const Announcement = require('../models/Announcement');
const Shop = require('../models/Shop');

/**
 * Sync logic using Rest/GraphQL
 */
async function syncToShopify(shop, accessToken, text) {
    const client = new shopify.clients.Rest({ shop, accessToken });

    try {
        const response = await client.post({
            path: 'metafields',
            data: {
                metafield: {
                    namespace: 'my_app',
                    key: 'announcement',
                    value: text,
                    type: 'single_line_text_field',
                },
            },
        });
        return response.body;
    } catch (error) {
        console.error('❌ Shopify Sync Error:', error.response?.body?.errors || error.message);
        throw error;
    }
}

exports.getAnnouncement = async (req, res) => {
    try {
        const { shop } = req.query;
        if (!shop) return res.status(400).json({ error: 'Shop is required' });

        const latest = await Announcement.findOne({ shop }).sort({ timestamp: -1 });
        res.status(200).json({ status: 'success', data: latest });
    } catch (error) {
        res.status(500).json({ status: 'error', details: error.message });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const { shop } = req.query;
        const history = await Announcement.find({ shop }).sort({ timestamp: -1 }).limit(5);
        res.status(200).json({ status: 'success', data: history });
    } catch (error) {
        res.status(500).json({ status: 'error', details: error.message });
    }
};

exports.saveAnnouncement = async (req, res) => {
    try {
        const { text, shop } = req.body;

        if (!text || !shop) {
            return res.status(400).json({ error: 'Payload validation failed: text and shop are required.' });
        }

        // 1. Audit Trail: Save to MongoDB
        const announcement = new Announcement({ text, shop });
        await announcement.save();
        console.log(`📝 Audit history updated for ${shop}`);

        // 2. Token Management: Retrieval from MongoDB
        const shopData = await Shop.findOne({ shop });

        if (!shopData) {
            return res.status(401).json({
                error: 'Authentication Required.',
                link: `/auth?shop=${shop}`
            });
        }

        const token = shopData.accessToken;

        // 3. Shopify Sync
        await syncToShopify(shop, token, text);

        res.status(200).json({
            status: 'success',
            message: 'Announcement published successfully!',
            data: announcement
        });

    } catch (error) {
        console.error('💥 Critical sync error:', error.message);
        res.status(500).json({
            status: 'error',
            message: 'Failed to synchronize with Shopify.',
            details: error.response?.body?.errors || error.message
        });
    }
};
