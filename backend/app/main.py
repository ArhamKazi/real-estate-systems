from fastapi import FastAPI

from .database import Base, engine
from .routers import leads, properties
from .routers import whatsapp


Base.metadata.create_all(bind=engine)

app = FastAPI(title="Real Estate Systems API")
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173",
    "https://your-vercel-deployment-domain.vercel.app",
    "https://real-estate-systems.onrender.com",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],            # use ["*"] for quick testing, restrict for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(leads.router, prefix="/leads", tags=["leads"])
app.include_router(properties.router, prefix="/properties", tags=["properties"])
app.include_router(whatsapp.router, prefix="/whatsapp", tags=["whatsapp"])

@app.get("/health")
def health_check():
    return {"status": "ok"}
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routers import leads, properties, whatsapp

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Real Estate Systems API")

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(leads.router, prefix="/leads", tags=["leads"])
app.include_router(properties.router, prefix="/properties", tags=["properties"])
app.include_router(whatsapp.router, prefix="/whatsapp", tags=["whatsapp"])
from .routers import leads, properties, whatsapp, reporting

# ...

app.include_router(leads.router, prefix="/leads", tags=["leads"])
app.include_router(properties.router, prefix="/properties", tags=["properties"])
app.include_router(whatsapp.router, prefix="/whatsapp", tags=["whatsapp"])
app.include_router(reporting.router, prefix="/reporting", tags=["reporting"])


@app.get("/health")
def health_check():
    return {"status": "ok"}

