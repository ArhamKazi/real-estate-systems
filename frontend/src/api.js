import axios from "axios";

const API_BASE = "http://127.0.0.1:8000";

export async function fetchLeads() {
  const res = await axios.get(`${API_BASE}/leads/`);
  return res.data;
}

export async function createLead(payload) {
  const res = await axios.post(`${API_BASE}/leads/`, payload);
  return res.data;
}

export async function updateLeadStatus(id, status) {
  const res = await axios.patch(`${API_BASE}/leads/${id}/status`, {
    status,
  });
  return res.data;
}

// ----- Properties -----

export async function createProperty(payload) {
  const res = await axios.post(`${API_BASE}/properties/`, payload);
  return res.data;
}

export async function fetchProperties() {
  const res = await axios.get(`${API_BASE}/properties/`);
  return res.data;
}

// ----- Inquiries -----

export async function createInquiry(payload) {
  const res = await axios.post(`${API_BASE}/properties/inquiries`, payload);
  return res.data;
}

export async function fetchInquiries() {
  const res = await axios.get(`${API_BASE}/properties/inquiries`);
  return res.data;
}

// ... existing imports and functions ...

export async function fetchLeadsByArea() {
  const res = await axios.get(`${API_BASE}/reporting/leads-by-area`);
  return res.data;
}

export async function fetchLeadsByStatus() {
  const res = await axios.get(`${API_BASE}/reporting/leads-by-status`);
  return res.data;
}

export async function fetchPropertiesByLocation() {
  const res = await axios.get(`${API_BASE}/reporting/properties-by-location`);
  return res.data;
}
