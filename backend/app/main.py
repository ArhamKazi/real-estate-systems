from fastapi import FastAPI

from .database import Base, engine

# Import routers here as we implement them
# from .routers import leads

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Real Estate Systems API")

# app.include_router(leads.router, prefix="/leads", tags=["leads"])


@app.get("/health")
def health_check():
    return {"status": "ok"}
