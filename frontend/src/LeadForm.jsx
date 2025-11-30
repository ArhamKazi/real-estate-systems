import { useState } from "react";
import { createLead } from "./api";

export default function LeadForm({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    budget_min: "",
    budget_max: "",
    preferred_area: "",
    property_type: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        budget_min: form.budget_min ? Number(form.budget_min) : null,
        budget_max: form.budget_max ? Number(form.budget_max) : null,
      };
      await createLead(payload);
      setForm({
        name: "",
        phone: "",
        email: "",
        budget_min: "",
        budget_max: "",
        preferred_area: "",
        property_type: "",
      });
      onCreated?.();
    } catch (err) {
      console.error(err);
      alert("Error creating lead");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.5rem", maxWidth: 400 }}>
      <h2>Create Lead</h2>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        name="budget_min"
        placeholder="Budget min"
        value={form.budget_min}
        onChange={handleChange}
      />
      <input
        name="budget_max"
        placeholder="Budget max"
        value={form.budget_max}
        onChange={handleChange}
      />
      <input
        name="preferred_area"
        placeholder="Preferred area"
        value={form.preferred_area}
        onChange={handleChange}
      />
      <input
        name="property_type"
        placeholder="Property type"
        value={form.property_type}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Create Lead"}
      </button>
    </form>
  );
}
