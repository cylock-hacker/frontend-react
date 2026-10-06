import React, { useMemo, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, Typography, Dialog, DialogTitle, DialogContent, Stack, Box } from '@mui/material';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useStore } from '../store';
import { money, fmtDate, INCOME } from '../utils';
import { StatusChip, Empty } from './ui';

export default function TxTable({ rows, compact = false }) {
  const { accounts } = useStore();
  const [sort, setSort] = useState({ key: 'date', dir: 'desc' });
  const [page, setPage] = useState(0);
  const [sel, setSel] = useState(null);
  const per = compact ? 6 : 10;
  const accName = (id) => accounts.find((a) => a.id === id)?.type || id;

  const sorted = useMemo(() => [...rows].sort((a, b) => {
    const v = sort.key === 'amount' ? a.amount - b.amount : new Date(a.date) - new Date(b.date);
    return sort.dir === 'asc' ? v : -v;
  }), [rows, sort]);
  const toggle = (key) => setSort((s) => ({ key, dir: s.key === key && s.dir === 'desc' ? 'asc' : 'desc' }));
  const shown = compact ? sorted.slice(0, per) : sorted.slice(page * per, page * per + per);

  if (!rows.length) return <Empty icon={<ReceiptLongIcon fontSize="inherit" />} title="Nta bikorwa  bihari" text="GERAGEZA GUHINDURA CG GUSHAKISHA UKORESHEJE FILTERSS." />;
  return (
    <>
      <TableContainer>
        <Table size={compact ? 'small' : 'medium'}>
          <TableHead><TableRow>
            <TableCell><TableSortLabel active={sort.key === 'date'} direction={sort.dir} onClick={() => toggle('date')}>Date</TableSortLabel></TableCell>
            <TableCell>Description</TableCell>
            {!compact && <TableCell>Account</TableCell>}
            <TableCell>Category</TableCell>
            <TableCell align="right"><TableSortLabel active={sort.key === 'amount'} direction={sort.dir} onClick={() => toggle('amount')}>Amount</TableSortLabel></TableCell>
            <TableCell>Status</TableCell>
          </TableRow></TableHead>
          <TableBody>
            {shown.map((t) => (
              <TableRow key={t.id} hover sx={{ cursor: 'pointer' }} onClick={() => setSel(t)}>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>{fmtDate(t.date)}</TableCell>
                <TableCell>{t.description}<Typography variant="caption" display="block" color="text.secondary">{t.type}</Typography></TableCell>
                {!compact && <TableCell>{accName(t.accountId)}</TableCell>}
                <TableCell>{t.category}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, whiteSpace: 'nowrap', color: INCOME.includes(t.type) ? 'success.main' : 'text.primary' }}>{INCOME.includes(t.type) ? '+' : '−'}{money(t.amount)}</TableCell>
                <TableCell><StatusChip status={t.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {!compact && <TablePagination component="div" count={sorted.length} page={page} rowsPerPage={per} rowsPerPageOptions={[per]} onPageChange={(_, p) => setPage(p)} />}
      <Dialog open={!!sel} onClose={() => setSel(null)} maxWidth="xs" fullWidth>
        {sel && (<>
          <DialogTitle sx={{ fontWeight: 800 }}>Transaction {sel.id}</DialogTitle>
          <DialogContent>
            <Stack gap={1.2} pb={1}>
              {[['Date', fmtDate(sel.date, true)], ['Description', sel.description], ['Account', accName(sel.accountId)], ['Category', sel.category], ['Type', sel.type], ['Amount', money(sel.amount)], ['Balance after', money(sel.balanceAfter)]].map(([k, v]) => (
                <Stack key={k} direction="row" justifyContent="space-between"><Typography color="text.secondary">{k}</Typography><Typography fontWeight={600}>{v}</Typography></Stack>
              ))}
              <Box display="flex" justifyContent="space-between"><Typography color="text.secondary">Status</Typography><StatusChip status={sel.status} /></Box>
            </Stack>
          </DialogContent>
        </>)}
      </Dialog>
    </>
  );
}
