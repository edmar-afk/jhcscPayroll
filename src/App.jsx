import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/accounting/Dashboard";
import DTR from "./routes/DTR";
import QrScanner from "./components/accounting/QrScanner";
import PayrollHistory from "./routes/PayrollHistory";
import PayrollStatus from "./routes/PayrollStatus";
import PayrollUpdate from "./routes/PayrollUpdate";
import PayrollList from "./routes/PayrollList";
import Login from "./routes/Login";
import Register from "./routes/Register";
import StaffDashboard from "./routes/StaffDashboard";
import CashierDashboard from "./routes/CashierDashboard";
function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/logout" element={<Logout />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/DTR" element={<DTR />} />
        <Route path="/qr-scanner" element={<QrScanner />} />
        <Route path="/payroll-history" element={<PayrollHistory />} />
        <Route path="/payroll-status" element={<PayrollStatus />} />
        <Route path="/payroll-lists" element={<PayrollList />} />
        <Route path="/payroll-update" element={<PayrollUpdate />} />
        <Route path="/staff-dashboard" element={<StaffDashboard />} />
        <Route path="/cashier-dashboard" element={<CashierDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
