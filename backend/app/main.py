from fastapi import FastAPI

from .database import Base, engine
from .routers import leads, properties

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Real Estate Systems API")

app.include_router(leads.router, prefix="/leads", tags=["leads"])
app.include_router(properties.router, prefix="/properties", tags=["properties"])


@app.get("/health")
def health_check():
    return {"status": "ok"}
