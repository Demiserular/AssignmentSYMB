import React from 'react'
// Professional banking-grade accounts list

export default function AccountList({ accounts }) {
  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Account Overview</h2>
        <p className="form-subtitle">{accounts.length} account{accounts.length !== 1 ? 's' : ''} registered</p>
      </div>
      
      <div className="table-container">
        {accounts.length === 0 ? (
          <div className="empty-state">
            <p>No accounts found</p>
            <p className="empty-hint">Create your first account to get started</p>
          </div>
        ) : (
          <table className="banking-table">
            <thead>
              <tr>
                <th>Account No</th>
                <th>Holder Name</th>
                <th className="text-right">Balance</th>
                <th className="text-center">KYC Status</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(a => (
                <tr key={a.accountNo}>
                  <td className="account-no">{a.accountNo}</td>
                  <td className="holder-name">{a.holderName}</td>
                  <td className="text-right balance">₹{a.balance.toFixed(2)}</td>
                  <td className="text-center">
                    <span className={`kyc-badge ${a.isKYCVerified ? 'verified' : 'unverified'}`}>
                      {a.isKYCVerified ? '✓ Verified' : '✗ Not Verified'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
