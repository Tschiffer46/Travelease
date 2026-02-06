# 🔧 Railway Deployment Troubleshooting Guide

## 🚨 Common Issue: "This is not working"

If you followed the RAILWAY_QUICKSTART.md and see PostgreSQL logs but your app isn't working, **you're viewing the wrong service logs!**

### The Problem

Railway projects with multiple services (your Next.js app + PostgreSQL database) require you to **select the correct service** to view its logs.

**PostgreSQL logs showing "database system is ready to accept connections"** means your database is working fine. But you need to check your **application service logs** to see if your Next.js app is running.

---

## ✅ Step-by-Step Fix

### 1. View the Correct Service Logs

In your Railway dashboard:

```
1. Look at the top of your project - you should see TWO services:
   - "travelease" or your app name (this is your Next.js application)
   - "PostgreSQL" (this is your database)

2. Click on the APPLICATION service (not PostgreSQL)

3. Click on the "Deployments" tab

4. Click on the latest deployment

5. Click "View Logs" to see your application logs
```

**🔍 What to Look For:**

✅ **Good signs in application logs:**
```
✓ Compiled successfully
✓ Ready in [time]ms
✓ Local: http://localhost:3000
✓ Listening on port 3000
```

❌ **Bad signs (errors to fix):**
```
✗ Error: Cannot find module
✗ DATABASE_URL is not defined
✗ Build failed
✗ Port already in use
```

---

## 🐛 Common Issues and Solutions

### Issue 1: Application Won't Start

**Symptom:** PostgreSQL logs look fine, but app URL shows error

**Solution:**

1. **Check Application Logs** (not PostgreSQL logs)
   ```bash
   # Via CLI
   railway logs --service=travelease
   
   # Or in Dashboard: Select your app service → View Logs
   ```

2. **Verify Environment Variables**
   
   In Railway Dashboard → Your App Service → Variables tab, ensure you have:
   ```env
   DATABASE_URL=postgresql://...     # Should be automatically set
   NEXTAUTH_URL=https://your-app.up.railway.app
   NEXTAUTH_SECRET=your-secret-here
   OPENWEATHER_API_KEY=your-key-here
   NODE_ENV=production
   ```

3. **Check if DATABASE_URL is Linked**
   
   The DATABASE_URL should be automatically created when you add PostgreSQL. If it's missing:
   ```
   - Go to your app service settings
   - Click "Variables" tab
   - Check if DATABASE_URL exists
   - If not, go to PostgreSQL service → "Connect" tab → Copy the DATABASE_URL
   - Add it manually to your app service variables
   ```

### Issue 2: Build Failures

**Symptom:** Deployment fails during build

**Check Application Logs for:**
```
Error: Cannot find module 'next'
→ Solution: Ensure package.json is committed

Error: TypeScript errors
→ Solution: Run `npm run build` locally first to catch errors

Error: Out of memory
→ Solution: Add "NODE_OPTIONS=--max_old_space_size=4096" variable
```

**Fix:**
1. Test build locally: `npm run build`
2. Commit any fixes
3. Redeploy on Railway (git push triggers auto-deploy)

### Issue 3: Database Connection Errors

**Symptom:** App starts but can't connect to database

**Check Application Logs for:**
```
Error: P1001: Can't reach database server
Error: Connection refused
```

**Solution:**

1. **Verify DATABASE_URL format:**
   ```bash
   # Should look like:
   postgresql://postgres:password@hostname:port/database
   ```

2. **Check services are in same project:**
   - Both app and PostgreSQL must be in the same Railway project
   - They communicate via Railway's private network

3. **Run database migrations:**
   ```bash
   # Via Railway CLI
   railway run npm run db:push
   
   # Or in Railway shell:
   # App Service → Settings → Open Shell
   npm run db:push
   ```

### Issue 4: Port/Hosting Errors

**Symptom:** 
```
Error: Port 3000 is already in use
Error: listen EADDRINUSE
```

**Solution:**

Railway automatically assigns a PORT. Your Next.js app should use `process.env.PORT` or Railway's default (3000 works).

**Check next.config.ts:**
```typescript
// Should NOT hardcode port
// Railway sets PORT automatically
```

The `npm start` command handles this automatically for Next.js.

### Issue 5: App Deploys but Shows "Application Failed to Respond"

**Symptom:** Deployment succeeds, but visiting URL shows error

**Solution:**

1. **Check Health Check Path**
   
   In `railway.json`:
   ```json
   "healthcheckPath": "/"
   ```
   
   Make sure your app responds at `/` (root path)

2. **Wait for Cold Start**
   
   Free tier apps sleep after inactivity. First request takes 30-60 seconds.

3. **Check Application is Actually Running**
   ```bash
   railway logs --service=travelease -f
   
   # Should show:
   # ✓ Ready in XXXms
   # ✓ Listening on port 3000
   ```

---

