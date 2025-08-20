import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Mock database
const users = [
  {
    id: 1,
    email: 'admin@test.pl',
    password: 'admin123',
    name: 'Administrator',
    company: 'AlegroOMS',
    role: 'admin'
  },
  {
    id: 2,
    email: 'user@test.pl',
    password: 'user123',
    name: 'Jan Kowalski',
    company: 'TestShop Sp. z o.o.',
    role: 'user'
  }
];

// Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  console.log('Login attempt:', email);
  
  const user = users.find(u => u.email === email);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  res.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      company: user.company,
      role: user.role
    },
    token: 'mock-jwt-token'
  });
});

app.get('/api/orders', (req, res) => {
  res.json([
    {
      id: 'ALG-2025-001234',
      status: 'new',
      customer: { name: 'Anna Nowak' },
      amount: 159.99,
      createdAt: new Date().toISOString()
    }
  ]);
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    message: 'AlegroOMS Backend is running!'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 AlegroOMS Backend running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
});
