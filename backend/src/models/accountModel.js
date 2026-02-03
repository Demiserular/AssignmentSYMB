class Account {
  constructor({ accountNo, holderName, balance = 0, isKYCVerified = false }) {
    this.accountNo = String(accountNo);
    this.holderName = holderName;
    this.balance = Number(balance);
    this.isKYCVerified = Boolean(isKYCVerified);
  }
}

// In-memory store: Map<accountNo, Account>
const accounts = new Map();

module.exports = { Account, accounts };
