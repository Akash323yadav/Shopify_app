import React from 'react';
import { Card, BlockStack, Box, Text } from '@shopify/polaris';

const AuditHistory = ({ history }) => (
    <Card padding="600">
        <BlockStack gap="300">
            <Box>
                <Text variant="headingMd" as="h2">Recent Activity History</Text>
            </Box>

            {history.length === 0 ? (
                <Box padding="400" background="bg-surface-secondary" borderRadius="200">
                    <Text tone="subtle">No history found yet. Activity will appear here after your first save.</Text>
                </Box>
            ) : (
                <div className="audit-table-wrapper">
                    <table className="audit-table">
                        <thead>
                            <tr>
                                <th style={{ width: '70%', padding: '10px 15px' }}>Announcement Text</th>
                                <th style={{ width: '30%', padding: '10px 15px' }}>Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((item) => (
                                <tr key={item._id}>
                                    <td style={{ padding: '12px 15px' }}>{item.text}</td>
                                    <td style={{ padding: '12px 15px' }}>{new Date(item.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </BlockStack>
    </Card>
);

export default AuditHistory;
