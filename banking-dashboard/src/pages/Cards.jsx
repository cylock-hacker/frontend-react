import React, { useState } from 'react';
import { Grid, Card, Typography, Box, Stack, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ContactlessIcon from '@mui/icons-material/ContactlessRounded';
import { useStore } from '../store';
import { money } from '../utils';
import { PageHeader, StatusChip, ConfirmDialog } from '../components/ui';

const GRAD = { 'Visa Debit': 'linear-gradient(135deg,#0d9488,#2563eb)', 'Mastercard Credit': 'linear-gradient(135deg,#7c3aed,#db2777)', 'Student Card': 'linear-gradient(135deg,#d97706,#ea580c)', 'Visa Business': 'linear-gradient(135deg,#334155,#0f172a)' };

const Plastic = ({ c, big }) => (
  <Box sx={{ p: big ? 4 : 3, borderRadius: 5, color: '#fff', background: GRAD[c.type], minHeight: big ? 220 : 190, position: 'relative', overflow: 'hidden', opacity: c.status === 'Active' ? 1 : 0.6, filter: c.status === 'Blocked' ? 'grayscale(.8)' : 'none', boxShadow: '0 14px 30px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.3)' }}>
    <Box sx={{ position: 'absolute', right: -40, top: -40, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,.14)' }} />
    <Stack direction="row" justifyContent="space-between"><Typography fontWeight={700}>{c.type}</Typography><ContactlessIcon /></Stack>
    <Typography variant="h5" sx={{ mt: 4, letterSpacing: 3, fontWeight: 700 }}>**** **** **** {c.last4}</Typography>
    <Stack direction="row" justifyContent="space-between" mt={3}><Box><Typography variant="caption" sx={{ opacity: 0.8 }}>Card holder</Typography><Typography fontWeight={700}>{c.holder}</Typography></Box><Box><Typography variant="caption" sx={{ opacity: 0.8 }}>Expires</Typography><Typography fontWeight={700}>{c.expiry}</Typography></Box></Stack>
  </Box>
);

export default function Cards() {
  const { cards, accounts, dispatch, notify } = useStore();
  const nav = useNavigate();
  const [view, setView] = useState(null);
  const [freeze, setFreeze] = useState(null);
  const toggle = () => {
    const c = freeze; const to = c.status === 'Active' ? 'frozen' : 'unfrozen';
    dispatch({ type: 'card', id: c.id, note: { id: `NTF-${Date.now()}`, title: 'Card notification', message: `Your ${c.type} ending ${c.last4} was ${to}.`, type: 'card', date: new Date().toISOString(), read: false } });
    notify(`Card ending ${c.last4} ${to}.`); setFreeze(null);
  };
  const acct = (c) => accounts.find((a) => a.id === c.accountId);
  return (
    <>
      <PageHeader title="AMAKARITA" subtitle="AYA MAKARITA - SI AYANYAYO " />
      <Grid container spacing={2.5}>
        {cards.map((c) => (
          <Grid item xs={12} md={6} key={c.id}><Card sx={{ p: 2.5 }}>
            <Plastic c={c} />
            <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2} flexWrap="wrap" gap={1}>
              <Box><StatusChip status={c.status} /><Typography variant="body2" color="text.secondary" mt={0.5}>Linked: {acct(c)?.type}</Typography></Box>
              <Stack direction="row" gap={1}>
                <Button size="small" color="inherit" onClick={() => setView(c)}>View card</Button>
                <Button size="small" color="inherit" onClick={() => nav(`/accounts/${c.accountId}`)}>Linked account</Button>
                <Button size="small" variant="outlined" disabled={!['Active', 'Blocked'].includes(c.status)} onClick={() => setFreeze(c)}>{c.status === 'Active' ? 'Freeze' : 'Unfreeze'}</Button>
              </Stack></Stack>
          </Card></Grid>))}
      </Grid>
      <Dialog open={!!view} onClose={() => setView(null)} maxWidth="sm" fullWidth>
        {view && (<><DialogTitle sx={{ fontWeight: 800 }}>{view.type}</DialogTitle><DialogContent><Plastic c={view} big />
          <Stack gap={1} mt={2}><Typography>Status: <b>{view.status}</b></Typography><Typography>Linked account: <b>{acct(view)?.type}</b> · {money(acct(view)?.balance || 0)}</Typography></Stack></DialogContent></>)}
      </Dialog>
      <ConfirmDialog open={!!freeze} title={freeze?.status === 'Active' ? 'Funga iyi Karite?' : 'Fungura iyi Karita?'} onCancel={() => setFreeze(null)} onConfirm={toggle}>
        <Typography color="text.secondary">Card ending {freeze?.last4}. This only changes the simulation on this device.</Typography>
      </ConfirmDialog>
    </>
  );
}
