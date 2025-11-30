from fastapi import FastAPI

from .database import Base, engine
from .routers import leads, properties
from .routers import whatsapp


Base.metadata.create_all(bind=engine)

app = FastAPI(title="Real Estate Systems API")

app.include_router(leads.router, prefix="/leads", tags=["leads"])
app.include_router(properties.router, prefix="/properties", tags=["properties"])
app.include_router(whatsapp.router, prefix="/whatsapp", tags=["whatsapp"])

@app.get("/health")
def health_check():
    return {"status": "ok"}
