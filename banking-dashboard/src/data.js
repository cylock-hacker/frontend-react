// ALL DATA IS FAKE. Used only to seed localStorage on first run.
const BASE = new Date('2026-09-29T10:00:00');
const ago = (n) => { const x = new Date(BASE); x.setDate(x.getDate() - n); return x.toISOString(); };

const customer = {
  id: 'CUS-240817', name: 'Sherlock Ciprien', email: 'Sherlock.313@gmail.com', phone: '+250 788 000 111',
  address: 'KG 11 Ave, Kigali, Rwanda', dob: '2001-05-18', nationality: 'Rwandan', language: 'English',
};

const accounts = [
  { id: 'ACC-1001', number: '0012458733', type: 'Current Account', currency: 'RWF', opening: 850000, hold: 25000, status: 'Active', opened: '2022-03-14' },
  { id: 'ACC-1002', number: '0012458891', type: 'Savings Account', currency: 'RWF', opening: 2400000, hold: 0, status: 'Active', opened: '2021-08-02' },
  { id: 'ACC-1003', number: '0012459120', type: 'Student Account', currency: 'RWF', opening: 120000, hold: 5000, status: 'Active', opened: '2024-01-22' },
  { id: 'ACC-1004', number: '0012459477', type: 'Business Account', currency: 'RWF', opening: 1500000, hold: 50000, status: 'Active', opened: '2023-06-09' },
];

// [daysAgo, description, accountIndex, category, type, amount, status, recipient]
const T = [
  [88, 'Monthly salary', 0, 'Salary', 'Deposit', 620000, 'Completed'],
  [86, 'Rent payment', 0, 'Other', 'Payment', 180000, 'Completed'],
  [84, 'Supermarket', 0, 'Food', 'Payment', 42500, 'Completed'],
  [80, 'Tuition fees', 2, 'Education', 'Payment', 65000, 'Completed'],
  [77, 'Bus card top-up', 2, 'Transport', 'Payment', 15000, 'Completed'],
  [74, 'Savings transfer', 0, 'Transfer', 'Transfer Out', 150000, 'Completed', 'Own Savings'],
  [74, 'Savings transfer', 1, 'Transfer', 'Transfer In', 150000, 'Completed'],
  [70, 'Client invoice #204', 3, 'Other', 'Deposit', 480000, 'Completed'],
  [66, 'Electricity bill', 0, 'Utilities', 'Payment', 28000, 'Completed'],
  [63, 'ATM cash withdrawal', 0, 'Other', 'Withdrawal', 60000, 'Completed'],
  [59, 'Books & stationery', 2, 'Education', 'Payment', 22000, 'Completed'],
  [55, 'Monthly salary', 0, 'Salary', 'Deposit', 620000, 'Completed'],
  [52, 'Transfer to Jean Mugisha', 0, 'Transfer', 'Transfer Out', 75000, 'Completed', 'Jean Mugisha'],
  [49, 'Restaurant', 0, 'Food', 'Payment', 18500, 'Completed'],
  [46, 'Account maintenance fee', 3, 'Other', 'Fee', 3000, 'Completed'],
  [43, 'Water bill', 0, 'Utilities', 'Payment', 12000, 'Completed'],
  [40, 'Moto taxi rides', 2, 'Transport', 'Payment', 9000, 'Completed'],
  [37, 'Transfer to Grace Ingabire', 3, 'Transfer', 'Transfer Out', 200000, 'Completed', 'Grace Ingabire'],
  [34, 'Online shopping', 0, 'Shopping', 'Payment', 54000, 'Completed'],
  [31, 'Client invoice #211', 3, 'Other', 'Deposit', 350000, 'Completed'],
  [28, 'Monthly salary', 0, 'Salary', 'Deposit', 620000, 'Completed'],
  [26, 'Internet subscription', 0, 'Utilities', 'Payment', 35000, 'Completed'],
  [24, 'Transfer to Patrick Habimana', 0, 'Transfer', 'Transfer Out', 45000, 'Completed', 'Patrick Habimana'],
  [22, 'Groceries', 0, 'Food', 'Payment', 38000, 'Completed'],
  [20, 'Exam registration', 2, 'Education', 'Payment', 25000, 'Completed'],
  [18, 'Card purchase - Electronics', 0, 'Shopping', 'Payment', 96000, 'Failed'],
  [16, 'Transfer to Diane Mukamana', 3, 'Transfer', 'Transfer Out', 120000, 'Completed', 'Diane Mukamana'],
  [14, 'Fuel', 3, 'Transport', 'Payment', 40000, 'Completed'],
  [12, 'Transfer to Eric Niyonzima', 0, 'Transfer', 'Transfer Out', 30000, 'Completed', 'Eric Niyonzima'],
  [10, 'Mobile airtime', 2, 'Utilities', 'Payment', 5000, 'Completed'],
  [8, 'Transfer to Sandrine Uwera', 0, 'Transfer', 'Transfer Out', 60000, 'Completed', 'Sandrine Uwera'],
  [6, 'Monthly salary', 0, 'Salary', 'Deposit', 620000, 'Completed'],
  [5, 'Lunch', 0, 'Food', 'Payment', 7500, 'Completed'],
  [4, 'Transfer to Olivier Nkurunziza', 0, 'Transfer', 'Transfer Out', 25000, 'Completed', 'Olivier Nkurunziza'],
  [3, 'Cash deposit', 2, 'Other', 'Deposit', 50000, 'Completed'],
  [2, 'Clothes', 0, 'Shopping', 'Payment', 47000, 'Pending'],
  [1, 'Transfer to Claudine Iradukunda', 3, 'Transfer', 'Transfer Out', 80000, 'Completed', 'Claudine Iradukunda'],
  [0, 'Bus ticket', 0, 'Transport', 'Payment', 6500, 'Completed'],
];

