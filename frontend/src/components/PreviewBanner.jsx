import React from 'react';

const PreviewBanner = ({ text }) => (
    <div className="preview-container">
        <span className="preview-label">Live Storefront Preview</span>
        <div className="premium-announcement-banner-preview">
            <div className="announcement-glass-content-preview">
                <div className="announcement-content-preview">
                    <span className="announcement-tag-preview">NEW!</span>
                    <span className="announcement-text-preview">{text || 'Your message will appear here...'}</span>
                </div>
            </div>
        </div>
    </div>
);

export default PreviewBanner;
