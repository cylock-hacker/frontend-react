import React from 'react';
import { Grid, Card, Typography, Box, Stack, Button, Chip, List, ListItem, ListItemText, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, BarChart, Bar, Legend, LineChart, Line } from 'recharts';
import SavingsIcon from '@mui/icons-material/SavingsRounded';
import WalletIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import PaymentsIcon from '@mui/icons-material/PaymentsRounded';
import SwapIcon from '@mui/icons-material/SwapHorizRounded';
import ReceiptIcon from '@mui/icons-material/ReceiptLongRounded';
import SendIcon from '@mui/icons-material/SendRounded';
import CardIcon from '@mui/icons-material/CreditCardRounded';
import TrendIcon from '@mui/icons-material/TrendingUpRounded';
import { useStore } from '../store';
import { money, fmtDate, maskAcc } from '../utils';
import { StatCard, PageHeader, StatusChip } from '../components/ui';
import TxTable from '../components/TxTable';

const COLORS = ['#2dd4bf', '#a78bfa', '#fbbf24', '#fb7185', '#60a5fa', '#34d399', '#f472b6'];
const tip = { contentStyle: { background: 'rgba(13,20,38,.95)', border: '1px solid rgba(255,255,255,.15)', borderRadius: 12 }, labelStyle: { color: '#fff' } };
const axis = { stroke: 'rgba(226,232,240,.5)', fontSize: 12, tickLine: false, axisLine: false };
const kfmt = (v) => (v >= 1e6 ? `${(v / 1e6).toFixed(1)}M` : `${Math.round(v / 1e3)}k`);
const ChartCard = ({ title, children }) => (<Card sx={{ p: 2.5, height: '100%' }}><Typography variant="h6" mb={2}>{title}</Typography><Box height={250}><ResponsiveContainer>{children}</ResponsiveContainer></Box></Card>);

