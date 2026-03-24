const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const announcementRoutes = require('./routes/announcementRoutes');
const autoProvision = require('./utils/provision');

// --- Initialization ---
dotenv.config();
const app = express();

// Render and other hosts use process.env.PORT
const PORT = process.env.PORT || 5000;

// Trust Cloudflare / Render proxy so Express sees HTTPS correctly
// Without this, OAuth cookies lose their Secure flag and browsers drop them
app.set('trust proxy', 1);

// --- Middleware ---
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.SHOPIFY_HOST
        ? `https://${process.env.SHOPIFY_HOST.replace(/https?:\/\//, '')}`
        : '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));

// --- Database Connection ---
connectDB();

// --- Routes ---
app.use('/', authRoutes);
app.use('/', announcementRoutes);

// --- Server Startup ---
app.listen(PORT, async () => {
    console.log(`
 
     Premium Webhook Server is LIVE (MVC READY)
    Listening on: http://localhost:${PORT}
    Env: ${process.env.NODE_ENV || 'development'}

    `);

    // Auto-provision for Developer Stores
    await autoProvision();
});
