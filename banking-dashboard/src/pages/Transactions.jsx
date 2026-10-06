import React, { useMemo, useState } from 'react';
import { Card, Grid, TextField, MenuItem, Button, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useStore } from '../store';
import { CATEGORIES, TYPES, STATUSES } from '../utils';
import { PageHeader } from '../components/ui';
import TxTable from '../components/TxTable';

const blank = { q: '', account: '', category: '', type: '', status: '', from: '', to: '' };

export default function Transactions() {
  const { transactions, accounts } = useStore();
  const [f, setF] = useState(blank);
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const rows = useMemo(() => transactions.filter((t) => {
    const day = t.date.slice(0, 10);
    return (!f.q || `${t.description} ${t.id}`.toLowerCase().includes(f.q.toLowerCase())) && (!f.account || t.accountId === f.account) && (!f.category || t.category === f.category)
      && (!f.type || t.type === f.type) && (!f.status || t.status === f.status) && (!f.from || day >= f.from) && (!f.to || day <= f.to);
  }), [transactions, f]);
  const sel = (k, label, opts) => (
    <Grid item xs={6} md={2}><TextField select fullWidth size="small" label={label} value={f[k]} onChange={set(k)}>
      <MenuItem value="">All</MenuItem>{opts.map((o) => <MenuItem key={o.v} value={o.v}>{o.l}</MenuItem>)}</TextField></Grid>);
  const list = (a) => a.map((x) => ({ v: x, l: x }));
  return (
    <>
      <PageHeader title="IBIKORWA" subtitle={`${rows.length} of ${transactions.length} Ibikorwa`} />
      <Card sx={{ p: 2.5 }}>
        <Grid container spacing={1.5} mb={2}>
          <Grid item xs={12} md={4}><TextField fullWidth size="small" placeholder="shakisha ukoresheje description cg ID" value={f.q} onChange={set('q')} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} /></Grid>
          {sel('account', 'Account', accounts.map((a) => ({ v: a.id, l: a.type })))}{sel('category', 'Category', list(CATEGORIES))}{sel('type', 'Type', list(TYPES))}{sel('status', 'Status', list(STATUSES))}
          <Grid item xs={6} md={2}><TextField fullWidth size="small" type="date" label="From" InputLabelProps={{ shrink: true }} value={f.from} onChange={set('from')} /></Grid>
          <Grid item xs={6} md={2}><TextField fullWidth size="small" type="date" label="To" InputLabelProps={{ shrink: true }} value={f.to} onChange={set('to')} /></Grid>
          <Grid item xs={12} md={2}><Button fullWidth color="inherit" onClick={() => setF(blank)}>Clear filters</Button></Grid>
        </Grid>
        <TxTable rows={rows} />
      </Card>
    </>
  );
}
