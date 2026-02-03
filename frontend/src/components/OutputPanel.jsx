import React from 'react'

// Simple output panel used to show results and errors
export default function OutputPanel({ message }) {
  if (!message) return null
  return (
    <div style={{ marginTop: 20, padding: 12, border: '1px solid #222', background: '#fff', borderRadius: 6 }}>
      <strong>Result:</strong>
      <div>{typeof message === 'string' ? message : JSON.stringify(message)}</div>
    </div>
  )
}
