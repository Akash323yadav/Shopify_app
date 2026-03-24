import React from 'react';
import { Card, BlockStack, Text, Box, TextField, InlineStack, Badge } from '@shopify/polaris';

const SettingsSidebar = ({ value, onChange, isAuthorized }) => (
    <BlockStack gap="400">
        <Card padding="500">
            <BlockStack gap="400">
                <Box>
                    <InlineStack align="space-between">
                        <Text variant="headingSm" as="h3">Announcement Setup</Text>
                        <Badge tone={isAuthorized ? "success" : "attention"}>
                            {isAuthorized ? "Ready" : "Pending Setup"}
                        </Badge>
                    </InlineStack>
                </Box>

                <TextField
                    label="Announcement Text"
                    value={value}
                    onChange={onChange}
                    placeholder="Enter your announcement text here"
                    autoComplete="off"
                    multiline={4}
                    helpText="Max length: 100 characters."
                    maxLength={100}
                />
            </BlockStack>
        </Card>

        <Card padding="500" background="bg-surface-secondary">
            <BlockStack gap="200">
                <Text variant="headingSm" as="h3">Information Tip</Text>
                <Text as="p" tone="subtle">
                    Ensure your message is concise. For best results on mobile, try keeping it under 60 characters.
                </Text>
            </BlockStack>
        </Card>
    </BlockStack>
);

export default SettingsSidebar;
