import { NavLink } from "react-router-dom";

export default function NavBar() {
  const linkStyle = ({ isActive }) => ({
    padding: "8px 12px",
    textDecoration: "none",
    borderRadius: 6,
    background: isActive ? "#eef" : "transparent",
    color: isActive ? "#003" : "#000",
  });

  return (
    <nav style={{ display: "flex", gap: 8, marginBottom: 16 }}>
      <NavLink to="/" style={linkStyle} end>Leads</NavLink>
      <NavLink to="/properties" style={linkStyle}>Properties</NavLink>
      <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
      <NavLink to="/whatsapp" style={linkStyle}>WhatsApp</NavLink>
    </nav>
  );
}
