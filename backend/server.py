from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from price_range_engine import run_all
import uvicorn
import time
from datetime import datetime, timedelta

app = FastAPI(title="Price Range API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple in-memory cache
cache = {}
CACHE_DURATION = 300  # 5 minutes in seconds

@app.get("/")
def read_root():
    return {"status": "running", "service": "Price Range API"}

@app.get("/price-ranges")
def get_price_ranges(asset: str = "EURUSD", source: str = "live"):
    try:
        cache_key = f"{asset}_{source}"
        current_time = time.time()
        
        # Check cache
        if cache_key in cache:
            cached_data, cache_time = cache[cache_key]
            if current_time - cache_time < CACHE_DURATION:
                return {
                    **cached_data,
                    "cached": True,
                    "cache_age_seconds": int(current_time - cache_time)
                }
        
        # Calculate fresh data
        payload, failures = run_all(assets=[asset] if asset != "all" else None, source=source)
        
        if asset != "all" and asset in failures:
            raise HTTPException(status_code=500, detail=failures[asset])
        
        result = None
        if asset != "all":
            result = {
                "asset": asset,
                "ranges": payload["assets"].get(asset),
                "metadata": payload["metadata"].get(asset),
                "generated_utc": payload["generated_utc"],
                "cached": False
            }
        else:
            result = {**payload, "cached": False}
        
        # Store in cache
        cache[cache_key] = (result, current_time)
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
