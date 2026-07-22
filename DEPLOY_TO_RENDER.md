# Deploy Python Backend to Render

This guide explains how to deploy the Python backend (FastAPI) to Render.

## Prerequisites

- Render account (free tier available)
- Git repository with your code
- Python backend files in `/backend` directory

## Step 1: Prepare Your Repository

Ensure your repository structure looks like this:

```
CrossResearch/
├── backend/
│   ├── server.py
│   ├── price_range_engine.py
│   └── requirements.txt
└── DEPLOY_TO_RENDER.md
```

## Step 2: Create `render.yaml`

Create a `render.yaml` file in your root directory:

```yaml
services:
  - type: web
    name: crossresearch-backend
    env: python
    buildCommand: cd backend && pip install -r requirements.txt
    startCommand: cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT
    envVars:
      - key: PORT
        value: 10000
```

## Step 3: Update `requirements.txt`

Ensure your `backend/requirements.txt` includes all dependencies:

```
yfinance>=0.2.44
pandas>=2.0.0
numpy>=1.24.0
scipy>=1.10.0
fastapi>=0.104.0
uvicorn>=0.24.0
```

## Step 4: Push to GitHub

```bash
git add .
git commit -m "Add Render deployment config"
git push origin main
```

## Step 5: Deploy on Render

1. Go to [render.com](https://render.com)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Render will detect the `render.yaml` file automatically
5. Click **Create Web Service**

## Step 6: Update Your Next.js API Route

After deployment, update your Next.js API route to use the Render URL:

**File:** `app/api/price-ranges/route.ts`

```typescript
const apiUrl = process.env.RENDER_API_URL || `http://127.0.0.1:8000/price-ranges?asset=${asset}&source=${source}`;
```

Add the environment variable in your Next.js `.env.local`:

```
RENDER_API_URL=https://your-app-name.onrender.com/price-ranges
```

## Step 7: Test the Deployment

1. Check the Render dashboard for deployment status
2. Test the API endpoint: `https://your-app-name.onrender.com/`
3. Test the price-ranges endpoint: `https://your-app-name.onrender.com/price-ranges?asset=EURUSD`

## Important Notes

- **Free Tier**: Render's free tier spins down after 15 minutes of inactivity. First request may take ~30 seconds.
- **Cold Starts**: The first request after spin-down will be slower as dependencies reinstall.
- **Environment Variables**: Add any API keys or sensitive data via Render's dashboard, not in code.
- **Logs**: Monitor deployment logs in Render dashboard for errors.

## Troubleshooting

**Build fails:**
- Check `requirements.txt` has all dependencies
- Verify Python version compatibility (Render uses Python 3.9+)

**Runtime errors:**
- Check Render logs for specific error messages
- Ensure `uvicorn` is in requirements.txt
- Verify port is using `$PORT` environment variable

**API timeout:**
- Free tier cold starts can take 30+ seconds
- Consider upgrading to paid tier for production use

## Alternative: Manual Deployment

If `render.yaml` doesn't work, deploy manually:

1. Create **New Web Service** on Render
2. Configure:
   - **Name**: crossresearch-backend
   - **Environment**: Python
   - **Build Command**: `cd backend && pip install -r requirements.txt`
   - **Start Command**: `cd backend && uvicorn server:app --host 0.0.0.0 --port $PORT`
3. Add environment variable `PORT=10000`
4. Deploy
