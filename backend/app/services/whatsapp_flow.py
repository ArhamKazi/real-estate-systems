from sqlalchemy.orm import Session
from .. import models


def generate_followups(db: Session, template_name: str = "initial_followup"):
    """
    For all CONTACTED leads that do not already have a WhatsApp message,
    generate a follow-up using the template.
    """

    # Load template
    template = (
        db.query(models.WhatsAppTemplate)
        .filter(models.WhatsAppTemplate.name == template_name)
        .first()
    )

    if not template:
        raise ValueError("Template not found")

    # Find CONTACTED leads
    leads = (
        db.query(models.Lead)
        .filter(models.Lead.status == models.LeadStatus.CONTACTED)
        .all()
    )

    created = []

    for lead in leads:
        # Check if we already generated message
        existing = (
            db.query(models.WhatsAppMessage)
            .filter(models.WhatsAppMessage.lead_id == lead.id)
            .first()
        )

        if existing:
            continue

        # Render message
        body = template.body.format(
            name=lead.name,
            preferred_area=lead.preferred_area or "your preferred area",
            property_type=lead.property_type or "a property",
        )

        msg = models.WhatsAppMessage(
            lead_id=lead.id,
            body=body,
            status="READY"
        )

        db.add(msg)
        created.append(msg)

    db.commit()
    return created
