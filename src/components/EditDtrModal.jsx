import React, { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import api from "../assets/api";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

function EditDtrModal({ payrollId, isScanner }) {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const FIELD_LABELS = {
    salary: "Basic Salary",
    pera_aca: "Add: Pera/Aca",
    monthly_income: "Gross Monthly Income",
    deductions: "Total Deductions",
    gsis_personal_share: "GSIS Personal Share",
    gsis_consolidated_loan: "GSIS Consolidated Loan",
    gsis_mpl: "GSIS/MPL",
    gsis_educ: "GSIS/Education Loan",
    gsis_emergency: "GSIS/Emergency Loan",
    phic: "PHIC",
    hdmf_personal_share: "HDMF Personal Share",
    hdmf_salary_load: "HDMF Salary Loan",
    ffasa: "FFASA",
    valley_bank_load: "1st Valley Bank Loan",
    hdmf_mpl: "HDMF/MPL",
    bir: "BIR",
    total_deductions: "Total Deductions",
    net_monthly_income: "Net Monthly Income",
    ldaap_ada_no: "LDAAP-ADA No.",
    date_release: "Payslip for the Month of",
    date: "Date",
  };

  const [formData, setFormData] = useState({
    staff_id: "",
    salary: "",
    monthly_income: "",
    pera_aca: "",
    deductions: "",
    gsis_personal_share: "",
    gsis_consolidated_loan: "",
    gsis_mpl: "",
    gsis_educ: "",
    gsis_emergency: "",
    phic: "",
    hdmf_personal_share: "",
    hdmf_salary_load: "",
    ffasa: "",
    valley_bank_load: "",
    hdmf_mpl: "",
    bir: "",
    total_deductions: "",
    net_monthly_income: "",
    ldaap_ada_no: "",
    date_release: "",
    date: "",
  });

  useEffect(() => {
    const loadUsers = async () => {
      const res = await api.get("/api/faculty-staff/");
      setUsers(res.data);
    };
    loadUsers();
  }, []);

  useEffect(() => {
    const loadPayroll = async () => {
      if (!payrollId) return;
      try {
        const res = await api.get(`/api/payrolls/${payrollId}/`);
        const payroll = res.data;
        setFormData({
          staff_id: payroll.staff?.id || "",
          salary: payroll.salary || "",
          monthly_income: payroll.monthly_income || "",
          pera_aca: payroll.pera_aca || "",
          deductions: payroll.deductions || "",
          gsis_personal_share: payroll.gsis_personal_share || "",
          gsis_consolidated_loan: payroll.gsis_consolidated_loan || "",
          gsis_mpl: payroll.gsis_mpl || "",
          gsis_educ: payroll.gsis_educ || "",
          gsis_emergency: payroll.gsis_emergency || "",
          phic: payroll.phic || "",
          hdmf_personal_share: payroll.hdmf_personal_share || "",
          hdmf_salary_load: payroll.hdmf_salary_load || "",
          ffasa: payroll.ffasa || "",
          valley_bank_load: payroll.valley_bank_load || "",
          hdmf_mpl: payroll.hdmf_mpl || "",
          bir: payroll.bir || "",
          total_deductions: payroll.total_deductions || "",
          net_monthly_income: payroll.net_monthly_income || "",
          ldaap_ada_no: payroll.ldaap_ada_no || "",
          date_release: payroll.date_release || "",
          date: payroll.date || "",
        });
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Failed to load payroll data.");
      }
    };
    loadPayroll();
  }, [payrollId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/payrolls/${payrollId}/`, formData);
      setOpen(false);
      alert("Payroll Updated Successfully!");
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert("Error updating payroll.");
    }
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <p
        onClick={() => setOpen(true)}
        className={`cursor-pointer 
    ${
      isScanner
        ? "text-lg bg-blue-600 text-white py-2 px-4 rounded-lg w-fit"
        : "text-blue-600 text-[13px]"
    }`}
      >
         Edit Payroll
      </p>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="absolute left-1/2 top-1/2 w-[600px] -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Edit Payroll Payment</h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-3 max-h-[70vh] overflow-y-auto pr-2"
          >
            <div>
              <label className="block mb-1 font-medium">Select Staff</label>
              <select
                name="staff_id"
                value={formData.staff_id}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
                required
              >
                <option value="">-- Select Staff --</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.first_name}
                  </option>
                ))}
              </select>
            </div>

            {Object.keys(formData).map(
              (key) =>
                key !== "staff_id" && (
                  <div key={key}>
                    <label className="block mb-1 uppercase">
                      {FIELD_LABELS[key] || key.replace(/_/g, " ")}
                    </label>

                    {key === "date" || key === "date_release" ? (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          format="MMM DD, YYYY"
                          value={formData[key] ? dayjs(formData[key]) : null}
                          onChange={(newValue) =>
                            setFormData({
                              ...formData,
                              [key]: newValue
                                ? newValue.format("MMM DD, YYYY")
                                : "",
                            })
                          }
                          slotProps={{
                            textField: {
                              className: "w-full border px-3 py-2 rounded",
                            },
                          }}
                        />
                      </LocalizationProvider>
                    ) : (
                      <input
                        type="text"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                      />
                    )}
                  </div>
                )
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Edit Payroll
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default EditDtrModal;
