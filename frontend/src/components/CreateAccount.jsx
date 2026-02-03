import React, { useState } from 'react'
// Professional banking-grade create account form
const API = import.meta.env.VITE_API_URL || 'https://assignmentsymb-backend.onrender.com/api'

export default function CreateAccount({ onSuccess }) {
  const [form, setForm] = useState({ accountNo: '', holderName: '', initialBalance: '', isKYCVerified: false, kycCode: '' })
  const [verifying, setVerifying] = useState(false)
  const [message, setMessage] = useState(null)

  async function verifyCode(e) {
    e && e.preventDefault()
    setMessage(null)
    if (!form.kycCode || String(form.kycCode).trim().length < 1) return setMessage({ type: 'error', text: 'Please enter the KYC code' })
    setVerifying(true)
    try {
      const res = await fetch(`${API}/kyc/verify`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: form.kycCode }) })
      const data = await res.json()
      if (data.ok && data.verified) {
        setForm({ ...form, isKYCVerified: true })
        setMessage({ type: 'success', text: 'KYC verified successfully' })
      } else {
        setForm({ ...form, isKYCVerified: false })
        setMessage({ type: 'error', text: data.error || 'KYC verification failed' })
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Unable to verify KYC right now' })
    } finally { setVerifying(false) }
  }

  async function submit(e) {
    e.preventDefault()
    setMessage(null)
    if (!form.accountNo) return setMessage({ type: 'error', text: 'Account number is required' })
    if (!form.holderName) return setMessage({ type: 'error', text: 'Holder name is required' })
    const initialBalance = form.initialBalance === '' ? 0 : Number(form.initialBalance)
    if (Number.isNaN(initialBalance) || initialBalance < 0) return setMessage({ type: 'error', text: 'Initial balance must be 0 or positive' })
    if (!form.isKYCVerified) return setMessage({ type: 'error', text: 'KYC must be verified before creating account' })

    const payload = { accountNo: form.accountNo, holderName: form.holderName, initialBalance, isKYCVerified: form.isKYCVerified }
    const res = await fetch(`${API}/accounts`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await res.json()
    if (data.ok) {
      setMessage({ type: 'success', text: `Account created successfully! Account No: ${form.accountNo}` })
      onSuccess()
      setTimeout(() => {
        setForm({ accountNo: '', holderName: '', initialBalance: '', isKYCVerified: false, kycCode: '' })
        setMessage(null)
      }, 3000)
    } else {
      setMessage({ type: 'error', text: data.error || (data.errors && data.errors.join(', ')) || 'Error creating account' })
    }
  }

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Create New Account</h2>
        <p className="form-subtitle">Open a new bank account</p>
      </div>
      
      <form onSubmit={submit} className="banking-form">
        <div className="form-group">
          <label className="form-label">Account Number</label>
          <input 
            className="form-input" 
            placeholder="Enter unique account number" 
            value={form.accountNo} 
            onChange={e => setForm({ ...form, accountNo: e.target.value })} 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Account Holder Name</label>
          <input 
            className="form-input" 
            placeholder="Full legal name" 
            value={form.holderName} 
            onChange={e => setForm({ ...form, holderName: e.target.value })} 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Initial Balance (INR)</label>
          <input 
            className="form-input" 
            placeholder="0.00" 
            type="number" 
            step="0.01"
            value={form.initialBalance} 
            onChange={e => setForm({ ...form, initialBalance: e.target.value })} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">KYC Verification Code</label>
          <div className="kyc-input-group">
            <input 
              className="form-input" 
              placeholder="Enter code: SYMB" 
              value={form.kycCode} 
              onChange={e => setForm({ ...form, kycCode: e.target.value })} 
            />
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={verifyCode} 
              disabled={verifying}
            >
              {verifying ? 'Verifying...' : 'Verify'}
            </button>
          </div>
          <div className={`kyc-status ${form.isKYCVerified ? 'verified' : ''}`}>
            {form.isKYCVerified ? '✓ KYC Verified' : '⚠ Not verified'}
          </div>
        </div>

        {message && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <button type="submit" className="btn-primary">Create Account</button>
      </form>
    </div>
  )
}
