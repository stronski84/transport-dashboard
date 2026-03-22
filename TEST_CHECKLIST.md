# 🧪 Test Checklist

## ✅ Backend Tests

- [ ] PostgreSQL baza się tworzy
- [ ] Serwer startuje na port 5000
- [ ] GET /api/auth/status zwraca 200
- [ ] POST /api/auth/login z test@example.com/password123 zwraca token
- [ ] GET /api/transports zwraca []
- [ ] POST /api/transports tworzy transport
- [ ] GET /api/transports/:id zwraca transport
- [ ] PUT /api/transports/:id aktualizuje status
- [ ] DELETE /api/transports/:id usuwa transport

## ✅ Frontend Tests

- [ ] App loaduje na http://localhost:3000
- [ ] LoginPage wyświetla formularz
- [ ] Login test@example.com/password123 działa
- [ ] Redirect do Dashboard
- [ ] MapView pokazuje mapę (placeholder Warszawa)
- [ ] TransportList jest pusta (brak transportów)
- [ ] Console bez ERRORów (tylko WARNINGs OK)
- [ ] Network tab: POST /api/auth/login → 200
- [ ] Network tab: GET /api/transports → 200 []

## ✅ Integration Tests

- [ ] Backend + Frontend komunikują się
- [ ] Login token jest przechowywany (localStorage)
- [ ] Logout czyści token
- [ ] Protected routes: bez tokena → redirect do login
- [ ] API interceptor dodaje Authorization header

## 📊 Metrics

- [ ] Backend response time < 200ms
- [ ] Frontend bundle size < 500KB
- [ ] No memory leaks (DevTools)

---

**Status:** Gotowe do testów lokalnych
**Next:** Socket.IO + GPS integration
