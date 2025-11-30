import { useEffect, useState } from "react";
import { fetchProperties, fetchLeads, createInquiry, fetchInquiries } from "./api";

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [leads, setLeads] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [selectedLeadId, setSelectedLeadId] = useState("");
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadAll() {
    setLoading(true);
    try {
      const [props, ls, inq] = await Promise.all([
        fetchProperties(),
        fetchLeads(),
        fetchInquiries(),
      ]);
      setProperties(props);
      setLeads(ls);
      setInquiries(inq);
    } catch (err) {
      console.error(err);
      alert("Error loading properties/inquiries");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function handleCreateInquiry(e) {
    e.preventDefault();
    if (!selectedLeadId || !selectedPropertyId) {
      alert("Select both a lead and a property");
      return;
    }
    try {
      await createInquiry({
        lead_id: Number(selectedLeadId),
        property_id: Number(selectedPropertyId),
        status: "OPEN",
      });
      setSelectedLeadId("");
      setSelectedPropertyId("");
      await loadAll();
    } catch (err) {
      console.error(err);
      alert("Error creating inquiry");
    }
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Properties & Inquiries</h2>
      {loading && <p>Loading...</p>}

      <h3>Properties</h3>
      {properties.length === 0 && <p>No properties yet.</p>}
      {properties.length > 0 && (
        <table border="1" cellPadding="4" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Location</th>
              <th>Price</th>
              <th>Bedrooms</th>
              <th>Bathrooms</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.title}</td>
                <td>{p.location}</td>
                <td>{p.asking_price}</td>
                <td>{p.bedrooms ?? "-"}</td>
                <td>{p.bathrooms ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h3 style={{ marginTop: "1rem" }}>Create Inquiry</h3>
      <form
        onSubmit={handleCreateInquiry}
        style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}
      >
        <select
          value={selectedLeadId}
          onChange={(e) => setSelectedLeadId(e.target.value)}
        >
          <option value="">Select Lead</option>
          {leads.map((l) => (
            <option key={l.id} value={l.id}>
              #{l.id} — {l.name} ({l.preferred_area || "no area"})
            </option>
          ))}
        </select>

        <select
          value={selectedPropertyId}
          onChange={(e) => setSelectedPropertyId(e.target.value)}
        >
          <option value="">Select Property</option>
          {properties.map((p) => (
            <option key={p.id} value={p.id}>
              #{p.id} — {p.title} ({p.location})
            </option>
          ))}
        </select>

        <button type="submit">Link Inquiry</button>
      </form>

      <h3 style={{ marginTop: "1rem" }}>Inquiries</h3>
      {inquiries.length === 0 && <p>No inquiries yet.</p>}
      {inquiries.length > 0 && (
        <table border="1" cellPadding="4" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Lead ID</th>
              <th>Property ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {inquiries.map((iq) => (
              <tr key={iq.id}>
                <td>{iq.id}</td>
                <td>{iq.lead_id}</td>
                <td>{iq.property_id}</td>
                <td>{iq.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
