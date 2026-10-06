import React, { createContext, useContext, useEffect, useMemo, useReducer, useState, useCallback } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { seed } from './data';
import { summarize } from './utils';

const KEY = 'umutima-bank-sim-v1';
const init = () => { try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.accounts) return s; } catch { /* ignore */ } return seed(); };
const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);

function reducer(s, a) {
  switch (a.type) {
    case 'login': return { ...s, session: true };
    case 'logout': return { ...s, session: false };
    case 'reset': return { ...seed(), session: true };
    case 'profile': return { ...s, customer: { ...s.customer, ...a.data }, notifications: [a.note, ...s.notifications] };
    case 'card': return { ...s, cards: s.cards.map((c) => (c.id === a.id ? { ...c, status: c.status === 'Active' ? 'Blocked' : 'Active' } : c)), notifications: [a.note, ...s.notifications] };
    case 'notif': return { ...s, notifications: a.fn(s.notifications) };
    case 'transfer': {
      const { f, ref, id, now } = a;
      const amount = Number(f.amount);
      const acc = s.accounts.find((x) => x.id === f.accountId);
      const balance = acc.balance - amount;
      const tx = { id, date: now, description: f.description, accountId: acc.id, category: 'Transfer', type: 'Transfer Out', amount, balanceAfter: balance, status: 'Completed' };
      const tr = { ref, date: now, accountId: acc.id, recipient: f.recipient, recipientAccount: f.recipientAccount, bank: f.bank, amount, description: f.description, status: 'Completed', txId: id };
      const notes = [{ id: `NTF-${Date.now()}`, title: 'Transfer completed', message: `${ref}: RWF ${amount.toLocaleString('en-US')} sent to ${f.recipient}.`, type: 'transfer', date: now, read: false }];
      if (balance < 100000) notes.push({ id: `NTF-${Date.now() + 1}`, title: 'Low balance warning', message: `${acc.type} balance is now below RWF 100,000.`, type: 'warning', date: now, read: false });
      return { ...s, accounts: s.accounts.map((x) => (x.id === acc.id ? { ...x, balance, lastTransaction: now } : x)), transactions: [...s.transactions, tx], transfers: [tr, ...s.transfers], notifications: [...notes, ...s.notifications] };
    }
    default: return s;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, init);
  const [toast, setToast] = useState(null);
  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(state)); }, [state]);
  const notify = useCallback((message, severity = 'success') => setToast({ message, severity, k: Date.now() }), []);
  const summary = useMemo(() => summarize(state.accounts, state.transactions, state.transfers), [state.accounts, state.transactions, state.transfers]);
  const unread = useMemo(() => state.notifications.filter((n) => !n.read).length, [state.notifications]);
  const value = { ...state, dispatch, notify, summary, unread };
  return (
    <Ctx.Provider value={value}>
      {children}
      <Snackbar key={toast?.k} open={!!toast} autoHideDuration={4000} onClose={() => setToast(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        {toast ? <Alert severity={toast.severity} variant="filled" onClose={() => setToast(null)}>{toast.message}</Alert> : undefined}
      </Snackbar>
    </Ctx.Provider>
  );
}
