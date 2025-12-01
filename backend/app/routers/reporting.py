from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Dict, Any

from ..database import SessionLocal
from ..services import reporting as reporting_service

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/leads-by-area")
def get_leads_by_area(db: Session = Depends(get_db)) -> List[Dict[str, Any]]:
    rows = reporting_service.leads_by_area(db)
    return [
        {"area": area or "Unknown", "count": count}
        for area, count in rows
    ]


@router.get("/leads-by-status")
def get_leads_by_status(db: Session = Depends(get_db)) -> List[Dict[str, Any]]:
    rows = reporting_service.leads_by_status(db)
    return [
        {"status": status.value if status else "Unknown", "count": count}
        for status, count in rows
    ]


@router.get("/properties-by-location")
def get_properties_by_location(db: Session = Depends(get_db)) -> List[Dict[str, Any]]:
    rows = reporting_service.properties_by_location(db)
    return [
        {"location": location or "Unknown", "count": count}
        for location, count in rows
    ]
