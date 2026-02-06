# 🚀 Quick Deploy to Railway

**Time: 5 minutes | Cost: Free tier available**

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
railway run npm run db:push
railway run npm run db:seed
```

## ✅ Done!

Your app is live at: `https://your-app.up.railway.app`

## Quick Commands

```bash
# View logs
railway logs -f

# Run commands
railway run <command>

# Deploy updates
git push origin main  # Auto-deploys on Railway
```

## 📚 Full Documentation

- **Complete Guide**: [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md)
- **Deployment Checklist**: [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md)
- **Setup Instructions**: [SETUP.md](SETUP.md)

## 🆘 Quick Troubleshooting

**Build fails?**
- Check logs: `railway logs`
- Verify environment variables set

**Can't connect to DB?**
- Ensure PostgreSQL service added
- Check DATABASE_URL exists

**App not loading?**
- Wait 30s for cold start (free tier)
- Check deployment status in dashboard

## 💡 Pro Tips

1. **Custom Domain**: Settings → Networking
2. **Monitoring**: Built-in metrics in dashboard
3. **Always On**: Upgrade plan to avoid cold starts
4. **Rollback**: Deployments tab → Select version → Rollback

---

**Need help?** See full guide: [RAILWAY_DEPLOYMENT.md](RAILWAY_DEPLOYMENT.md)
