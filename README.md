Real Estate Lead Engine

Full-stack CRM + Property Inquiry System with WhatsApp Automation

A complete real-estate operations system built with FastAPI + React, designed to manage:

Lead capture

CRM pipeline stages

Property listings

Buyer → property inquiries

Automated WhatsApp follow-ups

Light analytics dashboards

🚀 Features
🧲 Lead Capture & CRM

Create new buyer leads

Update pipeline stages (NEW → CONTACTED → QUALIFIED → VISIT → CLOSED)

Track budgets, property type, preferred area

🏡 Property Management

Add units (title, price, location, bedrooms, developer)

View inventory

Link properties to leads via inquiries

🔗 Inquiry Tracking

Track buyer → property engagements

Maintain status (OPEN, VISIT_SCHEDULED, OFFER_MADE, CLOSED)

💬 WhatsApp Automation (Backend Engine)

Message templates (Hi {name},…)

Auto-generate follow-ups for CONTACTED leads

Queue messages as READY for sending

Extendable to Meta / Twilio APIs

📊 Dashboard & Analytics

Leads by area

Leads by CRM stage

Properties by location

🛠 Tech Stack
Backend (FastAPI)

FastAPI, SQLAlchemy, Uvicorn

SQLite (dev) — Postgres-ready

Modular routers & services

Frontend (React + Vite)

React, Vite, Axios

React Router for pages

📁 Project Structure
real-estate-systems/
  backend/
    app/
      main.py
      models.py
      schemas.py
      routers/
        leads.py
        properties.py
        whatsapp.py
        reporting.py
      services/
        whatsapp_flow.py
        reporting.py

  frontend/
    src/
      App.jsx
      api.js
      LeadForm.jsx
      LeadList.jsx
      PropertyForm.jsx
      PropertyList.jsx
      Dashboard.jsx
      NavBar.jsx
      pages/

▶️ Running Locally
Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload


API Docs: http://127.0.0.1:8000/docs

Frontend
cd frontend
npm install
npm run dev


UI: http://localhost:5173

🧪 API Highlights

Leads

GET    /leads/
POST   /leads/
PATCH  /leads/{id}/status


Properties

GET    /properties/
POST   /properties/


Inquiries

POST   /properties/inquiries
GET    /properties/inquiries


WhatsApp Automation

POST  /whatsapp/templates
GET   /whatsapp/templates
POST  /whatsapp/generate
GET   /whatsapp/messages


Reporting

GET /reporting/leads-by-area
GET /reporting/leads-by-status
GET /reporting/properties-by-location