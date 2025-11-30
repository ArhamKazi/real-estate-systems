import { useState } from "react";
import { createProperty } from "./api";

export default function PropertyForm({ onCreated }) {
  const [form, setForm] = useState({
    title: "",
    location: "",
    asking_price: "",
    bedrooms: "",
    bathrooms: "",
    developer: "",
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
        asking_price: Number(form.asking_price),
        bedrooms: form.bedrooms ? Number(form.bedrooms) : null,
        bathrooms: form.bathrooms ? Number(form.bathrooms) : null,
      };
      await createProperty(payload);
      setForm({
        title: "",
        location: "",
        asking_price: "",
        bedrooms: "",
        bathrooms: "",
        developer: "",
      });
      onCreated?.();
    } catch (err) {
      console.error(err);
      alert("Error creating property");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: "0.5rem", maxWidth: 400 }}>
      <h2>Create Property</h2>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        required
      />
      <input
        name="asking_price"
        placeholder="Asking price"
        value={form.asking_price}
        onChange={handleChange}
        required
      />
      <input
        name="bedrooms"
        placeholder="Bedrooms"
        value={form.bedrooms}
        onChange={handleChange}
      />
      <input
        name="bathrooms"
        placeholder="Bathrooms"
        value={form.bathrooms}
        onChange={handleChange}
      />
      <input
        name="developer"
        placeholder="Developer"
        value={form.developer}
        onChange={handleChange}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Create Property"}
      </button>
    </form>
  );
}
