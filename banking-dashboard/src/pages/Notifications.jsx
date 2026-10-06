import React, { useState } from 'react';
import { Card, List, ListItem, ListItemIcon, ListItemText, IconButton, Tooltip, Badge, ToggleButton, ToggleButtonGroup, Button, Stack, Typography } from '@mui/material';
import SwapIcon from '@mui/icons-material/SwapHorizRounded';
import ReceiptIcon from '@mui/icons-material/ReceiptLongRounded';
import WarnIcon from '@mui/icons-material/WarningAmberRounded';
import CardIcon from '@mui/icons-material/CreditCardRounded';
import PersonIcon from '@mui/icons-material/PersonRounded';
import DeleteIcon from '@mui/icons-material/DeleteOutlineRounded';
import MarkReadIcon from '@mui/icons-material/MarkEmailReadRounded';
import MarkUnreadIcon from '@mui/icons-material/MarkEmailUnreadRounded';
import { useStore } from '../store';
import { fmtDate } from '../utils';
import { PageHeader, Empty } from '../components/ui';

const ICONS = { transfer: <SwapIcon />, transaction: <ReceiptIcon />, warning: <WarnIcon color="warning" />, card: <CardIcon />, profile: <PersonIcon /> };

export default function Notifications() {
  const { notifications, unread, dispatch } = useStore();
  const [filter, setFilter] = useState('all');
  const shown = notifications.filter((n) => filter === 'all' || (filter === 'unread' ? !n.read : n.read));
  const act = (fn) => dispatch({ type: 'notif', fn });
  return (
    <>
      <PageHeader title="AMAMENYESHA" subtitle={`${unread} unread`} action={<Button startIcon={<MarkReadIcon />} disabled={!unread} onClick={() => act((l) => l.map((n) => ({ ...n, read: true })))}>Mark all as read</Button>} />
      <Card sx={{ p: 2.5 }}>
        <ToggleButtonGroup exclusive size="small" value={filter} onChange={(_, v) => v && setFilter(v)} sx={{ mb: 1 }}>
          <ToggleButton value="all">All</ToggleButton><ToggleButton value="unread">Unread</ToggleButton><ToggleButton value="read">Read</ToggleButton>
        </ToggleButtonGroup>
        {shown.length === 0 ? <Empty icon="🔔" title="Nothing here" text="You're all caught up." /> : (
          <List>{shown.map((n) => (
            <ListItem key={n.id} divider sx={{ opacity: n.read ? 0.65 : 1 }}
              secondaryAction={<Stack direction="row">
                <Tooltip title={n.read ? 'Mark as unread' : 'Mark as read'}><IconButton onClick={() => act((l) => l.map((x) => (x.id === n.id ? { ...x, read: !x.read } : x)))}>{n.read ? <MarkUnreadIcon /> : <MarkReadIcon />}</IconButton></Tooltip>
                <Tooltip title="Delete"><IconButton onClick={() => act((l) => l.filter((x) => x.id !== n.id))}><DeleteIcon /></IconButton></Tooltip></Stack>}>
              <ListItemIcon><Badge color="primary" variant="dot" invisible={n.read}>{ICONS[n.type]}</Badge></ListItemIcon>
              <ListItemText primary={n.title} secondary={<>{n.message}<Typography component="span" variant="caption" display="block">{fmtDate(n.date, true)}</Typography></>} primaryTypographyProps={{ fontWeight: n.read ? 500 : 800 }} sx={{ pr: 10 }} />
            </ListItem>))}</List>)}
      </Card>
    </>
  );
}
