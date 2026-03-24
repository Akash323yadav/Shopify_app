import React from 'react';
import { Card, BlockStack, Box, Text } from '@shopify/polaris';
import PreviewBanner from './PreviewBanner';

const BannerPreviewSection = ({ text }) => (
    <Card padding="600">
        <BlockStack gap="400">
            <Box>
                <Text variant="headingMd" as="h2">Real-time Announcement Preview</Text>
            </Box>

            <Text as="p" tone="subtle">
                This is exactly how your banner will appear on the storefront. Review it here before syncing.
            </Text>

            <Box paddingBlockStart="400">
                <PreviewBanner text={text} />
            </Box>
        </BlockStack>
    </Card>
);

export default BannerPreviewSection;
