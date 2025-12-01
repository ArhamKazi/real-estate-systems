import PropertyForm from "../PropertyForm";
import PropertyList from "../PropertyList";
import { useState } from "react";

export default function PropertiesPage() {
  const [propertyReloadKey, setPropertyReloadKey] = useState(0);
  function handlePropertyCreated() { setPropertyReloadKey(k => k + 1); }

  return (
    <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start", flexWrap: "wrap" }}>
      <PropertyForm onCreated={handlePropertyCreated} />
      <PropertyList key={propertyReloadKey} />
    </div>
  );
}
