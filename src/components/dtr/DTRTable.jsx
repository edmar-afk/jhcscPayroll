import React, { useState, useEffect } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Search from "./Search";
import Filter from "./Filter";
import TableHeader from "./TableHeader";
import AddNewRow from "./AddNewRow";
import api from "../../assets/api";
function DTRTable() {
  const [rows, setRows] = useState([]);
  const [editRowId, setEditRowId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [addingNew, setAddingNew] = useState(false);

  useEffect(() => {
    const fetchPayrolls = async () => {
      try {
        const res = await api.get("/api/payrolls/"); // call your Django API
        const formatted = res.data.map((p) => ({
          id: p.id,
          name:
            p.staff?.username || p.staff?.first_name + " " + p.staff?.last_name,
          fixedRate: p.fixed_rate,
          salaryAdjustment: p.salary_adjustment,
          totalSalaryAfterAdjustment: p.salary_after_adjustment,
          overtimePay: p.overtime_pay,
          totalSalaryWithOvertime: p.total_salary_overtime,
          absent1: p.absent,
          lateUndertime: p.late,
          grossCompensation: p.gross_compensation,
          deductionsCoop: p.deductions,
          totalAmountDue: p.total_amount_due,
          no: p.payroll_no,
          checkNo: p.check_no,
          remarks: p.remarks,
        }));
        setRows(formatted);
      } catch (err) {
        console.error("Failed to fetch payrolls", err);
      }
    };
    fetchPayrolls();
  }, []);

  const handleEdit = (row) => {
    setEditRowId(row.id);
    setEditValues({ ...row });
  };

  const handleChange = (e, field) => {
    setEditValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = async (id) => {
    try {
      const payload = {
        fixed_rate: editValues.fixedRate,
        salary_adjustment: editValues.salaryAdjustment,
        salary_after_adjustment: editValues.totalSalaryAfterAdjustment,
        overtime_pay: editValues.overtimePay,
        total_salary_overtime: editValues.totalSalaryWithOvertime,
        absent: editValues.absent1,
        late: editValues.lateUndertime,
        gross_compensation: editValues.grossCompensation,
        deductions: editValues.deductionsCoop,
        total_amount_due: editValues.totalAmountDue,
        payroll_no: editValues.no,
        check_no: editValues.checkNo,
        remarks: editValues.remarks,
      };

      const res = await api.patch(`/api/payrolls/${id}/update/`, payload);
      const updated = res.data;

      // now update rows
      const formatted = {
        id: updated.id,
        name:
          updated.staff?.username ||
          updated.staff?.first_name + " " + updated.staff?.last_name,
        fixedRate: updated.fixed_rate,
        salaryAdjustment: updated.salary_adjustment,
        totalSalaryAfterAdjustment: updated.salary_after_adjustment,
        overtimePay: updated.overtime_pay,
        totalSalaryWithOvertime: updated.total_salary_overtime,
        absent1: updated.absent,
        lateUndertime: updated.late,
        grossCompensation: updated.gross_compensation,
        deductionsCoop: updated.deductions,
        totalAmountDue: updated.total_amount_due,
        no: updated.payroll_no,
        checkNo: updated.check_no,
        remarks: updated.remarks,
      };

      setRows((prev) => prev.map((row) => (row.id === id ? formatted : row)));
      setEditRowId(null);
      setEditValues({});
    } catch (error) {
      console.error("Save failed", error);
    }
  };

  const handleCancel = () => {
    setEditRowId(null);
    setAddingNew(false);
    setEditValues({});
  };

  const handleAddNew = () => {
    setAddingNew(true);
    setEditValues({});
  };

  const formatNumber = (value) => {
    if (typeof value === "number") {
      return value.toLocaleString();
    }
    if (!isNaN(value) && value !== null && value !== "") {
      return Number(value).toLocaleString();
    }
    return value;
  };

  const renderCell = (row, field) => (
    <td className="px-4 py-3 border-r border-gray-200">
      {editRowId === row.id ? (
        field === "name" ? (
          row[field] // staff name stays readonly
        ) : (
          <input
            value={editValues[field]}
            onChange={(e) => handleChange(e, field)}
            className="px-2 py-1 border rounded"
          />
        )
      ) : (
        formatNumber(row[field])
      )}
    </td>
  );

  const handleGenerateQr = async (row) => {
    try {
      const res = await api.post("/api/generate-qr/", { payroll_id: row.id });
      alert("QR generated successfully!");

      setRows((prev) =>
        prev.map((r) => (r.id === row.id ? { ...r, qr: res.data.qr } : r))
      );
    } catch (err) {
      console.error("Failed to generate QR", err);
      alert("QR generation failed");
    }
  };

  return (
    <div className="overflow-x-auto p-6">
      <div className="flex gap-4 justify-between items-center mb-4">
        <Search />
        {/* <Filter /> */}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200"> {/* min-w-[2000px] change if mausab huna2 */}
          <TableHeader />
          <tbody className="whitespace-nowrap divide-y divide-gray-200">
            {rows.map((row) => (
              <tr
                key={row.id}
                className="group odd:bg-gray-200 hover:bg-gray-300 duration-300 transition-colors"
              >
                <td className="px-4 py-3 border-r border-gray-200 w-4">
                  {editRowId === row.id ? (
                    <>
                      <button
                        onClick={() => handleSave(row.id)}
                        className="text-green-600 text-[13px] mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="text-red-600 text-[13px]"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col justify-start">
                      <div>
                        <button
                          onClick={() => handleEdit(row)}
                          className="text-blue-600 text-[13px] mb-1 cursor-pointer hover:scale-110 duration-300 mr-2"
                        >
                          Edit
                        </button>
                        <button className="text-red-600 text-[13px] cursor-pointer hover:scale-110 duration-300">
                          Delete
                        </button>
                      </div>
                      <button
                        onClick={() => handleGenerateQr(row)}
                        className="text-green-600 text-[13px] mb-1 cursor-pointer hover:scale-110 duration-300 mr-2"
                      >
                        Generate QR
                      </button>
                    </div>
                  )}
                </td>

                {renderCell(row, "name")}
                {renderCell(row, "fixedRate")}
                {/* {renderCell(row, "salaryAdjustment")}
                {renderCell(row, "totalSalaryAfterAdjustment")}
                {renderCell(row, "overtimePay")}
                {renderCell(row, "totalSalaryWithOvertime")}
                {renderCell(row, "absent1")}
                {renderCell(row, "lateUndertime")}
                {renderCell(row, "grossCompensation")}
                {renderCell(row, "deductionsCoop")}
                {renderCell(row, "totalAmountDue")}
                {renderCell(row, "no")}
                {renderCell(row, "checkNo")}
                {renderCell(row, "remarks")} */}
              </tr>
            ))}

            {addingNew && (
              <AddNewRow
                editValues={editValues}
                handleChange={handleChange}
                handleCancel={handleCancel}
                setRows={setRows}
              />
            )}

            <tr>
              <td colSpan="17" className="text-center py-3">
                <button
                  onClick={handleAddNew}
                  className="flex items-center justify-center gap-1 ml-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  <AddCircleOutlineIcon fontSize="small" /> Add Row
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DTRTable;
