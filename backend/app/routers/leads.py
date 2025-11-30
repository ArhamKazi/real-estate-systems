from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..database import SessionLocal
from .. import models
from .. import schemas

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=List[schemas.LeadOut])
def list_leads(db: Session = Depends(get_db)):
    return db.query(models.Lead).all()


@router.post("/", response_model=schemas.LeadOut, status_code=201)
def create_lead(payload: schemas.LeadCreate, db: Session = Depends(get_db)):
    lead = models.Lead(
        name=payload.name,
        phone=payload.phone,
        email=payload.email,
        budget_min=payload.budget_min,
        budget_max=payload.budget_max,
        preferred_area=payload.preferred_area,
        property_type=payload.property_type,
    )
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return lead


@router.patch("/{lead_id}/status", response_model=schemas.LeadOut)
def update_lead_status(
    lead_id: int,
    payload: schemas.LeadStatusUpdate,
    db: Session = Depends(get_db),
):
    lead = db.query(models.Lead).filter(models.Lead.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")

    # payload.status is schemas.LeadStatus, but same string values
    lead.status = models.LeadStatus(payload.status.value)
    db.commit()
    db.refresh(lead)
    return lead
