import React, { useState } from 'react';
import { Card, Grid, TextField, MenuItem, Button, Tabs, Tab, Typography, Box, Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Stack, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/SendRounded';
import { useStore } from '../store';
import { money, fmtDate } from '../utils';
import { PageHeader, StatusChip, ConfirmDialog, Empty } from '../components/ui';

const today = () => new Date().toISOString().slice(0, 10);
const blank = () => ({ accountId: '', recipient: '', recipientAccount: '', bank: '', amount: '', description: '', date: today() });

export default function Transfers() {
  const { accounts, transfers, transactions, summary, dispatch, notify } = useStore();
  const [tab, setTab] = useState(0);
  const [f, setF] = useState(blank());
  const [err, setErr] = useState({});
  const [confirm, setConfirm] = useState(false);
  const [busy, setBusy] = useState(false);
  const acc = accounts.find((a) => a.id === f.accountId);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  const validate = () => {
    const e = {};
    if (!f.accountId) e.accountId = 'Choose the account to send from.';
    if (f.recipient.trim().length < 3) e.recipient = 'Enter the recipient’s full name (min 3 characters).';
    if (!/^\d{8,16}$/.test(f.recipientAccount)) e.recipientAccount = 'Account number must be 8–16 digits.';
    if (!f.bank.trim()) e.bank = 'Enter the recipient’s bank or a reference.';
    const amt = Number(f.amount);
    if (!(amt > 0)) e.amount = 'Enter an amount greater than 0.';
    else if (acc && amt > summary.availableOf(acc)) e.amount = `Insufficient balance. Available: ${money(summary.availableOf(acc))}.`;
    if (f.description.trim().length < 3) e.description = 'Add a short description.';
    if (!f.date) e.date = 'Choose a transfer date.';
    setErr(e);
    return !Object.keys(e).length;
  };

  const submit = () => {
    setConfirm(false); setBusy(true);
    setTimeout(() => {
      const ref = `TRX-2026-${String(transfers.length + 1).padStart(4, '0')}`;
      const id = `TXN-${String(transactions.length + 1).padStart(4, '0')}`;
      dispatch({ type: 'transfer', f, ref, id, now: new Date().toISOString() });
      notify(`Transfer completed — reference ${ref}`);
      setF(blank()); setBusy(false); setTab(1);
    }, 900);
  };

  const field = (k, label, extra = {}) => (<Grid item xs={12} md={6}><TextField fullWidth label={label} value={f[k]} onChange={set(k)} error={!!err[k]} helperText={err[k]} {...extra} /></Grid>);

  return (
    <>
      <PageHeader title="KOHEREZA" subtitle="Send simulated money — no real funds move" />
      <Card sx={{ p: 2.5 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}><Tab label="New transfer" /><Tab label={`History (${transfers.length})`} /></Tabs>
        {tab === 0 ? (
          <Grid container spacing={2}>
            {field('accountId', 'From account', { select: true, children: accounts.map((a) => <MenuItem key={a.id} value={a.id}>{a.type} — {money(summary.availableOf(a))} available</MenuItem>) })}
            {field('recipient', 'Recipient name')}
            {field('recipientAccount', 'Recipient account number', { inputProps: { inputMode: 'numeric' } })}
            {field('bank', 'Bank / reference')}
            {field('amount', 'Amount (RWF)', { type: 'number' })}
            {field('date', 'Transfer date', { type: 'date', InputLabelProps: { shrink: true } })}
            <Grid item xs={12}><TextField fullWidth multiline minRows={2} label="Transfer description" value={f.description} onChange={set('description')} error={!!err.description} helperText={err.description} /></Grid>
            <Grid item xs={12}><Button size="large" variant="contained" startIcon={busy ? <CircularProgress size={18} color="inherit" /> : <SendIcon />} disabled={busy} onClick={() => validate() && setConfirm(true)}>Review transfer</Button></Grid>
          </Grid>
        ) : transfers.length === 0 ? <Empty icon="💸" title="No transfers yet" text="Create your first simulated transfer." /> : (
          <TableContainer><Table>
            <TableHead><TableRow>{['Reference', 'Date', 'From', 'Recipient', 'Amount', 'Description', 'Status'].map((h) => <TableCell key={h} align={h === 'Amount' ? 'right' : 'left'}>{h}</TableCell>)}</TableRow></TableHead>
            <TableBody>{transfers.map((t) => (
              <TableRow key={t.ref} hover>
                <TableCell sx={{ fontWeight: 700 }}>{t.ref}</TableCell><TableCell sx={{ whiteSpace: 'nowrap' }}>{fmtDate(t.date)}</TableCell>
                <TableCell>{accounts.find((a) => a.id === t.accountId)?.type}</TableCell><TableCell>{t.recipient}</TableCell>
                <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>{money(t.amount)}</TableCell><TableCell>{t.description}</TableCell><TableCell><StatusChip status={t.status} /></TableCell>
              </TableRow>))}</TableBody>
          </Table></TableContainer>
        )}
      </Card>
      <ConfirmDialog open={confirm} title="Confirm simulated transfer" onCancel={() => setConfirm(false)} onConfirm={submit} confirmText="Confirm transfer">
        <Stack gap={0.8}>
          <Typography variant="h5">{money(Number(f.amount || 0))}</Typography>
          <Typography color="text.secondary">From {acc?.type}</Typography>
          <Typography>To <b>{f.recipient}</b> · {f.recipientAccount}</Typography>
          <Typography color="text.secondary">{f.bank} · {f.date}</Typography>
          <Box sx={{ mt: 1, p: 1.5, borderRadius: 2, bgcolor: 'rgba(251,191,36,.1)' }}><Typography variant="caption">Simulation only — no real money will be sent.</Typography></Box>
        </Stack>
      </ConfirmDialog>
    </>
  );
}
