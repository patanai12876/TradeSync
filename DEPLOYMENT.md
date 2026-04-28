# 🚀 Deployment Guide - Vercel

## Quick Deploy (30 seconds)

### Option 1: Vercel Dashboard (Easiest)
1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to https://vercel.com**
   - Sign in with GitHub account
   - Click "New Project"
   - Select this repository
   - Click "Deploy"
   - **Done!** Your site is live 🎉

### Option 2: Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy from project folder
cd copytrading-website
vercel

# Follow prompts and your site goes live instantly
```

---

## Configuration

### Environment Variables (if backend is added later)
1. In Vercel Dashboard → Project Settings → Environment Variables
2. Add:
   ```
   NEXT_PUBLIC_API_URL = https://your-backend-api.com
   ```
3. Redeploy and it's connected automatically

---

## Build & Performance

- **Build Time**: ~2-3 minutes (first build)
- **Subsequent Deploys**: ~1 minute
- **Auto-scaling**: Vercel handles traffic automatically
- **CDN**: Your site served globally from 300+ edge locations

---

## Current Status

✅ **Ready to Deploy**
- All dependencies installed
- Build scripts configured
- Mock data integrated (frontend works standalone)
- .vercelignore configured
- No environment variables required for initial deployment

---

## Project Size

- **Frontend**: ~8MB (with node_modules)
- **Build Output**: ~2MB
- **Vercel Free Tier Includes**: 100GB bandwidth/month, unlimited deploys

---

## After Deployment

1. **Custom Domain** (optional)
   - Domain Settings → Add custom domain
   - Update DNS records (2-48 hours)

2. **Auto-redeploy on Git Push**
   - Every GitHub push → auto-deploys
   - No manual steps needed

3. **Monitoring**
   - Vercel Dashboard shows analytics
   - View traffic, performance metrics

---

## Next Steps: Backend Integration

When backend is deployed:
1. Get API endpoint from backend host (e.g., `https://api.example.com`)
2. Add to Vercel Environment Variables
3. Replace mock data in pages with API calls
4. Redeploy - done!

---

## Troubleshooting

**Build fails?**
- Check Node version: `node --version` (should be 18+)
- Run locally first: `npm run build && npm start`

**Images not showing?**
- Verify public folder structure
- Check image paths are relative

**Environment variables not working?**
- Redeploy after adding env vars
- Prefix with `NEXT_PUBLIC_` for client-side access

