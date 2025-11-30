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


@router.post("/", response_model=schemas.PropertyOut, status_code=201)
def create_property(payload: schemas.PropertyCreate, db: Session = Depends(get_db)):
    prop = models.Property(
        title=payload.title,
        location=payload.location,
        asking_price=payload.asking_price,
        bedrooms=payload.bedrooms,
        bathrooms=payload.bathrooms,
        developer=payload.developer,
    )
    db.add(prop)
    db.commit()
    db.refresh(prop)
    return prop


@router.get("/", response_model=List[schemas.PropertyOut])
def list_properties(db: Session = Depends(get_db)):
    return db.query(models.Property).all()


@router.post("/inquiries", response_model=schemas.PropertyInquiryOut, status_code=201)
def create_inquiry(
    payload: schemas.PropertyInquiryCreate, db: Session = Depends(get_db)
):
    # ensure lead exists
    lead = db.query(models.Lead).filter(models.Lead.id == payload.lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    prop = (
        db.query(models.Property)
        .filter(models.Property.id == payload.property_id)
        .first()
    )
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")

    inquiry = models.PropertyInquiry(
        lead_id=payload.lead_id,
        property_id=payload.property_id,
        status=models.InquiryStatus(payload.status.value),
    )
    db.add(inquiry)
    db.commit()
    db.refresh(inquiry)
    return inquiry


@router.get("/inquiries", response_model=List[schemas.PropertyInquiryOut])
def list_inquiries(db: Session = Depends(get_db)):
    return db.query(models.PropertyInquiry).all()
