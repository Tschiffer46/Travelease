# 🚨 RAILWAY DEPLOYMENT - QUICK FIX

## You're Seeing PostgreSQL Logs? That's the WRONG Service!

```
┌─────────────────────────────────────────────────────────────┐
│  ❌ WRONG: PostgreSQL Service Logs                          │
├─────────────────────────────────────────────────────────────┤
│  "database system is ready to accept connections"           │
│  "PostgreSQL 17.7 starting"                                 │
│  "checkpoint starting"                                       │
│                                                              │
│  ↓ This only tells you the DATABASE is running (good!)     │
│  ↓ It tells you NOTHING about your application!            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│  ✅ CORRECT: Application Service Logs                       │
├─────────────────────────────────────────────────────────────┤
│  "✓ Compiled successfully"                                   │
│  "✓ Ready in 2.9s"                                          │
│  "Listening on port 3000"                                   │
│  "Local: http://localhost:3000"                             │
│                                                              │
│  ↓ This tells you if your Next.js app is running!          │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 How to View the RIGHT Logs

### In Railway Dashboard:

```
1. Your Project
   │
   ├── 🚀 travelease (or your app name)  ← CLICK HERE!
   │   └── Click "Deployments"
   │       └── Click latest deployment
   │           └── View Logs
   │
   └── 🗄️ PostgreSQL  ← NOT THIS ONE for app issues!
```

### Via Railway CLI:

```bash
# View APPLICATION logs
railway logs --service=travelease -f

# NOT this (unless you have DB connection issues)
railway logs --service=PostgreSQL
```

## 🐛 What to Check in Application Logs

### ✅ Good (App is Running):
```
✓ Compiled successfully
✓ Ready in XXXms
✓ Listening on port 3000
✓ Started server on 0.0.0.0:3000
```

### ❌ Bad (App Failed):
```
✗ Error: Cannot find module
✗ Error: DATABASE_URL is not defined
✗ Build failed
✗ Module not found
✗ Port already in use
```

## 🚀 Quick Fix Checklist

### 1. Environment Variables (in APPLICATION service)
- [ ] DATABASE_URL exists (auto-created by Railway)
- [ ] NEXTAUTH_URL set to your Railway URL
- [ ] NEXTAUTH_SECRET set (generate with `openssl rand -base64 32`)
- [ ] OPENWEATHER_API_KEY set
- [ ] NODE_ENV=production

### 2. Database Initialized
```bash
railway run npm run db:push    # Should succeed
railway run npm run db:seed    # Should create products
```

### 3. Verify Deployment
- [ ] Application service shows "Active" status
- [ ] Application logs show "Listening on port 3000"
- [ ] Can access URL: https://your-app.up.railway.app

## 📋 Common Issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| Only see PostgreSQL logs | Looking at wrong service | Switch to application service |
| "DATABASE_URL not defined" | Variable not set in app | Add in app service variables |
| Build fails | npm install error | Check package.json, run locally |
| App doesn't start | Missing dependencies | Check application logs |
| 404 on URL | App not deployed | Check deployment status |

## 🔄 Still Not Working?

1. **Read:** [RAILWAY_TROUBLESHOOTING.md](RAILWAY_TROUBLESHOOTING.md)
2. **Check:** Application service logs (not PostgreSQL)
3. **Verify:** All environment variables in APPLICATION service
4. **Run:** `railway logs --service=travelease -f`
5. **Test:** Build locally: `npm run build && npm start`

---

## 💡 Remember

```
PostgreSQL Logs = Database Status ✓
Application Logs = Your App Status ← Check This!
```

**99% of deployment issues are visible in APPLICATION logs, not PostgreSQL logs!**
