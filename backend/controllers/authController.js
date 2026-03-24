const shopify = require('../config/shopify');
const Shop = require('../models/Shop');

exports.beginAuth = async (req, res) => {
    const shop = req.query.shop;
    if (!shop) return res.status(400).send('Missing shop parameter');

    try {
        await shopify.auth.begin({
            shop,
            callbackPath: '/api/auth/callback',
            isOnline: false,
            rawRequest: req,
            rawResponse: res,
        });
    } catch (error) {
        console.error('❌ Auth Begin Error:', error.message);
        res.status(500).send('OAuth initialization failed');
    }
};

exports.authCallback = async (req, res) => {
    console.log('🔄 Callback hit from Shopify...');
    try {
        const callback = await shopify.auth.callback({
            rawRequest: req,
            rawResponse: res,
        });

        const { shop, accessToken } = callback.session;

        await Shop.findOneAndUpdate(
            { shop },
            { accessToken },
            { upsert: true, new: true }
        );

        console.log(`✅ Token secured and saved for: ${shop}`);
        res.redirect(`https://${shop}/admin/apps/${process.env.SHOPIFY_API_KEY}`);
    } catch (error) {
        console.error('❌ OAuth Error:', error.message);
        res.status(500).send('Authentication failed');
    }
};

exports.checkAuth = async (req, res) => {
    try {
        const { shop } = req.query;
        const shopData = await Shop.findOne({ shop });
        res.status(200).json({ status: 'success', isAuthorized: !!shopData });
    } catch (error) {
        res.status(500).json({ status: 'error', isAuthorized: false });
    }
};
