import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import LeadsPage from "./pages/LeadsPage";
import PropertiesPage from "./pages/PropertiesPage";
import DashboardPage from "./pages/DashboardPage";
import WhatsAppPage from "./pages/WhatsAppPage";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "2rem", fontFamily: "system-ui, sans-serif" }}>
        <h1>Real Estate Lead & Inquiry System</h1>
        <NavBar />
        <Routes>
          <Route path="/" element={<LeadsPage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/whatsapp" element={<WhatsAppPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
