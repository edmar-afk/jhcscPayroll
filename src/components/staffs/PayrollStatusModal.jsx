/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import api from "../../assets/api";

function PayrollStatusModal({ payrollId }) {
  const [open, setOpen] = useState(false);
  const [statusData, setStatusData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      fetchPayrollStatus();
    }
  }, [open]);

  const fetchPayrollStatus = async () => {
    try {
      const res = await api.get(`/api/payroll/${payrollId}/status/`);
      setStatusData(res.data);
      setError("");
    } catch (err) {
      setError("No status on this payroll yet");
      setStatusData(null);
    }
  };

  return (
    <div>
      <button
        className="text-blue-600 hover:underline"
        onClick={() => setOpen(true)}
      >
        View Payroll Status
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 relative">
            <button
              className="absolute top-3 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">
              Payroll Status
            </h2>

            {error ? (
              <p className="text-center text-gray-500">{error}</p>
            ) : statusData ? (
              <div className="space-y-4">
                <div className="border-b-2 border-dashed border-gray-300 pb-4">
                  <p className="font-extrabold text-blue-800">HR</p>
                  <p>Status: {statusData.hr_status || "—"}</p>
                  <p>Reason: {statusData.hr_reason || "—"}</p>
                  <p>Date: {statusData.hr_date_updated || "—"}</p>
                </div>

                <div className="border-b-2 border-dashed border-gray-300 pb-4">
                  <p className="font-extrabold text-blue-800">Budget Office</p>
                  <p>Status: {statusData.budget_status || "—"}</p>
                  <p>Reason: {statusData.budget_reason || "—"}</p>
                  <p>Date: {statusData.budget_date_updated || "—"}</p>
                </div>

                <div className="border-b-2 border-dashed border-gray-300 pb-4">
                  <p className="font-extrabold text-blue-800">President</p>
                  <p>Status: {statusData.president_status || "—"}</p>
                  <p>Reason: {statusData.president_reason || "—"}</p>
                  <p>Date: {statusData.president_date_updated || "—"}</p>
                </div>

                <div className="border-b-2 border-dashed border-gray-300 pb-4">
                  <p className="font-extrabold text-blue-800">Cashier</p>
                  <p>Status: {statusData.cashier_status || "—"}</p>
                  <p>Reason: {statusData.cashier_reason || "—"}</p>
                  <p>Date: {statusData.cashier_date_updated || "—"}</p>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500">Loading...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PayrollStatusModal;
