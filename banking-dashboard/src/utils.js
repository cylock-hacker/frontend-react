export const money = (n, cur = 'RWF') => `${cur} ${Math.round(n).toLocaleString('en-US')}`;
export const fmtDate = (iso, time) => new Date(iso).toLocaleString('en-GB', time ? { dateStyle: 'medium', timeStyle: 'short' } : { dateStyle: 'medium' });
export const maskAcc = (n) => `•••• ${String(n).slice(-4)}`;
export const INCOME = ['Deposit', 'Transfer In'];
export const EXPENSE = ['Withdrawal', 'Payment', 'Transfer Out', 'Fee'];
export const CATEGORIES = ['Food', 'Transport', 'Utilities', 'Shopping', 'Education', 'Salary', 'Transfer', 'Other'];
export const TYPES = [...INCOME, ...EXPENSE];
export const STATUSES = ['Completed', 'Pending', 'Failed', 'Cancelled'];

const done = (tx) => tx.filter((t) => t.status === 'Completed');
const sum = (arr) => arr.reduce((s, t) => s + t.amount, 0);
const month = (iso) => iso.slice(0, 7);

export function summarize(accounts, transactions, transfers) {
  const ok = done(transactions);
  const totalBalance = accounts.reduce((s, a) => s + a.balance, 0);
  const availableOf = (a) => a.balance - a.hold;
  const byType = (t) => accounts.filter((a) => a.type === t).reduce((s, a) => s + a.balance, 0);
  const totalIncome = sum(ok.filter((t) => INCOME.includes(t.type)));
  const totalExpenses = sum(ok.filter((t) => EXPENSE.includes(t.type)));
  const cur = month(new Date('2026-09-29').toISOString());
  const inMonth = (x) => month(x.date) === cur;

  const sorted = [...ok].sort((a, b) => new Date(a.date) - new Date(b.date));
  const dayMap = sorted.reduce((m, t) => { const k = t.date.slice(5, 10); m[k] = (m[k] || 0) + t.amount; return m; }, {});
  const spendMap = ok.filter((t) => EXPENSE.includes(t.type)).reduce((m, t) => { m[t.category] = (m[t.category] || 0) + t.amount; return m; }, {});
  const ieMap = ok.reduce((m, t) => { const k = month(t.date); m[k] = m[k] || { month: k, Income: 0, Expenses: 0 }; m[k][INCOME.includes(t.type) ? 'Income' : 'Expenses'] += t.amount; return m; }, {});
  let running = totalBalance - (totalIncome - totalExpenses);
  const balanceTrend = sorted.map((t) => { running += INCOME.includes(t.type) ? t.amount : -t.amount; return { date: t.date.slice(5, 10), balance: running }; });

  return {
    totalBalance, accountCount: accounts.length, availableBalance: accounts.reduce((s, a) => s + availableOf(a), 0),
    savings: byType('Savings Account'), current: byType('Current Account'), totalIncome, totalExpenses, netCashFlow: totalIncome - totalExpenses,
    txThisMonth: transactions.filter(inMonth).length, transfersThisMonth: transfers.filter(inMonth).length, availableOf,
    trend: Object.entries(dayMap).map(([date, amount]) => ({ date, amount })),
    spending: Object.entries(spendMap).map(([name, value]) => ({ name, value })),
    incomeExpense: Object.values(ieMap).sort((a, b) => a.month.localeCompare(b.month)), balanceTrend,
  };
}
