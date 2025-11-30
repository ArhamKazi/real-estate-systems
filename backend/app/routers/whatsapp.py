from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database import SessionLocal
from .. import models, schemas

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/templates", response_model=schemas.WhatsAppTemplateOut, status_code=201)
def create_template(payload: schemas.WhatsAppTemplateCreate, db: Session = Depends(get_db)):
    template = models.WhatsAppTemplate(name=payload.name, body=payload.body)
    db.add(template)
    db.commit()
    db.refresh(template)
    return template


@router.get("/templates", response_model=List[schemas.WhatsAppTemplateOut])
def list_templates(db: Session = Depends(get_db)):
    return db.query(models.WhatsAppTemplate).all()


@router.get("/messages", response_model=List[schemas.WhatsAppMessageOut])
def list_messages(db: Session = Depends(get_db)):
    return db.query(models.WhatsAppMessage).all()
