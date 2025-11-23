import React, { useState, useEffect } from "react";
import AddDtrModal from "../AddDtrModal";
import DtrStatusModal from "./DtrStatusModal";
import TableHeader from "./TableHeader";
import api from "../../assets/api";
import EditDtrModal from "../EditDtrModal";

function DTRTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {
    try {
      const res = await api.get("/api/payrolls/");
      setRows(res.data);
    } catch (err) {
      console.error("Failed to load payrolls", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this payroll?"))
      return;
    try {
      await api.delete(`/api/delete-payroll/${id}/`);
      setRows((prev) => prev.filter((row) => row.id !== id));
      alert("Payroll deleted successfully.");
    } catch (err) {
      alert("Failed to delete payroll.");
    }
  };

  const handleGenerateQr = async (row) => {
    try {
      const res = await api.post("/api/generate-qr/", { payroll_id: row.id });
      alert("QR generated successfully!");

      setRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, qr: res.data.qr } : r))
      );
    } catch (err) {
      alert("QR generation failed");
    }
  };

  return (
    <div className="overflow-x-auto pt-24 lg:pt-12">
      <div className="flex gap-4 justify-between items-center mb-4">
        <AddDtrModal />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <TableHeader />

          <tbody className="whitespace-nowrap divide-y divide-gray-200">
            {rows.map((row) => (
              <tr
                key={row.id}
                className="group odd:bg-gray-200 hover:bg-gray-300 duration-300"
              >
                {/* ACTION */}
                <td className="px-4 py-3 border-r border-gray-200 flex items-center flex-wrap w-44">
                  <EditDtrModal payrollId={row.id}/>
                  <button
                    onClick={() => handleDelete(row.id)}
                    className="text-red-600 text-[13px] ml-2 cursor-pointer"
                  >
                    Delete
                  </button>

                  {row.qr ? (
                    <span className="text-gray-500 text-[13px]">
                      QR Generated
                    </span>
                  ) : (
                    <button
                      onClick={() => handleGenerateQr(row)}
                      className="text-green-600 text-[13px] cursor-pointer"
                    >
                      Generate QR
                    </button>
                  )}

                  <DtrStatusModal
                    payrollId={row.id}
                    staffName={row.staff?.first_name}
                    isScanner={false}
                  />
                </td>

                {/* STAFF NAME */}
                <td className="px-4 py-3 border-r border-gray-200">
                  {row.staff
                    ? `${row.staff.first_name}`
                    : "-"}
                </td>

                {/* BASIC SALARY */}
                <td className="px-4 py-3 border-r border-gray-200">
                  {row.salary || "-"}
                </td>

                {/* PERA/ACA */}
                <td className="px-4 py-3 border-r border-gray-200">
                  {row.pera_aca || "-"}
                </td>

                {/* GROSS INCOME */}
                <td className="px-4 py-3 border-r border-gray-200">
                  {row.monthly_income || "-"}
                </td>

                {/* DATE RELEASED */}
                <td className="px-4 py-3 border-r border-gray-200">
                  {row.date_release || "-"}
                </td>

                {/* DEDUCTIONS */}
                <td className="px-4 py-3 border-r border-gray-200">
                  {row.deductions || "-"}
                </td>

                <td className="px-4 py-3 border-r border-gray-200">
                  {row.gsis_personal_share || "-"}
                </td>

                <td className="px-4 py-3 border-r border-gray-200">
                  {row.gsis_consolidated_loan || "-"}
                </td>

                <td className="px-4 py-3 border-r border-gray-200">
                  {row.gsis_mpl || "-"}
                </td>

                <td className="px-4 py-3 border-r border-gray-200">
                  {row.gsis_educ || "-"}
                </td>

                <td className="px-4 py-3 border-r border-gray-200">
                  {row.gsis_emergency || "-"}
                </td>

                <td className="px-4 py-3 border-r border-gray-200">
                  {row.phic}
                </td>

                <td className="px-4 py-3 border-r border-gray-200">
                  {row.hdmf_personal_share || "-"}
                </td>

                <td className="px-4 py-3 border-r border-gray-200">
                  {row.hdmf_salary_load || "-"}
                </td>

                <td className="px-4 py-3 border-r border-gray-200">
                  {row.ffasa}
                </td>

                <td className="px-4 py-3 border-r border-gray-200">
                  {row.valley_bank_load || "-"}
                </td>

                <td className="px-4 py-3 border-r border-gray-200">
                  {row.hdmf_mpl}
                </td>

                <td className="px-4 py-3 border-r border-gray-200">
                  {row.bir}
                </td>

                <td className="px-4 py-3 border-r border-gray-200">
                  {row.total_deductions}
                </td>

                <td className="px-4 py-3 border-r border-gray-200">
                  {row.net_monthly_income}
                </td>

                <td className="px-4 py-3 border-r border-gray-200">
                  {row.date || "-"}
                </td>

                <td className="px-4 py-3 border-r border-gray-200">
                  {row.ldaap_ada_no || "-"}
                </td>

             
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DTRTable;
