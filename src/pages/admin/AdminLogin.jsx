import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function AdminLogin({ onLoginSuccess, navigateTo }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    const result = login(email, password);
    if (result.success) {
      if (onLoginSuccess) onLoginSuccess();
    } else {
      setError(result.message);
    }
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem'
      }}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '3rem 2.5rem',
          border: '1px solid var(--gold-border-hover)',
          textAlign: 'center'
        }}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(229, 173, 54, 0.12)',
            border: '1px solid var(--gold-border)',
            color: 'var(--gold-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}
        >
          <Shield size={28} />
        </div>

        <span className="gold-chip" style={{ marginBottom: '0.6rem' }}>PROTECTED PORTAL</span>
        <h1 style={{ fontSize: '1.8rem', color: '#FFF', marginBottom: '0.4rem' }}>
          Admin Login
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '2rem' }}>
          Vela Shootz internal studio operations & booking control.
        </p>

        {error && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(231, 76, 60, 0.15)',
              border: '1px solid rgba(231, 76, 60, 0.4)',
              color: '#FF6B6B',
              borderRadius: 'var(--radius-sm)',
              padding: '0.75rem',
              marginBottom: '1.5rem',
              fontSize: '0.85rem',
              textAlign: 'left'
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.4rem' }}>
              ADMIN USERNAME / EMAIL
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter username or email"
                autoComplete="username"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem 0.8rem 2.6rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(34, 0, 11, 0.8)',
                  border: '1px solid var(--gold-border)',
                  color: '#FFF',
                  fontSize: '0.92rem'
                }}
              />
              <Mail size={16} color="var(--gold-primary)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-gold)', marginBottom: '0.4rem' }}>
              PASSWORD
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem 0.8rem 2.6rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(34, 0, 11, 0.8)',
                  border: '1px solid var(--gold-border)',
                  color: '#FFF',
                  fontSize: '0.92rem'
                }}
              />
              <Lock size={16} color="var(--gold-primary)" style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{ width: '100%', padding: '0.95rem', marginTop: '0.5rem', fontSize: '0.92rem' }}
          >
            <Sparkles size={16} />
            <span>ENTER ADMIN DASHBOARD</span>
          </button>
        </form>

        <button
          onClick={() => navigateTo('home')}
          style={{ marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}
        >
          &larr; Return to Public Website
        </button>
      </div>
    </div>
  );
}
