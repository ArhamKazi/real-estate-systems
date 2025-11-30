from sqlalchemy import Column, Integer, String, DateTime, Enum, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
import enum

from .database import Base


class LeadStatus(str, enum.Enum):
    NEW = "NEW"
    CONTACTED = "CONTACTED"
    QUALIFIED = "QUALIFIED"
    VISIT = "VISIT"
    CLOSED = "CLOSED"
    LOST = "LOST"


class Lead(Base):
    __tablename__ = "leads"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=True)
    budget_min = Column(Integer, nullable=True)
    budget_max = Column(Integer, nullable=True)
    preferred_area = Column(String, nullable=True)
    property_type = Column(String, nullable=True)
    status = Column(Enum(LeadStatus), default=LeadStatus.NEW, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

class Property(Base):
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    location = Column(String, nullable=False)
    asking_price = Column(Integer, nullable=False)
    bedrooms = Column(Integer, nullable=True)
    bathrooms = Column(Integer, nullable=True)
    developer = Column(String, nullable=True)

    inquiries = relationship("PropertyInquiry", back_populates="property")


class InquiryStatus(str, enum.Enum):
    OPEN = "OPEN"
    VISIT_SCHEDULED = "VISIT_SCHEDULED"
    OFFER_MADE = "OFFER_MADE"
    CLOSED = "CLOSED"


class PropertyInquiry(Base):
    __tablename__ = "property_inquiries"

    id = Column(Integer, primary_key=True, index=True)
    lead_id = Column(Integer, ForeignKey("leads.id"), nullable=False)
    property_id = Column(Integer, ForeignKey("properties.id"), nullable=False)
    status = Column(Enum(InquiryStatus), default=InquiryStatus.OPEN, index=True)

    lead = relationship("Lead")
    property = relationship("Property", back_populates="inquiries")