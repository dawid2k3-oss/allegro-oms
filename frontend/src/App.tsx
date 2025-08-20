import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

interface User {
  id: number;
  email: string;
  name: string;
  company: string;
  role: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('user@test.pl');
  const [password, setPassword] = useState('user123');
  const [loading, setLoading] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', {
        email,
        password
      });
      
      setUser(response.data.user);
      localStorage.setItem('token', response.data.token);
      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed! Sprawdź email i hasło.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  if (user) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>🎉 AlegroOMS - Zalogowany!</h1>
          <div style={{ 
            background: 'white', 
            color: 'black', 
            padding: '30px', 
            borderRadius: '15px', 
            margin: '20px',
            maxWidth: '500px'
          }}>
            <h2>Witaj, {user.name}! 👋</h2>
            <div style={{ textAlign: 'left', margin: '20px 0' }}>
              <p><strong>📧 Email:</strong> {user.email}</p>
              <p><strong>🏢 Firma:</strong> {user.company}</p>
              <p><strong>👤 Rola:</strong> {user.role}</p>
              <p><strong>🆔 ID:</strong> {user.id}</p>
            </div>
            <button 
              onClick={logout} 
              style={{ 
                padding: '12px 24px', 
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Wyloguj się
            </button>
          </div>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🔐 AlegroOMS - Login</h1>
        <form onSubmit={login} style={{ 
          background: 'white', 
          color: 'black', 
          padding: '40px', 
          borderRadius: '15px', 
          margin: '20px',
          minWidth: '350px'
        }}>
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label>📧 Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              style={{ 
                padding: '12px', 
                width: '100%', 
                borderRadius: '8px',
                border: '2px solid #ddd',
                fontSize: '16px',
                marginTop: '5px'
              }}
              required
            />
          </div>
          
          <div style={{ marginBottom: '25px', textAlign: 'left' }}>
            <label>🔒 Hasło:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              style={{ 
                padding: '12px', 
                width: '100%', 
                borderRadius: '8px',
                border: '2px solid #ddd',
                fontSize: '16px',
                marginTop: '5px'
              }}
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              padding: '15px 30px', 
              background: loading ? '#ccc' : '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px',
              width: '100%',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? '⏳ Logowanie...' : '🚀 Zaloguj się'}
          </button>
          
          <p style={{ marginTop: '20px', fontSize: '14px' }}>
            🧪 Test: user@test.pl / user123
          </p>
        </form>
      </header>
    </div>
  );
}

export default App;
