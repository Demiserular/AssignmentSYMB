import React, { useState } from 'react'
// Professional banking-grade transfer form — validates on backend
const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

export default function Transfer({ onSuccess }) {
  const [form, setForm] = useState({ from: '', to: '', amount: '' })
  const [message, setMessage] = useState(null)

  async function submit(e) {
    e.preventDefault()
    setMessage(null)
    if (!form.from) return setMessage({ type: 'error', text: 'Sender account is required' })
    if (!form.to) return setMessage({ type: 'error', text: 'Recipient account is required' })
    const amount = Number(form.amount)
    if (form.amount === '' || Number.isNaN(amount) || amount <= 0) {
      return setMessage({ type: 'error', text: 'Amount must be a positive number' })
    }

    const res = await fetch(`${API}/transfer`, { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ from: form.from, to: form.to, amount }) 
    })
    const data = await res.json()
    if (data.ok) {
      setMessage({ 
        type: 'success', 
        text: `Transfer successful! ₹${amount.toFixed(2)} transferred from ${form.from} to ${form.to}` 
      })
      onSuccess()
      setTimeout(() => {
        setForm({ from: '', to: '', amount: '' })
        setMessage(null)
      }, 3000)
    } else {
      setMessage({ type: 'error', text: data.error || 'Transfer failed' })
    }
  }

  return (
    <div className="form-card">
      <div className="form-header">
        <h2>Transfer Funds</h2>
        <p className="form-subtitle">Send money between accounts</p>
      </div>
      
      <form onSubmit={submit} className="banking-form">
        <div className="form-group">
          <label className="form-label">From Account</label>
          <input 
            className="form-input" 
            placeholder="Sender account number" 
            value={form.from} 
            onChange={e => setForm({ ...form, from: e.target.value })} 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">To Account</label>
          <input 
            className="form-input" 
            placeholder="Recipient account number" 
            value={form.to} 
            onChange={e => setForm({ ...form, to: e.target.value })} 
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Transfer Amount (INR)</label>
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

        <button type="submit" className="btn-primary">Transfer</button>
      </form>
    </div>
  )
}
