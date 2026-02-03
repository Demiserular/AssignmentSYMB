const { Account, accounts } = require('../models/accountModel');

// Simple lock mechanism to ensure atomic transfers
const locks = new Set();

function _lock(accountNos) {
  const sorted = [...new Set(accountNos)].sort();
  return new Promise((resolve) => {
    (function attempt() {
      const blocked = sorted.some((a) => locks.has(a));
      if (!blocked) {
        sorted.forEach((a) => locks.add(a));
        return resolve();
      }
      setTimeout(attempt, 5);
    })();
  });
}

function _unlock(accountNos) {
  const sorted = [...new Set(accountNos)];
  sorted.forEach((a) => locks.delete(a));
}

function validateAccountPayload({ accountNo, holderName, initialBalance, isKYCVerified }) {
  const errors = [];
  if (!accountNo && accountNo !== 0) errors.push('accountNo is required');
  if (!holderName) errors.push('holderName is required');
  if (initialBalance === undefined || initialBalance === null) errors.push('initialBalance is required');
  if (Number(initialBalance) < 0) errors.push('initialBalance cannot be negative');
  if (typeof isKYCVerified !== 'boolean') errors.push('isKYCVerified must be boolean');
  if (accounts.has(String(accountNo))) errors.push('accountNo must be unique');
  return errors;
}

async function createAccount(req, res) {
  const { accountNo, holderName, initialBalance, isKYCVerified } = req.body;
  const errors = validateAccountPayload({ accountNo, holderName, initialBalance, isKYCVerified });
  if (errors.length) return res.status(400).json({ ok: false, errors });

  const account = new Account({ accountNo, holderName, balance: initialBalance, isKYCVerified });
  accounts.set(account.accountNo, account);
  return res.status(201).json({ ok: true, account });
}

async function deposit(req, res) {
  const accountNo = String(req.params.accountNo);
  const { amount } = req.body;
  if (amount === undefined || amount === null) return res.status(400).json({ ok: false, error: 'amount is required' });
  if (Number(amount) <= 0) return res.status(400).json({ ok: false, error: 'amount must be positive' });
  const account = accounts.get(accountNo);
  if (!account) return res.status(404).json({ ok: false, error: 'account not found' });

  // Atomic update (single account)
  await _lock([accountNo]);
  try {
    account.balance = Number(account.balance) + Number(amount);
    return res.json({ ok: true, account });
  } finally {
    _unlock([accountNo]);
  }
}

async function withdraw(req, res) {
  const accountNo = String(req.params.accountNo);
  const { amount } = req.body;
  if (amount === undefined || amount === null) return res.status(400).json({ ok: false, error: 'amount is required' });
  if (Number(amount) <= 0) return res.status(400).json({ ok: false, error: 'amount must be positive' });
  const account = accounts.get(accountNo);
  if (!account) return res.status(404).json({ ok: false, error: 'account not found' });

  await _lock([accountNo]);
  try {
    if (account.balance < Number(amount)) return res.status(400).json({ ok: false, error: 'insufficient funds' });
    account.balance = Number(account.balance) - Number(amount);
    return res.json({ ok: true, account });
  } finally {
    _unlock([accountNo]);
  }
}

async function transfer(req, res) {
  const { from, to, amount } = req.body;
  if (!from) return res.status(400).json({ ok: false, error: 'from account is required' });
  if (!to) return res.status(400).json({ ok: false, error: 'to account is required' });
  if (amount === undefined || amount === null) return res.status(400).json({ ok: false, error: 'amount is required' });
  if (Number(amount) <= 0) return res.status(400).json({ ok: false, error: 'amount must be positive' });

  const fromAcc = accounts.get(String(from));
  const toAcc = accounts.get(String(to));
  if (!fromAcc) return res.status(404).json({ ok: false, error: 'sender account not found' });
  if (!toAcc) return res.status(404).json({ ok: false, error: 'receiver account not found' });
  if (!fromAcc.isKYCVerified) return res.status(403).json({ ok: false, error: 'sender KYC not verified' });

  const a = String(from);
  const b = String(to);
  // Acquire locks for both accounts in sorted order to avoid deadlocks
  await _lock([a, b]);
  try {
    if (fromAcc.balance < Number(amount)) return res.status(400).json({ ok: false, error: 'insufficient funds' });
    fromAcc.balance = Number(fromAcc.balance) - Number(amount);
    toAcc.balance = Number(toAcc.balance) + Number(amount);
    return res.json({ ok: true, from: fromAcc, to: toAcc });
  } finally {
    _unlock([a, b]);
  }
}

function listAccounts(req, res) {
  const list = [...accounts.values()];
  return res.json({ ok: true, accounts: list });
}

async function verifyKYC(req, res) {
  const { code } = req.body;
  if (!code || String(code).trim().length === 0) return res.status(400).json({ ok: false, verified: false, error: 'KYC code is required' });
  // Check if code matches SYMB (case-insensitive)
  if (String(code).trim().toUpperCase() === 'SYMB') {
    return res.json({ ok: true, verified: true, message: 'KYC code verified successfully' });
  }
  return res.status(400).json({ ok: false, verified: false, error: 'Invalid KYC code. Please contact banking professional.' });
}

module.exports = { createAccount, deposit, withdraw, transfer, listAccounts, verifyKYC };
