import React from 'react';
import { Box, Card, Chip, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Stack } from '@mui/material';

export const PageHeader = ({ title, subtitle, action }) => (
  <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1} mb={3}>
    <Box><Typography variant="h4">{title}</Typography>{subtitle && <Typography color="text.secondary">{subtitle}</Typography>}</Box>
    {action}
  </Stack>
);

export const StatCard = ({ label, value, icon, color = 'primary.main', hint }) => (
  <Card sx={{ p: 2.5, height: '100%' }}>
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
      <Box>
        <Typography variant="body2" color="text.secondary">{label}</Typography>
        <Typography variant="h5" mt={0.5}>{value}</Typography>
        {hint && <Typography variant="caption" color="text.secondary">{hint}</Typography>}
      </Box>
      <Box sx={{ p: 1.2, borderRadius: 3, color, bgcolor: 'rgba(255,255,255,.07)', display: 'grid', placeItems: 'center' }}>{icon}</Box>
    </Stack>
  </Card>
);

const COLORS = { Completed: 'success', Active: 'success', Pending: 'warning', Suspended: 'warning', Failed: 'error', Blocked: 'error', Expired: 'default', Cancelled: 'default' };
export const StatusChip = ({ status }) => <Chip size="small" variant="outlined" label={status} color={COLORS[status] || 'default'} />;

export const Empty = ({ icon, title, text }) => (
  <Box sx={{ py: 6, textAlign: 'center', color: 'text.secondary' }}>
    <Box sx={{ fontSize: 44, opacity: 0.6 }}>{icon}</Box>
    <Typography variant="h6" color="text.primary">{title}</Typography>
    <Typography variant="body2">{text}</Typography>
  </Box>
);

export const ConfirmDialog = ({ open, title, children, onCancel, onConfirm, confirmText = 'Confirm' }) => (
  <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
    <DialogTitle sx={{ fontWeight: 800 }}>{title}</DialogTitle>
    <DialogContent>{children}</DialogContent>
    <DialogActions sx={{ p: 2 }}>
      <Button onClick={onCancel} color="inherit">Cancel</Button>
      <Button onClick={onConfirm} variant="contained">{confirmText}</Button>
    </DialogActions>
  </Dialog>
);
