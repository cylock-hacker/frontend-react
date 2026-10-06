import React from 'react';
import { Box, Card, Typography, Button, Alert, Stack } from '@mui/material';
import BankIcon from '@mui/icons-material/AccountBalanceRounded';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';

export default function Login() {
  const { dispatch, customer } = useStore();
  const nav = useNavigate();
  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', placeItems: 'center', p: 2, background: 'radial-gradient(900px 600px at 15% 0%, #0f766e66, transparent), radial-gradient(900px 600px at 90% 100%, #6d28d966, transparent), #070b16' }}>
      <Card sx={{ p: 4, maxWidth: 440, width: '100%', textAlign: 'center' }}>
        <Box sx={{ mx: 'auto', mb: 2, p: 1.5, width: 'fit-content', borderRadius: 4, background: 'linear-gradient(135deg,#2dd4bf,#a78bfa)', color: '#06121f' }}><BankIcon fontSize="large" /></Box>
        <Typography variant="h4">Umutima Bank</Typography>
        <Typography color="text.secondary" mb={3}>Customer dashboard simulation</Typography>
        <Alert severity="warning" variant="outlined" sx={{ textAlign: 'left', mb: 3 }}><b> UMUTIMA    SIMULATOR </b>—  IYI REACT APP DASHBOARD NI SIMLATOR (REO NO REAL API CG DATABASE ONLY MOCK)</Alert>
        <Stack gap={1.5}>
          <Button size="large" variant="contained" onClick={() => { dispatch({ type: 'login' }); nav('/'); }}>Enter as {customer.name}</Button>
          <Button color="inherit" onClick={() => { if (window.confirm('Reset all demo data to its original state?')) { dispatch({ type: 'reset' }); nav('/'); } }}>Reset demo data</Button>
        </Stack>
      </Card>
    </Box>
  );
}
