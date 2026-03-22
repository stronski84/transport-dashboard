// Transport Dashboard Backend Server
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock Database (in-memory for demo)
let users = [
  {
    id: 1,
    email: 'test@example.com',
    password: bcrypt.hashSync('password123', 10),
    role: 'dispatcher',
    phone: '123456789'
  }
];

let transports = [];

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running' });
});

// Auth - Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'Invalid password' });
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'test_secret',
    { expiresIn: '24h' }
  );

  res.json({
    token,
    userId: user.id,
    role: user.role,
    email: user.email
  });
});

// Auth - Status
app.get('/api/auth/status', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'test_secret');
    res.json({ valid: true, user: decoded });
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

// Transports - GET all
app.get('/api/transports', (req, res) => {
  res.json(transports);
});

// Transports - GET by ID
app.get('/api/transports/:id', (req, res) => {
  const transport = transports.find(t => t.id === parseInt(req.params.id));
  if (!transport) {
    return res.status(404).json({ error: 'Transport not found' });
  }
  res.json(transport);
});

// Transports - CREATE
app.post('/api/transports', (req, res) => {
  const { from_location, to_location, driver_id, dispatcher_id, eta } = req.body;

  const transport = {
    id: transports.length + 1,
    from_location,
    to_location,
    driver_id,
    dispatcher_id,
    eta,
    status: 'pending',
    created_at: new Date()
  };

  transports.push(transport);
  res.status(201).json(transport);
});

// Transports - UPDATE
app.put('/api/transports/:id', (req, res) => {
  const transport = transports.find(t => t.id === parseInt(req.params.id));
  if (!transport) {
    return res.status(404).json({ error: 'Transport not found' });
  }

  Object.assign(transport, req.body);
  res.json(transport);
});

// Transports - DELETE
app.delete('/api/transports/:id', (req, res) => {
  const index = transports.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Transport not found' });
  }

  transports.splice(index, 1);
  res.json({ message: 'Deleted' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📍 API: http://localhost:${PORT}`);
});
