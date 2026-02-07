# 🚀 Quick Deploy to Railway

**Time: 5 minutes | Cost: Free tier available**

## ⚠️ Important: Understanding Railway Services

Your Railway project will have **TWO services**:
1. 🚀 **Your Next.js Application** (travelease) - This runs your website
2. 🗄️ **PostgreSQL Database** - This stores your data

**When troubleshooting, always check the APPLICATION service logs, not the PostgreSQL logs!**

## Prerequisites
- Railway account (https://railway.app)
- GitHub repository connected

## Steps

### 1. Deploy (2 min)
```bash
1. Visit https://railway.app/new
2. Click "Deploy from GitHub repo"
3. Select Tschiffer46/Travelease
4. Railway auto-configures Next.js
```

### 2. Add Database (1 min)
```bash
1. In project: Click "+ New"
2. Select "Database" → "Add PostgreSQL"
3. DATABASE_URL created automatically
```

### 3. Set Variables (1 min)
Go to Variables tab, add:
```env
NEXTAUTH_URL=https://your-app.up.railway.app
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
OPENWEATHER_API_KEY=<get from openweathermap.org>
NODE_ENV=production
```

### 4. Initialize DB (1 min)
```bash
npm i -g @railway/cli
railway login
railway link

# IMPORTANT: These commands run on your APPLICATION service
railway run npm run db:push
railway run npm run db:seed
```

**✅ Verification:** Commands should complete successfully:
```
✓ db:push - "Prisma schema has been synchronized"
✓ db:seed - "Created 18 products" or similar
```

## ✅ Done!

Your app should be live at: `https://your-app.up.railway.app`

### 🔍 Verify Deployment

**Check your APPLICATION service (not PostgreSQL):**

1. In Railway dashboard, click on your **application service** (travelease)
2. Go to **Deployments** tab → Click latest deployment
3. Check **Status**: Should say "Active" or "Success"
4. View **Logs** - Should see:
   ```
   ✓ Compiled successfully
   ✓ Ready in XXXms
   ✓ Listening on port 3000
   ```
5. Click **View** button or visit your Railway URL

**If you only see PostgreSQL logs** (database system ready, etc.), you're looking at the wrong service! Switch to your application service.

## Quick Commands

```bash
# View APPLICATION logs (not PostgreSQL!)
railway logs --service=travelease -f

# View PostgreSQL logs (only if DB issues)
railway logs --service=PostgreSQL -f

# Run commands on your application
railway run npm run db:push
railway run npm run db:seed

# Check deployment status
railway status

# Open app in browser
railway open

# Deploy updates
git push origin main  # Auto-deploys on Railway
```

## 📚 Full Documentation

- **Complete Guide**: [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md)
- **Deployment Checklist**: [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
- **Setup Instructions**: [SETUP.md](SETUP.md)

## 🆘 Quick Troubleshooting

**⚠️ IMPORTANT: You have TWO services in Railway:**
1. **Your Next.js Application** (travelease) ← Check these logs for app issues
2. **PostgreSQL Database** ← Only check if DB connection fails

**If you see "database system is ready to accept connections"**, that's the PostgreSQL logs - your database is working fine! 

**You need to check your APPLICATION logs:**
```
In Railway Dashboard:
1. Click on your APPLICATION service (not PostgreSQL)
2. Go to Deployments → Latest Deployment → View Logs
3. Look for "Ready" or "Listening on port 3000"
```

**Build fails?**
- Check APPLICATION logs (not PostgreSQL): `railway logs --service=travelease`
- Verify environment variables set in APPLICATION service

**Can't connect to DB?**
- Ensure PostgreSQL service added
- Check DATABASE_URL exists in APPLICATION service variables
- Run: `railway run npm run db:push`

**App not loading?**
- Check APPLICATION deployment status (not PostgreSQL)
- Wait 30-60s for cold start (free tier)
- Visit: `https://your-app.up.railway.app`

**📖 Detailed help:** [RAILWAY_TROUBLESHOOTING.md](RAILWAY_TROUBLESHOOTING.md)

## 💡 Pro Tips

1. **Custom Domain**: Settings → Networking
2. **Monitoring**: Built-in metrics in dashboard
3. **Always On**: Upgrade plan to avoid cold starts
4. **Rollback**: Deployments tab → Select version → Rollback

---

**Need help?** See full guide: [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md)
