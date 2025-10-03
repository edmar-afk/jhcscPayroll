import React, { useEffect, useState } from "react";
import api from "../../assets/api";

function AddNewRow({ editValues, handleChange, handleCancel, setRows }) {
  const [facultyStaff, setFacultyStaff] = useState([]);

  useEffect(() => {
    const fetchFacultyStaff = async () => {
      try {
        const res = await api.get("/api/faculty-staff/");
        setFacultyStaff(res.data);
      } catch (err) {
        console.error("Error fetching faculty staff:", err);
      }
    };
    fetchFacultyStaff();
  }, []);

  const handleSave = async () => {
    try {
      const cleanedValues = { ...editValues };
      const numericFields = [
        "fixed_rate",
        "salary_adjustment",
        "salary_after_adjustment",
        "overtime_pay",
        "total_salary_overtime",
        "absent",
        "late",
        "gross_compensation",
        "deductions",
        "total_amount_due",
      ];
      numericFields.forEach((field) => {
        if (cleanedValues[field]) {
          cleanedValues[field] = cleanedValues[field]
            .toString()
            .replace(/,/g, ""); // remove commas before saving
        }
      });

      const res = await api.post("/api/payroll/create/", cleanedValues);
      setRows((prev) => [...prev, res.data]);
      handleCancel();
    } catch (err) {
      console.error("Error saving payroll:", err.response?.data || err);
    }
  };

  const formatNumber = (value) => {
    if (!value) return "";
    const num = value.toString().replace(/,/g, "");
    if (isNaN(num)) return value;
    return parseFloat(num).toLocaleString("en-US");
  };

  const handleNumberChange = (e, field) => {
    const rawValue = e.target.value.replace(/,/g, "");
    if (!isNaN(rawValue)) {
      handleChange(
        { target: { value: formatNumber(rawValue) } },
        field
      );
    } else {
      handleChange(e, field);
    }
  };

  return (
    <tr className="bg-gray-100">
      <td className="px-4 py-3 border-r border-gray-200">
        <button onClick={handleSave} className="text-green-600 text-[13px] mr-2">
          Save
        </button>
        <button onClick={handleCancel} className="text-red-600 text-[13px]">
          Cancel
        </button>
      </td>

      <td className="px-4 py-3 border-r border-gray-200">
        <select
          value={editValues.staff_id || ""}
          onChange={(e) => handleChange(e, "staff_id")}
          className="px-2 py-1 border rounded"
        >
          <option value="">Select Staff</option>
          {facultyStaff.map((staff) => (
            <option key={staff.id} value={staff.id}>
              {staff.first_name}
            </option>
          ))}
        </select>
      </td>

      <td className="px-4 py-3 border-r border-gray-200">
        <input
          value={editValues.fixed_rate || ""}
          onChange={(e) => handleNumberChange(e, "fixed_rate")}
          placeholder="Salary"
          className="px-2 py-1 border rounded"
        />
      </td>

      {/* <td className="px-4 py-3 border-r border-gray-200">
        <input
          value={editValues.salary_adjustment || ""}
          onChange={(e) => handleNumberChange(e, "salary_adjustment")}
          placeholder="Salary Adjustment"
          className="px-2 py-1 border rounded"
        />
      </td>

      <td className="px-4 py-3 border-r border-gray-200">
        <input
          value={editValues.salary_after_adjustment || ""}
          onChange={(e) => handleNumberChange(e, "salary_after_adjustment")}
          placeholder="Total Salary After Adjustment"
          className="px-2 py-1 border rounded"
        />
      </td>

      <td className="px-4 py-3 border-r border-gray-200">
        <input
          value={editValues.overtime_pay || ""}
          onChange={(e) => handleNumberChange(e, "overtime_pay")}
          placeholder="Overtime Pay"
          className="px-2 py-1 border rounded"
        />
      </td>

      <td className="px-4 py-3 border-r border-gray-200">
        <input
          value={editValues.total_salary_overtime || ""}
          onChange={(e) => handleNumberChange(e, "total_salary_overtime")}
          placeholder="Total Salary With Overtime"
          className="px-2 py-1 border rounded"
        />
      </td>

      <td className="px-4 py-3 border-r border-gray-200">
        <input
          value={editValues.absent || ""}
          onChange={(e) => handleNumberChange(e, "absent")}
          placeholder="Absent"
          className="px-2 py-1 border rounded"
        />
      </td>

      <td className="px-4 py-3 border-r border-gray-200">
        <input
          value={editValues.late || ""}
          onChange={(e) => handleNumberChange(e, "late")}
          placeholder="Late/Undertime"
          className="px-2 py-1 border rounded"
        />
      </td>

      <td className="px-4 py-3 border-r border-gray-200">
        <input
          value={editValues.gross_compensation || ""}
          onChange={(e) => handleNumberChange(e, "gross_compensation")}
          placeholder="Gross Compensation"
          className="px-2 py-1 border rounded"
        />
      </td>

      <td className="px-4 py-3 border-r border-gray-200">
        <input
          value={editValues.deductions || ""}
          onChange={(e) => handleNumberChange(e, "deductions")}
          placeholder="Deductions"
          className="px-2 py-1 border rounded"
        />
      </td>

      <td className="px-4 py-3 border-r border-gray-200">
        <input
          value={editValues.total_amount_due || ""}
          onChange={(e) => handleNumberChange(e, "total_amount_due")}
          placeholder="Total Amount Due"
          className="px-2 py-1 border rounded"
        />
      </td>

      <td className="px-4 py-3 border-r border-gray-200"></td>

      <td className="px-4 py-3 border-r border-gray-200">
        <input
          value={editValues.check_no || ""}
          onChange={(e) => handleChange(e, "check_no")}
          placeholder="Check No."
          className="px-2 py-1 border rounded"
        />
      </td>

      <td className="px-4 py-3 border-r border-gray-200">
        <input
          value={editValues.remarks || ""}
          onChange={(e) => handleChange(e, "remarks")}
          placeholder="Remarks"
          className="px-2 py-1 border rounded"
        />
      </td> */}
    </tr>
  );
}

export default AddNewRow;
