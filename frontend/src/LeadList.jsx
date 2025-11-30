import { useEffect, useState } from "react";
import { fetchLeads, updateLeadStatus } from "./api";

const STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "VISIT", "CLOSED", "LOST"];

export default function LeadList({ reloadTrigger }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchLeads();
      setLeads(data);
    } catch (err) {
      console.error(err);
      alert("Error loading leads");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [reloadTrigger]);

  async function handleStatusChange(id, status) {
    try {
      await updateLeadStatus(id, status);
      await load();
    } catch (err) {
      console.error(err);
      alert("Error updating status");
    }
  }

  return (
    <div>
      <h2>Leads</h2>
      {loading && <p>Loading...</p>}
      {!loading && leads.length === 0 && <p>No leads yet.</p>}

      {leads.length > 0 && (
        <table border="1" cellPadding="4" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Area</th>
              <th>Type</th>
              <th>Budget</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead.id}>
                <td>{lead.id}</td>
                <td>{lead.name}</td>
                <td>{lead.preferred_area}</td>
                <td>{lead.property_type}</td>
                <td>
                  {lead.budget_min || "-"} – {lead.budget_max || "-"}
                </td>
                <td>
                  <select
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
