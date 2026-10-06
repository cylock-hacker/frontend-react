import React, { useState } from 'react';
import { Card, Grid, TextField, Button, Typography, Avatar, Stack, MenuItem, Divider } from '@mui/material';
import { useStore } from '../store';
import { PageHeader } from '../components/ui';

export default function Profile() {
  const { customer, dispatch, notify } = useStore();
  const [f, setF] = useState({ name: customer.name, email: customer.email, phone: customer.phone, address: customer.address, language: customer.language });
  const [err, setErr] = useState({});
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const save = () => {
    const e = {};
    if (f.name.trim().length < 3) e.name = 'Enter your full name.';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Enter a valid email address.';
    if (!/^\+?[\d\s]{9,16}$/.test(f.phone)) e.phone = 'Enter a valid phone number (9–15 digits).';
    if (f.address.trim().length < 5) e.address = 'Enter your address.';
    setErr(e);
    if (Object.keys(e).length) return notify('Please fix the highlighted fields.', 'error');
    dispatch({ type: 'profile', data: f, note: { id: `NTF-${Date.now()}`, title: 'Profile update', message: 'Your profile details were updated.', type: 'profile', date: new Date().toISOString(), read: false } });
    notify('Profile updated.');
  };
  const inp = (k, label) => (<Grid item xs={12} md={6}><TextField fullWidth label={label} value={f[k]} onChange={set(k)} error={!!err[k]} helperText={err[k]} /></Grid>);
  const ro = (label, v) => (<Grid item xs={12} md={4}><Typography variant="body2" color="text.secondary">{label}</Typography><Typography fontWeight={700}>{v}</Typography></Grid>);
  return (
    <>
      <PageHeader title="UMWIRONDORO" subtitle="Your personal details" />
      <Card sx={{ p: 3 }}>
        <Stack direction="row" gap={2} alignItems="center" mb={3}><Avatar sx={{ width: 64, height: 64, bgcolor: 'secondary.main', fontSize: 28 }}>{customer.name[0]}</Avatar><div><Typography variant="h5">{customer.name}</Typography><Typography color="text.secondary">Customer ID {customer.id}</Typography></div></Stack>
        <Grid container spacing={2} mb={3}>{ro('Customer ID', customer.id)}{ro('Date of birth', customer.dob)}{ro('Nationality', customer.nationality)}</Grid>
        <Divider sx={{ mb: 3 }} />
        <Grid container spacing={2}>
          {inp('name', 'Full name')}{inp('email', 'Email')}{inp('phone', 'Phone')}{inp('address', 'Address')}
          <Grid item xs={12} md={6}><TextField select fullWidth label="Preferred language" value={f.language} onChange={set('language')}>{['English', 'Kinyarwanda', 'French', 'Swahili'].map((l) => <MenuItem key={l} value={l}>{l}</MenuItem>)}</TextField></Grid>
          <Grid item xs={12}><Button variant="contained" size="large" onClick={save}>Save changes</Button></Grid>
        </Grid>
      </Card>
    </>
  );
}
