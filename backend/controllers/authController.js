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

        if (!shop || !accessToken) {
            console.error('❌ OAuth callback missing shop or token. Cookie may have been lost.');
            return res.status(400).send(`
                <h2>OAuth Failed</h2>
                <p>Could not retrieve shop session. The OAuth cookie was lost.</p>
                <p>Please close this window and re-install the app from your Shopify Admin.</p>
            `);
        }

        await Shop.findOneAndUpdate(
            { shop },
            { accessToken },
            { upsert: true, new: true }
        );

        console.log(`✅ Token secured and saved for: ${shop}`);
        res.redirect(`https://${shop}/admin/apps/${process.env.SHOPIFY_API_KEY}`);
    } catch (error) {
        console.error('❌ OAuth Error:', error.message);
        // Don't loop — show an error instead of redirecting back to /api/auth
        res.status(500).send(`
            <h2>OAuth Error</h2>
            <p>${error.message}</p>
            <p>Please re-install the app from your Shopify Admin.</p>
        `);
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
