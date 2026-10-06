import React from 'react';
import { Grid, Card, Typography, Box, Stack, Button, LinearProgress, Divider } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { money, fmtDate, maskAcc } from '../utils';
import { PageHeader, StatusChip, Empty } from '../components/ui';
import TxTable from '../components/TxTable';

const Row = ({ k, v }) => (<Stack direction="row" justifyContent="space-between" py={0.7}><Typography color="text.secondary">{k}</Typography><Typography fontWeight={600}>{v}</Typography></Stack>);

export default function Accounts() {
  const { accounts, summary } = useStore();
  return (
    <>
      <PageHeader title="KONTE" subtitle={`${accounts.length} accounts · total ${money(summary.totalBalance)}`} />
      <Grid container spacing={2.5}>
        {accounts.map((a) => (
          <Grid item xs={12} md={6} key={a.id}>
            <Card sx={{ p: 3 }}>
              <Stack direction="row" justifyContent="space-between"><Typography variant="h6">{a.type}</Typography><StatusChip status={a.status} /></Stack>
              <Typography color="text.secondary">{maskAcc(a.number)} · {a.currency}</Typography>
              <Typography variant="h4" my={1.5}>{money(a.balance, a.currency)}</Typography>
              <Row k="Available balance" v={money(summary.availableOf(a), a.currency)} />
              <Row k="Opened" v={fmtDate(a.opened)} />
              <Row k="Last transaction" v={fmtDate(a.lastTransaction)} />
              <Button component={Link} to={`/accounts/${a.id}`} variant="outlined" sx={{ mt: 1.5 }}>View account</Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export function AccountDetails() {
  const { accountId } = useParams();
  const { accounts, transactions, summary } = useStore();
  const nav = useNavigate();
  const a = accounts.find((x) => x.id === accountId);
  if (!a) return <Card><Empty icon="🔍" title="Account not found" text="This account does not exist." /><Box textAlign="center" pb={3}><Button onClick={() => nav('/accounts')}>Back to accounts</Button></Box></Card>;
  const rows = transactions.filter((t) => t.accountId === a.id);
  return (
    <>
      <PageHeader title={a.type} subtitle={`Account ${a.number}`} action={<Button component={Link} to="/accounts" color="inherit">Back to accounts</Button>} />
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={4}><Card sx={{ p: 3 }}>
          <Typography color="text.secondary">Current balance</Typography><Typography variant="h4">{money(a.balance, a.currency)}</Typography>
          <LinearProgress variant="determinate" value={Math.max(0, (summary.availableOf(a) / a.balance) * 100)} sx={{ my: 2, height: 8, borderRadius: 4 }} />
          <Row k="Available" v={money(summary.availableOf(a), a.currency)} /><Row k="Holds" v={money(a.hold, a.currency)} /><Divider sx={{ my: 1 }} />
          <Row k="Currency" v={a.currency} /><Row k="Status" v={a.status} /><Row k="Opened" v={fmtDate(a.opened)} /><Row k="Last transaction" v={fmtDate(a.lastTransaction)} />
        </Card></Grid>
        <Grid item xs={12} md={8}><Card sx={{ p: 2.5 }}><Typography variant="h6" mb={1}>Transaction history</Typography><TxTable rows={rows} /></Card></Grid>
      </Grid>
    </>
  );
}
