import { useEffect, useState } from "react";
import {
  fetchLeadsByArea,
  fetchLeadsByStatus,
  fetchPropertiesByLocation,
} from "./api";

export default function Dashboard() {
  const [byArea, setByArea] = useState([]);
  const [byStatus, setByStatus] = useState([]);
  const [propsByLocation, setPropsByLocation] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const [area, status, propsLoc] = await Promise.all([
        fetchLeadsByArea(),
        fetchLeadsByStatus(),
        fetchPropertiesByLocation(),
      ]);
      setByArea(area);
      setByStatus(status);
      setPropsByLocation(propsLoc);
    } catch (err) {
      console.error(err);
      alert("Error loading dashboard data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Dashboard</h2>
      {loading && <p>Loading metrics...</p>}

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <div>
          <h3>Leads by Area</h3>
          {byArea.length === 0 && <p>No data yet.</p>}
          {byArea.length > 0 && (
            <table border="1" cellPadding="4" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>Area</th>
                  <th>Leads</th>
                </tr>
              </thead>
              <tbody>
                {byArea.map((row) => (
                  <tr key={row.area}>
                    <td>{row.area}</td>
                    <td>{row.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div>
          <h3>Leads by Status</h3>
          {byStatus.length === 0 && <p>No data yet.</p>}
          {byStatus.length > 0 && (
            <table border="1" cellPadding="4" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Leads</th>
                </tr>
              </thead>
              <tbody>
                {byStatus.map((row) => (
                  <tr key={row.status}>
                    <td>{row.status}</td>
                    <td>{row.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div>
          <h3>Properties by Location</h3>
          {propsByLocation.length === 0 && <p>No data yet.</p>}
          {propsByLocation.length > 0 && (
            <table border="1" cellPadding="4" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Properties</th>
                </tr>
              </thead>
              <tbody>
                {propsByLocation.map((row) => (
                  <tr key={row.location}>
                    <td>{row.location}</td>
                    <td>{row.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <button onClick={load} style={{ marginTop: "1rem" }}>
        Refresh
      </button>
    </div>
  );
}
