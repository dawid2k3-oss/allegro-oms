import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 8080;

// 🚀 PRODUCTION CORS - dodajemy frontend URL
app.use(cors({
  origin: [
    'http://localhost:3000',  // Development
    'https://frontend-production-bcf2.up.railway.app'  // Production frontend URL
  ],
  credentials: true
}));

app.use(express.json());

// Mock users data
const users = [
  { id: 1, email: 'admin@test.pl', password: 'admin123', role: 'admin' },
  { id: 2, email: 'user@test.pl', password: 'user123', role: 'user' }
];

// Mock orders data
const orders = [
  { id: 1, orderNumber: 'ORD-001', status: 'pending', amount: 299.99, customer: 'Jan Kowalski' },
  { id: 2, orderNumber: 'ORD-002', status: 'completed', amount: 499.50, customer: 'Anna Nowak' },
  { id: 3, orderNumber: 'ORD-003', status: 'processing', amount: 150.00, customer: 'Piotr Wiśniewski' },
  { id: 4, orderNumber: 'ORD-004', status: 'completed', amount: 750.25, customer: 'Maria Kowalczyk' },
  { id: 5, orderNumber: 'ORD-005', status: 'pending', amount: 320.80, customer: 'Tomasz Lewandowski' }
];

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: '🚀 AlegroOMS Backend is running',
    timestamp: new Date().toISOString(),
    environment: 'production'
  });
});

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      success: true,
      user: userWithoutPassword,
      message: 'Zalogowano pomyślnie'
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Nieprawidłowe dane logowania'
    });
  }
});

// Orders endpoint
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    availableEndpoints: [
      'GET /health',
      'POST /api/auth/login', 
      'GET /api/orders'
    ]
  });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong'
  });
});

app.listen(port, () => {
  console.log(`🚀 AlegroOMS Backend running on http://localhost:${port}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 CORS enabled for frontend: https://frontend-production-bcf2.up.railway.app`);
});

export default app;