const bal = accounts.map((a) => a.opening);
let ref = 0;
const transfers = [];
const transactions = T.map((t, i) => {
  const [d, description, ai, category, type, amount, status, recipient] = t;
  const plus = type === 'Deposit' || type === 'Transfer In';
  if (status === 'Completed') bal[ai] += plus ? amount : -amount;
  const id = `TXN-${String(i + 1).padStart(4, '0')}`;
  if (type === 'Transfer Out') {
    ref += 1;
    transfers.push({ ref: `TRX-2026-${String(ref).padStart(4, '0')}`, date: ago(d), accountId: accounts[ai].id, recipient, recipientAccount: '0' + (40000000 + ref * 7919), bank: 'Bank of Kigali', amount, description, status: 'Completed', txId: id });
  }
  return { id, date: ago(d), description, accountId: accounts[ai].id, category, type, amount, balanceAfter: bal[ai], status };
});
[['Pending', 'Landlord deposit', 90000, 1], ['Failed', 'Insurance premium', 140000, 0], ['Cancelled', 'Gift for family', 35000, 0]].forEach(([status, description, amount, d], k) => {
  ref += 1;
  transfers.push({ ref: `TRX-2026-${String(ref).padStart(4, '0')}`, date: ago(d + k), accountId: 'ACC-1001', recipient: ['Alex Kamanzi', 'Sonia Umutoni', 'Mama'][k], recipientAccount: '0' + (50000000 + k * 311), bank: 'Equity Bank', amount, description, status });
});
transfers.sort((a, b) => new Date(b.date) - new Date(a.date));

const finalAccounts = accounts.map((a, i) => {
  const mine = transactions.filter((t) => t.accountId === a.id);
  return { ...a, balance: bal[i], lastTransaction: mine.length ? mine[mine.length - 1].date : a.opened };
});

const N = [
  ['Transfer completed', 'Your transfer to Claudine Iradukunda was completed.', 'transfer', 1],
  ['New transaction', 'Payment of RWF 6,500 — Bus ticket.', 'transaction', 0],
  ['Low balance warning', 'Student Account is below RWF 100,000.', 'warning', 3],
  ['Card notification', 'Your Visa Debit card ending 4521 was used online.', 'card', 4],
  ['Profile update', 'Your phone number was updated successfully.', 'profile', 6],
  ['Transfer completed', 'Transfer to Olivier Nkurunziza completed.', 'transfer', 4],
  ['New transaction', 'Salary deposit of RWF 620,000 received.', 'transaction', 6],
  ['Card notification', 'Your Mastercard ending 8830 will expire soon.', 'card', 9],
  ['Low balance warning', 'Current Account balance dropped under your alert limit.', 'warning', 12],
  ['New transaction', 'Card purchase - Electronics failed.', 'transaction', 18],
  ['Profile update', 'Your preferred language was changed.', 'profile', 25],
  ['Transfer completed', 'Transfer to Sandrine Uwera completed.', 'transfer', 8],
].map(([title, message, type, d], i) => ({ id: `NTF-${String(i + 1).padStart(3, '0')}`, title, message, type, date: ago(d), read: i > 3 }));

const cards = [
  { id: 'CRD-1', last4: '4521', type: 'Visa Debit', holder: 'Sherlock Ciprien', expiry: '08/28', status: 'Active', accountId: 'ACC-1001' },
  { id: 'CRD-2', last4: '8830', type: 'Mastercard Credit', holder: 'Sherlock Ciprien', expiry: '11/26', status: 'Active', accountId: 'ACC-1002' },
  { id: 'CRD-3', last4: '1177', type: 'Student Card', holder: 'Sherlock Ciprien', expiry: '01/27', status: 'Suspended', accountId: 'ACC-1003' },
  { id: 'CRD-4', last4: '9046', type: 'Visa Business', holder: 'Sherlock Ciprien', expiry: '03/24', status: 'Expired', accountId: 'ACC-1004' },
];

export const seed = () => ({ customer, accounts: finalAccounts, transactions, transfers, cards, notifications: N, session: false });
