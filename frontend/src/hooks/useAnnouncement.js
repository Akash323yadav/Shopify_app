import { useState, useCallback, useEffect } from 'react';
import api from '../services/api';
import axios from 'axios';

const BACKEND_HOST = import.meta.env.VITE_BACKEND_URL || '';
const AUTH_URL = `${BACKEND_HOST}/api/auth`;

export const useAnnouncement = (shopName) => {
    const [announcementText, setAnnouncementText] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [history, setHistory] = useState([]);

    const fetchData = useCallback(async () => {
        if (!shopName) return;
        try {
            // Check Auth
            const authRes = await axios.get(`/api/check-auth?shop=${shopName}`);
            setIsAuthorized(authRes.data?.isAuthorized);

            if (!authRes.data?.isAuthorized) {
                setStatus({
                    type: 'info',
                    message: "🚀 Welcome! Let's connect your store to enable live syncing.",
                    action: {
                        content: 'Connect to Shopify 🔑',
                        onAction: () => window.open(`${AUTH_URL}?shop=${shopName}`, '_blank')
                    }
                });
            }

            // Fetch Current
            const res = await api.get(`/get-announcement?shop=${shopName}`);
            if (res.data?.data) {
                setAnnouncementText(res.data.data.text);
            }

            // Fetch History
            const histRes = await api.get(`/get-history?shop=${shopName}`);
            if (histRes.data?.data) {
                setHistory(histRes.data.data);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    }, [shopName]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const saveAnnouncement = useCallback(async () => {
        if (!announcementText.trim()) {
            setStatus({ type: 'critical', message: 'Announcement text cannot be empty!' });
            return;
        }

        setLoading(true);
        setStatus(null);

        try {
            const res = await api.post('/save-announcement', {
                text: announcementText,
                shop: shopName
            });

            if (res.status === 200) {
                setStatus({ type: 'success', message: '✅ Saved successfully! Storefront updated.' });
                // Refresh History
                const histRes = await api.get(`/get-history?shop=${shopName}`);
                setHistory(histRes.data.data);
            }
        } catch (error) {
            if (error.response?.status === 401) {
                setStatus({
                    type: 'critical',
                    message: '❌ Authorization missing! Please reconnect to Shopify.',
                    action: {
                        content: 'Secure Token 🔑',
                        onAction: () => window.open(`${AUTH_URL}?shop=${shopName}`, '_blank')
                    }
                });
            } else {
                const errorMsg = error.response?.data?.details || error.message;
                setStatus({ type: 'critical', message: `❌ Sync failed: ${errorMsg}` });
            }
        } finally {
            setLoading(false);
        }
    }, [announcementText, shopName]);

    return {
        announcementText,
        setAnnouncementText,
        loading,
        status,
        setStatus,
        isAuthorized,
        history,
        saveAnnouncement
    };
};
