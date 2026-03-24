# 🚀 Shopify Announcement App (MERN + Shopify API)

A professional, high-performance announcement management application for Shopify, built with the **MERN Stack** and **Shopify Polaris** for a seamless merchant experience.

This application was developed as part of a **Developer Challenge**, adhering to industry-standard **MVC (Model-View-Controller) Architecture**.

##  Architecture & Stack
- **Frontend:** React.js, Shopify Polaris (UI System)
- **Backend:** Node.js, Express.js (MVC Pattern)
- **Database:** MongoDB (Audit Trail & Token Persistence)
- **API:** Shopify Admin REST API (Metafields Sync)
- **Storefront:** Shopify Theme App Extension (App Embed Block)

##  Key Features
1. **Real-time Synchronization:** Instantly updates your storefront banner via Shopify Metafields (`my_app.announcement`).
2. **Audit History Tracking:** Every announcement save is logged in MongoDB with a timestamp, ensuring a reliable activity history for merchants.
3. **MVC Design Pattern:** Fully decoupled logic with dedicated Controllers, Models, and Routes for maximum maintainability.
4. **Minimalist Configurator UI:** A clean, icon-free sidebar configurator for rapid announcement updates.
5. **Zero ScriptTags:** Uses cutting-edge App Embed Blocks via Liquid for extreme storefront speed and reliability.

## 🛠️ Setup Instructions

### Pre-requisites
- Shopify Partner Account & Development Store
- MongoDB (Local or Atlas)
- Cloudflare Tunnel (or ngrok)

### 1. Backend Setup
```bash
cd backend
npm install
# Configure your .env (API_KEY, API_SECRET, SCOPES, MONGODB_URI)
npm start
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 3. Shopify App Setup
1. Set the **App URL** and **Redirect URL** in your Shopify Partner Dashboard to your active tunnel.
2. Enable the **Theme App Extension** in your Development Store's Theme Editor.

## Audit Trail (Database Schema)
The application maintains a history for every shop:
- `text`: The announcement message.
- `shop`: The shop domain.
- `timestamp`: Time of save.

---
Built with  by **Akash Yadav** for the Shopify Developer Challenge.
