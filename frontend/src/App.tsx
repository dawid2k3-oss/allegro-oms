import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

// 🚀 PRODUCTION BACKEND URL
const API_BASE_URL = 'https://allegro-oms-production.up.railway.app';

interface User {
  id: number;
  email: string;
  role: string;
}

interface Order {
  id: number;
  orderNumber: string;
  status: string;
  amount: number;
  customer: string;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 🔥 UŻYWAMY PRODUCTION URL ZAMIAST LOCALHOST
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      setUser(response.data.user);
      setIsLoggedIn(true);
      await fetchOrders();
    } catch (error) {
      console.error('Login failed:', error);
      setError('Błąd logowania. Sprawdź dane i spróbuj ponownie.');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      // 🔥 UŻYWAMY PRODUCTION URL ZAMIAST LOCALHOST
      const response = await axios.get(`${API_BASE_URL}/api/orders`);
      setOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setError('Błąd podczas pobierania zamówień.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setOrders([]);
    setEmail('');
    setPassword('');
    setError('');
  };

  if (!isLoggedIn) {
    return (
      <div className="App">
        <div className="login-container">
          <div className="login-form">
            <h1>🛒 AlegroOMS</h1>
            <h2>System Zarządzania Zamówieniami</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Hasło"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>
              <button type="submit" disabled={loading}>
                {loading ? '⏳ Logowanie...' : '🚀 Zaloguj'}
              </button>
            </form>
            
            <div className="demo-accounts">
              <h3>Demo Konta:</h3>
              <p><strong>Admin:</strong> admin@test.pl / admin123</p>
              <p><strong>User:</strong> user@test.pl / user123</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="dashboard">
        <header className="dashboard-header">
          <h1>🛒 AlegroOMS Dashboard</h1>
          <div className="user-info">
            <span>Witaj, {user?.email} ({user?.role})</span>
            <button onClick={handleLogout} className="logout-btn">
              Wyloguj
            </button>
          </div>
        </header>

        <main className="dashboard-content">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>📦 Zamówienia</h3>
              <div className="stat-number">{orders.length}</div>
            </div>
            <div className="stat-card">
              <h3>💰 Przychody</h3>
              <div className="stat-number">
                {orders.reduce((sum, order) => sum + order.amount, 0).toLocaleString('pl-PL')} zł
              </div>
            </div>
            <div className="stat-card">
              <h3>⚡ Status</h3>
              <div className="stat-number">Aktywny</div>
            </div>
          </div>

          <div className="orders-section">
            <h2>📋 Ostatnie Zamówienia</h2>
            <div className="orders-table">
              <div className="table-header">
                <div>Nr Zamówienia</div>
                <div>Klient</div>
                <div>Status</div>
                <div>Kwota</div>
              </div>
              {orders.map((order) => (
                <div key={order.id} className="table-row">
                  <div>{order.orderNumber}</div>
                  <div>{order.customer}</div>
                  <div>
                    <span className={`status ${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </div>
                  <div>{order.amount.toLocaleString('pl-PL')} zł</div>
                </div>
              ))}
            </div>
          </div>
        </main>

        <footer className="dashboard-footer">
          <p>🚀 AlegroOMS v1.0 - Production Ready</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