## 📋 Deployment Checklist

Use this checklist when deploying:

### Before Deployment
- [ ] `npm run build` succeeds locally
- [ ] All environment variables documented
- [ ] Git repository is up to date

### During Deployment
- [ ] PostgreSQL service added to project
- [ ] Application service deployed from GitHub
- [ ] Both services in same Railway project

### After Deployment
- [ ] View **application logs** (not PostgreSQL)
- [ ] Verify app shows "Ready" or "Listening"
- [ ] Check DATABASE_URL is set in app variables
- [ ] Run migrations: `railway run npm run db:push`
- [ ] Seed database: `railway run npm run db:seed`
- [ ] Test URL: `https://your-app.up.railway.app`

---

## 🔍 How to Get Help

### 1. Gather Information

Before asking for help, collect:

```bash
# Application logs (last 100 lines)
railway logs --service=travelease | tail -100

# List all services
railway status

# Check environment variables
railway variables
```

### 2. Check These Specific Things

**In Railway Dashboard:**

1. **Project Overview**
   - How many services? (Should be 2: app + PostgreSQL)
   - Are both services "Active"?

2. **Application Service**
   - Go to Deployments → Latest deployment
   - Status: "Success" or "Failed"?
   - Logs: What's the last message?

3. **Variables Tab (Application Service)**
   - DATABASE_URL exists? ✓
   - NEXTAUTH_URL set? ✓
   - NEXTAUTH_SECRET set? ✓
   - NODE_ENV=production? ✓

4. **Settings Tab**
   - Start command: `npm start`
   - Build command: `npm run build`

### 3. Common Log Patterns

**✅ Healthy Application Logs:**
```
- info  - Using webpack 5.94.0
- info  - Compiled successfully in 2.9s
- ready - started server on 0.0.0.0:3000
- event - compiled successfully
```

**❌ Unhealthy Application Logs:**
```
Error: Cannot find module '@prisma/client'
→ Missing prisma generate in postinstall

Error: P1001: Can't reach database server
→ DATABASE_URL not set or incorrect

Error: NEXTAUTH_SECRET must be provided
→ Missing NEXTAUTH_SECRET variable

ModuleNotFoundError: No module named 'next'
→ npm install failed or node_modules missing
```

---

## 🚀 Quick Diagnostic Commands

```bash
# 1. View application logs (not PostgreSQL)
railway logs --service=travelease -f

# 2. Check deployment status
railway status

# 3. Check environment variables
railway variables --service=travelease

# 4. Open app in browser
railway open

# 5. Access application shell
railway shell --service=travelease

# 6. Re-run database migrations
railway run --service=travelease npm run db:push

# 7. Check build logs
# In dashboard: Deployments → Latest → Build Logs
```

---

## 🔄 Complete Troubleshooting Flow

```
Start Here
    ↓
[Check Application Logs]
    ↓
Is app building? 
    No → Check Build Logs → Fix errors → Redeploy
    Yes ↓
         
Is app starting?
    No → Check Start Command (npm start) → Check package.json
    Yes ↓
         
Can app connect to DB?
    No → Check DATABASE_URL → Run db:push
    Yes ↓
         
Can you access URL?
    No → Check Health Check → Wait 60s for cold start
    Yes ↓
         
[✅ App is Working!]
```

---

## 💡 Pro Tips

1. **Always Check Application Logs First**
   - PostgreSQL logs are usually fine
   - Your issues are almost always in application logs

2. **Use Railway CLI for Faster Debugging**
   ```bash
   npm i -g @railway/cli
   railway login
   railway link
   railway logs -f  # Follow logs in real-time
   ```

3. **Test Locally First**
   ```bash
   npm run build  # Must succeed
   npm start      # Test production build
   ```

4. **Railway Takes Time**
   - First deployment: 2-5 minutes
   - Cold starts: 30-60 seconds
   - Be patient!

5. **Check Both Services**
   ```
   Project
   ├── travelease (Next.js) ← Check this for app issues
   └── PostgreSQL ← Check this for DB issues
   ```

---

## 📞 Still Stuck?

1. **Read Full Guide:** [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md)
2. **Railway Discord:** https://discord.gg/railway
3. **Railway Docs:** https://docs.railway.app
4. **GitHub Issues:** Report bugs in this repository

---

## 🎯 Quick Reference

| Problem | Where to Look | What to Check |
|---------|---------------|---------------|
| App won't build | Application Build Logs | TypeScript errors, missing deps |
| App won't start | Application Logs | Start command, port issues |
| Can't connect to DB | Application Logs + Variables | DATABASE_URL exists and correct |
| 404 errors | Application Logs | App is running? Routes correct? |
| Slow loading | Application Logs | Cold start (wait 60s) |

---

**Remember:** PostgreSQL logs showing "ready to accept connections" is GOOD. You need to check your **application service logs** to diagnose app issues!
