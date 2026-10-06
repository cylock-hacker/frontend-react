import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Drawer, Box, List, ListItemButton, ListItemIcon, ListItemText, IconButton, Typography, Badge, Tooltip, Avatar, Alert, useMediaQuery, Stack } from '@mui/material';
import DashboardIcon from '@mui/icons-material/SpaceDashboardRounded';
import WalletIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import ReceiptIcon from '@mui/icons-material/ReceiptLongRounded';
import SendIcon from '@mui/icons-material/SendRounded';
import CardIcon from '@mui/icons-material/CreditCardRounded';
import PersonIcon from '@mui/icons-material/PersonRounded';
import BellIcon from '@mui/icons-material/NotificationsRounded';
import MenuIcon from '@mui/icons-material/MenuRounded';
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import BankIcon from '@mui/icons-material/AccountBalanceRounded';
import { useStore } from '../store';

const W = 250;
const NAV = [['/', 'Dashboard', <DashboardIcon />], ['/accounts', 'KONTE', <WalletIcon />], ['/transactions', 'IBIKORWA', <ReceiptIcon />], ['/transfers', 'KOHEREZA', <SendIcon />], ['/cards', 'AMAKARITA', <CardIcon />], ['/notifications', 'AMAMENYESHA', <BellIcon />], ['/profile', 'UMWIRONDORO', <PersonIcon />]];

export default function Layout() {
  const { unread, customer, dispatch } = useStore();
  const [open, setOpen] = useState(false);
  const desktop = useMediaQuery('(min-width:900px)');
  const nav = useNavigate();
  const { pathname } = useLocation();
  const active = (p) => (p === '/' ? pathname === '/' : pathname.startsWith(p));

  const menu = (
    <Box sx={{ p: 2, height: '100%' }}>
      <Stack direction="row" alignItems="center" gap={1.2} px={1} py={1.5} mb={2}>
        <Box sx={{ p: 1, borderRadius: 3, background: 'linear-gradient(135deg,#2dd4bf,#a78bfa)', display: 'grid', color: '#06121f' }}><BankIcon /></Box>
        <Typography variant="h6">Umutima Bank</Typography>
      </Stack>
      <List>
        {NAV.map(([to, label, icon]) => (
          <ListItemButton key={to} component={NavLink} to={to} onClick={() => setOpen(false)} selected={active(to)}
            sx={{ borderRadius: 3, mb: 0.5, '&.Mui-selected': { background: 'rgba(45,212,191,.16)', color: 'primary.main', boxShadow: 'inset 0 0 0 1px rgba(45,212,191,.35)' } }}>
            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{icon}</ListItemIcon>
            <ListItemText primary={label} primaryTypographyProps={{ fontWeight: 600 }} />
            {label === 'Notifications' && unread > 0 && <Badge color="error" badgeContent={unread} sx={{ mr: 1 }} />}
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Aurora backdrop — the glass panels blur this */}
      <Box sx={{ position: 'fixed', inset: 0, zIndex: -1, background: 'radial-gradient(1200px 700px at 10% -10%, #0f766e55, transparent), radial-gradient(900px 600px at 100% 10%, #6d28d955, transparent), radial-gradient(800px 600px at 50% 110%, #1d4ed855, transparent), #070b16' }}>
        <Box sx={{ position: 'absolute', top: '18%', left: '55%', width: 280, height: 280, borderRadius: '50%', background: '#f59e0b', opacity: 0.16, filter: 'blur(90px)' }} />
      </Box>
      <Drawer variant={desktop ? 'permanent' : 'temporary'} open={desktop || open} onClose={() => setOpen(false)} sx={{ '& .MuiDrawer-paper': { width: W, boxSizing: 'border-box' } }}>{menu}</Drawer>
      <Box sx={{ ml: desktop ? `${W}px` : 0 }}>
        <AppBar position="sticky" elevation={0}>
          <Toolbar>
            {!desktop && <IconButton onClick={() => setOpen(true)} edge="start" sx={{ mr: 1 }}><MenuIcon /></IconButton>}
            <Typography variant="subtitle1" fontWeight={700} sx={{ flex: 1 }}>Urakaza Neza, {customer.name.split(' ')[0]}</Typography>
            <Tooltip title="Notifications"><IconButton onClick={() => nav('/notifications')}><Badge color="error" badgeContent={unread}><BellIcon /></Badge></IconButton></Tooltip>
            <Tooltip title="Profile"><IconButton onClick={() => nav('/profile')}><Avatar sx={{ width: 34, height: 34, bgcolor: 'secondary.main', fontSize: 14 }}>{customer.name[0]}</Avatar></IconButton></Tooltip>
            <Tooltip title="Exit simulation"><IconButton onClick={() => { dispatch({ type: 'logout' }); nav('/login'); }}><LogoutIcon /></IconButton></Tooltip>
          </Toolbar>
        </AppBar>
        <Alert severity="warning" variant="outlined" sx={{ m: { xs: 1.5, md: 3 }, mb: 0, borderRadius: 3, background: 'rgba(251,191,36,.08)', backdropFilter: 'blur(10px)' }}>
          <b>FRONTEND SIMULATION</b> — iyi Application NAGO IKORESHA (real API)  CG DATABASE STORAGE(ONLY LOCAL STORAGE).
        </Alert>
        <Box component="main" sx={{ p: { xs: 1.5, md: 3 } }}><Outlet /></Box>
      </Box>
    </Box>
  );
}
