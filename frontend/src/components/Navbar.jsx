import React from 'react'

// Main thing in navbar is accessibility 
export default function Navbar({ current, onNavigate }) {
  const items = [
    { key: 'home', label: 'Home' },
    { key: 'create', label: 'Create Account' },
    { key: 'deposit', label: 'Deposit' },
    { key: 'withdraw', label: 'Withdraw' },
    { key: 'transfer', label: 'Transfer' },
    { key: 'accounts', label: 'Accounts' }
  ]

  return (
    <nav className="navbar">
      <div className="nav-inner">
        {items.map(i => (
          <button
            key={i.key}
            className={`nav-item ${current === i.key ? 'active' : ''}`}
            onClick={() => onNavigate(i.key)}
          >
            {i.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
