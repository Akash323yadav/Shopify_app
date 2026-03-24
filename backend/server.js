const express = require('express');
const cors = require('cors');
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

// --- Middleware ---
app.use(express.json());
app.use(cors({
    origin: '*', // For production, allow all for Shopify admin links
    methods: ['GET', 'POST']
}));

// --- Database Connection ---
connectDB();

// --- Routes ---
app.use('/api', authRoutes);
app.use('/api', announcementRoutes);

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
