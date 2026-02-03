import React, { useState } from 'react'
// Professional banking-grade withdraw form
const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export default function Withdraw({ onSuccess }) {
  const [form, setForm] = useState({ accountNo: '', amount: '' })
  const [message, setMessage] = useState(null)

  async function submit(e) {
    e.preventDefault()
    setMessage(null)
    if (!form.accountNo) return setMessage({ type: 'error', text: 'Account number is required' })
    const amount = Number(form.amount)
    if (form.amount === '' || Number.isNaN(amount) || amount <= 0) {
      return setMessage({ type: 'error', text: 'Amount must be a positive number' })
    }

    const res = await fetch(`${API}/accounts/${form.accountNo}/withdraw`, { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ amount }) 
    })
    const data = await res.json()
    if (data.ok) {
      setMessage({ type: 'success', text: `Amount withdrawn successfully! Remaining balance: ₹${data.account.balance.toFixed(2)}` })
      onSuccess()
      setTimeout(() => {
        setForm({ accountNo: '', amount: '' })
        setMessage(null)
      }, 3000)
    } else {
      setMessage({ type: 'error', text: data.error || 'Withdrawal failed' })
    }
  }

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Withdraw Funds</h2>
        <p className="form-subtitle">Withdraw money from your account</p>
      </div>
      
      <form onSubmit={submit} className="banking-form">
        <div className="form-group">
          <label className="form-label">Account Number</label>
          <input 
            className="form-input" 
            placeholder="Enter account number" 
            value={form.accountNo} 
            onChange={e => setForm({ ...form, accountNo: e.target.value })} 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Withdrawal Amount (INR)</label>
          <input 
            className="form-input" 
            placeholder="0.00" 
            type="number" 
            step="0.01"
            value={form.amount} 
            onChange={e => setForm({ ...form, amount: e.target.value })} 
          />
        </div>

        {message && (
          <div className={`alert alert-${message.type}`}>
            {message.text}
          </div>
        )}

        <button type="submit" className="btn-primary">Withdraw</button>
      </form>
    </div>
  )
}
