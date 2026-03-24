import React, { useMemo } from 'react';
import {
  AppProvider,
  Page,
  Layout,
  BlockStack,
  Box,
  InlineStack,
  Text,
  Banner,
  SkeletonBodyText,
  Divider,
} from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

// MVC Components & Hooks
import BannerPreviewSection from './components/BannerPreviewSection';
import AuditHistory from './components/AuditHistory';
import SettingsSidebar from './components/SettingsSidebar';
import { useAnnouncement } from './hooks/useAnnouncement';

// Styles
import '@shopify/polaris/build/esm/styles.css';
import './App.css';

function App() {
  // Get Shop from URL
  const shopName = useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('shop') || 'chacyg-0c.myshopify.com';
  }, []);

  // Use Custom Hook (Controller logic)
  const {
    announcementText,
    setAnnouncementText,
    loading,
    status,
    setStatus,
    isAuthorized,
    history,
    saveAnnouncement
  } = useAnnouncement(shopName);

  return (
    <AppProvider i18n={enTranslations}>
      <Page
        title="Admin Announcement Center"
        subtitle="Manage live announcements shown across your storefront."
        primaryAction={{
          content: 'Save',
          onAction: saveAnnouncement,
          loading: loading,
        }}
      >
        <Layout>
          {/* Dashboard Area (History + Status) */}
          <Layout.Section>
            <BlockStack gap="500">
              {status && (
                <Banner
                  title={status.message}
                  onDismiss={() => setStatus(null)}
                  tone={isAuthorized ? status.type : "info"}
                  action={status.action}
                />
              )}

              {/* View 1: The Preview Section (Live) */}
              <BannerPreviewSection
                text={announcementText}
                isAuthorized={isAuthorized}
              />

              {/* View 2: The Audit History (Recent Activity) */}
              <AuditHistory history={history} />
            </BlockStack>
          </Layout.Section>

          {/* Settings Sidebar (Controls) */}
          <Layout.Section variant="oneThird">
            <SettingsSidebar
              value={announcementText}
              onChange={setAnnouncementText}
              isAuthorized={isAuthorized}
            />
          </Layout.Section>
        </Layout>

        {/* Footer Area */}
        <Box paddingBlockStart="1000" paddingBlockEnd="2000">
          <Divider />
          <Box paddingBlockStart="600">
            <InlineStack align="center">
              <Text tone="subtle">Built with ❤️ for the Shopify Developer Challenge (MVC Configurator Mode)</Text>
            </InlineStack>
          </Box>
        </Box>
      </Page>
    </AppProvider>
  );
}

export default App;
