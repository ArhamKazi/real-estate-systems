from sqlalchemy import func
from sqlalchemy.orm import Session

from .. import models


def leads_by_area(db: Session):
    return (
        db.query(models.Lead.preferred_area, func.count(models.Lead.id))
        .group_by(models.Lead.preferred_area)
        .all()
    )


def leads_by_status(db: Session):
    return (
        db.query(models.Lead.status, func.count(models.Lead.id))
        .group_by(models.Lead.status)
        .all()
    )


def properties_by_location(db: Session):
    return (
        db.query(models.Property.location, func.count(models.Property.id))
        .group_by(models.Property.location)
        .all()
    )
