import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import CreateAccount from './components/CreateAccount'
import Deposit from './components/Deposit'
import Withdraw from './components/Withdraw'
import Transfer from './components/Transfer'
import AccountList from './components/AccountList'

const API = import.meta.env.VITE_API_URL || 'https://assignmentsymb-backend.onrender.com/api'

export default function App() {
  const [accounts, setAccounts] = useState([])
  const [view, setView] = useState('accounts')

  const refresh = async () => {
    try {
      const res = await fetch(`${API}/accounts`)
      const data = await res.json()
      if (data.ok) setAccounts(data.accounts)
    } catch (err) {
      console.error('Unable to reach backend:', err)
    }
  }

  useEffect(() => { refresh() }, [])

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Online Bank Mini System</h1>
        <p className="subtitle">Secure, simple, and professional banking</p>
      </header>

      <Navbar current={view} onNavigate={setView} />

      <main className="app-main">
        {view === 'create' && (
          <CreateAccount onSuccess={refresh} />
        )}

        {view === 'deposit' && (
          <Deposit onSuccess={refresh} />
        )}

        {view === 'withdraw' && (
          <Withdraw onSuccess={refresh} />
        )}

        {view === 'transfer' && (
          <Transfer onSuccess={refresh} />
        )}

        {view === 'accounts' && (
          <AccountList accounts={accounts} />
        )}
      </main>

    </div>
  )
}
