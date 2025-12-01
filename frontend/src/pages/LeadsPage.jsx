import LeadForm from "../LeadForm";
import LeadList from "../LeadList";
import { useState } from "react";

export default function LeadsPage() {
  const [reloadKey, setReloadKey] = useState(0);
  function handleLeadCreated() { setReloadKey(k => k + 1); }

  return (
    <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", flexWrap: "wrap" }}>
      <LeadForm onCreated={handleLeadCreated} />
      <LeadList reloadTrigger={reloadKey} />
    </div>
  );
}
