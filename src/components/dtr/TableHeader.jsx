import React from "react";
import Tooltip from "@mui/material/Tooltip";

function TableHeader() {
  return (
    <>
      <thead className="bg-white whitespace-nowrap sticky top-0 z-10">
        <tr className="border-b border-gray-200">
          <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
            <Tooltip title="Action" arrow placement="top">
              <span className="uppercase">Action</span>
            </Tooltip>
          </th>

          <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
            <Tooltip title="Faculty/Staff Name" arrow placement="top">
              <span className="uppercase">Faculty/Staff Name</span>
            </Tooltip>
          </th>

          <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
            <Tooltip title="Salary" arrow placement="top">
              <span className="uppercase">Basic Salary</span>
            </Tooltip>
          </th>
          <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
            <Tooltip title="Salary" arrow placement="top">
              <span className="uppercase">Add: Pera/Aca</span>
            </Tooltip>
          </th>
           <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
            <Tooltip title="Salary" arrow placement="top">
              <span className="uppercase">Gross Monthly Income</span>
            </Tooltip>
          </th>
         
          <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
            <Tooltip title="Date Released" arrow placement="top">
              <span className="uppercase">PAYSLIP of the month</span>
            </Tooltip>
          </th>

          <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
            <Tooltip title="Deductions" arrow placement="top">
              <span className="uppercase">LESS: Deductions</span>
            </Tooltip>
          </th>

          <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
            <Tooltip title="GSIS Personal Share" arrow placement="top">
              <span className="uppercase">GSIS/Personal Share</span>
            </Tooltip>
          </th>

          <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
            <Tooltip title="GSIS Consolidated Loan" arrow placement="top">
              <span className="uppercase">GSIS/Consolidated Loan</span>
            </Tooltip>
          </th>

          <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
            <Tooltip title="GSIS MPL" arrow placement="top">
              <span className="uppercase">GSIS/MPL</span>
            </Tooltip>
          </th>

          <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
            <Tooltip title="GSIS Educ Loan uppercase" arrow placement="top">
              <span className="uppercase">GSIS/Educ. Asst. Loan</span>
            </Tooltip>
          </th>

          <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
            <Tooltip title="GSIS Emergency Loan" arrow placement="top">
              <span className="uppercase">GSIS/Emergency Loan</span>
            </Tooltip>
          </th>

          <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
            <Tooltip title="PhilHealth Contribution" arrow placement="top">
              <span className="uppercase">PHIC</span>
            </Tooltip>
          </th>

          <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
            <Tooltip title="HDMF Personal Share" arrow placement="top">
              <span className="uppercase">HDMF Personal Share</span>
            </Tooltip>
          </th>

          <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
            <Tooltip title="HDMF Salary Loan" arrow placement="top">
              <span className="uppercase">HDMF Salary Loan</span>
            </Tooltip>
          </th>

          <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
            <Tooltip title="FFASA" arrow placement="top">
              <span className="uppercase">FFASA</span>
            </Tooltip>
          </th>

          <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
            <Tooltip title="1st Valley Bank Loan" arrow placement="top">
              <span className="uppercase">1st Valley Bank Loan</span>
            </Tooltip>
          </th>

          <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
            <Tooltip title="HDMF MPL" arrow placement="top">
              <span className="uppercase">HDMF/MPL</span>
            </Tooltip>
          </th>

          <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
            <Tooltip title="BIR Withholding" arrow placement="top">
              <span className="uppercase">BIR</span>
            </Tooltip>
          </th>

          <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
            <Tooltip title="Total Deductions" arrow placement="top">
              <span className="uppercase">Total Deductions</span>
            </Tooltip>
          </th>

          <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
            <Tooltip title="Net Monthly Income" arrow placement="top">
              <span className="uppercase">Net Monthly Income</span>
            </Tooltip>
          </th>

          <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
            <Tooltip title="Date" arrow placement="top">
              <span className="uppercase">Date</span>
            </Tooltip>
          </th>

          <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
            <Tooltip title="LDAAP ADA No." arrow placement="top">
              <span className="uppercase">LDAAP-ADA No.</span>
            </Tooltip>
          </th>

         
        </tr>
      </thead>
    </>
  );
}

export default TableHeader;
