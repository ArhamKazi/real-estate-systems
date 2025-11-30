from pydantic import BaseModel, EmailStr
from typing import Optional
from enum import Enum
from typing import List


class LeadStatus(str, Enum):
    NEW = "NEW"
    CONTACTED = "CONTACTED"
    QUALIFIED = "QUALIFIED"
    VISIT = "VISIT"
    CLOSED = "CLOSED"
    LOST = "LOST"


class LeadCreate(BaseModel):
    name: str
    phone: str
    email: Optional[EmailStr] = None
    budget_min: Optional[int] = None
    budget_max: Optional[int] = None
    preferred_area: Optional[str] = None
    property_type: Optional[str] = None


class LeadOut(BaseModel):
    id: int
    name: str
    phone: str
    email: Optional[EmailStr]
    budget_min: Optional[int]
    budget_max: Optional[int]
    preferred_area: Optional[str]
    property_type: Optional[str]
    status: LeadStatus

    class Config:
        orm_mode = True


class LeadStatusUpdate(BaseModel):
    status: LeadStatus


class PropertyBase(BaseModel):
    title: str
    location: str
    asking_price: int
    bedrooms: Optional[int] = None
    bathrooms: Optional[int] = None
    developer: Optional[str] = None


class PropertyCreate(PropertyBase):
    pass


class PropertyOut(PropertyBase):
    id: int

    class Config:
        orm_mode = True


class InquiryStatus(str, Enum):
    OPEN = "OPEN"
    VISIT_SCHEDULED = "VISIT_SCHEDULED"
    OFFER_MADE = "OFFER_MADE"
    CLOSED = "CLOSED"


class PropertyInquiryCreate(BaseModel):
    lead_id: int
    property_id: int
    status: Optional[InquiryStatus] = InquiryStatus.OPEN


class PropertyInquiryOut(BaseModel):
    id: int
    lead_id: int
    property_id: int
    status: InquiryStatus

    class Config:
        orm_mode = True