export default function Dashboard() {
  const { summary: s, accounts, transactions, transfers, notifications, cards } = useStore();
  const nav = useNavigate();
  const stats = [
    ['Available Balance', money(s.availableBalance), <WalletIcon />, '#2dd4bf', `Total ${money(s.totalBalance)} in ${s.accountCount} accounts`],
    ['Savings Balance', money(s.savings), <SavingsIcon />, '#a78bfa'],
    ['Current Account Balance', money(s.current), <PaymentsIcon />, '#60a5fa'],
    ['Transactions This Month', s.txThisMonth, <ReceiptIcon />, '#fbbf24'],
    ['Transfers This Month', s.transfersThisMonth, <SwapIcon />, '#f472b6'],
    ['Net Cash Flow', money(s.netCashFlow), <TrendIcon />, s.netCashFlow >= 0 ? '#34d399' : '#fb7185', `In ${money(s.totalIncome)} · Out ${money(s.totalExpenses)}`],
  ];
  return (
    <>
      <PageHeader title="Dashboard" subtitle="Your money at a glance"
        action={<Stack direction="row" gap={1}>
          <Button variant="contained" startIcon={<SendIcon />} onClick={() => nav('/transfers')}>New transfer</Button>
          <Button variant="outlined" color="inherit" startIcon={<ReceiptIcon />} onClick={() => nav('/transactions')}>Transactions</Button>
          <Button variant="outlined" color="inherit" startIcon={<CardIcon />} onClick={() => nav('/cards')}>Cards</Button></Stack>} />
      <Grid container spacing={2.5}>
        {stats.map(([label, value, icon, color, hint]) => (<Grid item xs={12} sm={6} lg={4} key={label}><StatCard label={label} value={value} icon={icon} color={color} hint={hint} /></Grid>))}

        <Grid item xs={12} md={8}><ChartCard title="Transaction trend">
          <AreaChart data={s.trend}><defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2dd4bf" stopOpacity={0.5} /><stop offset="100%" stopColor="#2dd4bf" stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} /><XAxis dataKey="date" {...axis} /><YAxis {...axis} tickFormatter={kfmt} /><Tooltip {...tip} formatter={(v) => money(v)} />
            <Area type="monotone" dataKey="amount" stroke="#2dd4bf" strokeWidth={2.5} fill="url(#g1)" /></AreaChart></ChartCard></Grid>
        <Grid item xs={12} md={4}><ChartCard title="Spending by category">
          <PieChart><Pie data={s.spending} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3} stroke="none">{s.spending.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip {...tip} formatter={(v) => money(v)} /><Legend iconType="circle" /></PieChart></ChartCard></Grid>
        <Grid item xs={12} md={6}><ChartCard title="Income vs expenses">
          <BarChart data={s.incomeExpense}><CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} /><XAxis dataKey="month" {...axis} /><YAxis {...axis} tickFormatter={kfmt} /><Tooltip {...tip} formatter={(v) => money(v)} /><Legend />
            <Bar dataKey="Income" fill="#34d399" radius={[6, 6, 0, 0]} /><Bar dataKey="Expenses" fill="#fb7185" radius={[6, 6, 0, 0]} /></BarChart></ChartCard></Grid>
        <Grid item xs={12} md={6}><ChartCard title="Account balance trend">
          <LineChart data={s.balanceTrend}><CartesianGrid stroke="rgba(255,255,255,.06)" vertical={false} /><XAxis dataKey="date" {...axis} /><YAxis {...axis} tickFormatter={kfmt} domain={['auto', 'auto']} /><Tooltip {...tip} formatter={(v) => money(v)} />
            <Line type="monotone" dataKey="balance" stroke="#a78bfa" strokeWidth={2.5} dot={false} /></LineChart></ChartCard></Grid>

        <Grid item xs={12} lg={8}><Card sx={{ p: 2.5 }}><Typography variant="h6" mb={1}>Recent transactions</Typography><TxTable rows={transactions} compact /></Card></Grid>
        <Grid item xs={12} lg={4}><Card sx={{ p: 2.5, height: '100%' }}><Typography variant="h6">Account summary</Typography>
          {accounts.map((a) => (<Box key={a.id} mt={2} onClick={() => nav(`/accounts/${a.id}`)} sx={{ cursor: 'pointer' }}>
            <Stack direction="row" justifyContent="space-between"><Typography fontWeight={600}>{a.type}</Typography><Typography>{money(a.balance)}</Typography></Stack>
            <LinearProgress variant="determinate" value={Math.min(100, (a.balance / s.totalBalance) * 100)} sx={{ height: 6, borderRadius: 3, mt: 0.7 }} /></Box>))}</Card></Grid>

        <Grid item xs={12} md={4}><Card sx={{ p: 2.5, height: '100%' }}><Typography variant="h6">Recent transfers</Typography>
          <List dense>{transfers.slice(0, 4).map((t) => (<ListItem key={t.ref} disableGutters secondaryAction={<StatusChip status={t.status} />}><ListItemText primary={`${t.recipient} · ${money(t.amount)}`} secondary={`${t.ref} · ${fmtDate(t.date)}`} /></ListItem>))}</List></Card></Grid>
        <Grid item xs={12} md={4}><Card sx={{ p: 2.5, height: '100%' }}><Typography variant="h6">Notifications</Typography>
          <List dense>{notifications.slice(0, 4).map((n) => (<ListItem key={n.id} disableGutters><ListItemText primary={n.title} secondary={n.message} primaryTypographyProps={{ fontWeight: n.read ? 400 : 800 }} /></ListItem>))}</List></Card></Grid>
        <Grid item xs={12} md={4}><Card sx={{ p: 2.5, height: '100%' }}><Typography variant="h6">Cards</Typography>
          <List dense>{cards.map((c) => (<ListItem key={c.id} disableGutters secondaryAction={<Chip size="small" label={c.status} />}><ListItemText primary={`${c.type} •••• ${c.last4}`} secondary={`Expires ${c.expiry}`} /></ListItem>))}</List></Card></Grid>
      </Grid>
    </>
  );
}
