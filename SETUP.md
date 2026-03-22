# Transport Dashboard - Setup Guide

## 📋 Wymagania
- Node.js 16+
- PostgreSQL 12+
- npm lub yarn

## 🚀 Quick Start

### 1️⃣ PostgreSQL Setup

```bash
# Utwórz bazę
createdb transport_dashboard

# Zaloguj się
psql transport_dashboard

# Zapasteuj schemat z backend/config/db.js
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install

# Utwórz .env
cat > .env << EOF
DB_HOST=localhost
DB_PORT=5432
DB_NAME=transport_dashboard
DB_USER=postgres
DB_PASS=your_password
JWT_SECRET=your_secret_key_here
PORT=5000
EOF

# Uruchom serwer
npm start
```

**Oczekiwany output:**
```
Server running on port 5000
Database connected
```

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install

# Utwórz .env
cat > .env << EOF
REACT_APP_API_URL=http://localhost:5000
EOF

# Uruchom dev server
npm start
```

**Oczekiwany output:**
```
Compiled successfully!
You can now view transport-dashboard in the browser.
http://localhost:3000
```

---

## 🧪 Testowanie

### Login
- **Email:** test@example.com
- **Password:** password123
- **Role:** dispatcher

### Co testować:
1. **Login Page** → wpisz email/pass
2. **Dashboard** → powinna być pusta lista (brak transportów)
3. **MapView** → placeholder mapa Warszawy
4. **Console** → sprawdź czy API calls działają (axios logs)

---

## 🔍 Troubleshooting

### Backend nie łączy się z DB
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
→ Upewnij się że PostgreSQL jest uruchomiony: `psql postgres`

### Frontend nie łączy się z API
```
GET http://localhost:5000/api/transports 404
```
→ Backend nie uruchomiony lub inny port. Sprawdź `.env` w frontend/

### Port 3000 / 5000 zajęty
```bash
# Zmień port w backend/.env lub frontend/.env
PORT=5001  # backend
REACT_APP_API_URL=http://localhost:5001  # frontend
```

---

## 📝 Next Steps

Jak będzie działać lokalnie:
1. Integruję Socket.IO dla real-time
2. Dodam GPS tracking mock
3. Przygotowuję Docker Compose dla full stack
