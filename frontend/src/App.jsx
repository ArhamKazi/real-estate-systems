import { useState } from "react";
import LeadForm from "./LeadForm";
import LeadList from "./LeadList";
import PropertyForm from "./PropertyForm";
import PropertyList from "./PropertyList";

function App() {
  const [reloadKey, setReloadKey] = useState(0);
  const [propertyReloadKey, setPropertyReloadKey] = useState(0);

  function handleLeadCreated() {
    setReloadKey((k) => k + 1);
  }

  function handlePropertyCreated() {
    setPropertyReloadKey((k) => k + 1);
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Real Estate Lead & Inquiry System</h1>

      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", flexWrap: "wrap" }}>
        <LeadForm onCreated={handleLeadCreated} />
        <LeadList reloadTrigger={reloadKey} />
      </div>

      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", flexWrap: "wrap", marginTop: "2rem" }}>
        <PropertyForm onCreated={handlePropertyCreated} />
        <PropertyList key={propertyReloadKey} />
      </div>
    </div>
  );
}

export default App;
