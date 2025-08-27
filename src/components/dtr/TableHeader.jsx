import React from 'react'
import Tooltip from "@mui/material/Tooltip";
function TableHeader() {
  return (
    <>
      <thead className="bg-white whitespace-nowrap sticky top-0 z-10">
              {" "}
              <tr className="border-b border-gray-200">
                {" "}
                <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200 max-w-[150px] truncate">
                  {" "}
                  <Tooltip title="Action" arrow placement="top">
                    {" "}
                    <span>Action</span>{" "}
                  </Tooltip>{" "}
                </th>{" "}
                <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200 max-w-[150px] truncate">
                  {" "}
                  <Tooltip title="Faculty/Staff Name" arrow placement="top">
                    {" "}
                    <span>Faculty/Staff Name</span>{" "}
                  </Tooltip>{" "}
                </th>{" "}
                <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200 max-w-[150px] truncate">
                  {" "}
                  <Tooltip title="Fixed Rate" arrow placement="top">
                    {" "}
                    <span>Fixed Rate</span>{" "}
                  </Tooltip>{" "}
                </th>{" "}
                <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200 max-w-[150px] truncate">
                  {" "}
                  <Tooltip
                    title="SALARY ADJUSTMENT DUE TO EFFICTIVITY OF CONTRACT"
                    arrow
                    placement="top"
                  >
                    {" "}
                    <span>
                      {" "}
                      SALARY ADJUSTMENT DUE TO EFFICTIVITY OF CONTRACT{" "}
                    </span>{" "}
                  </Tooltip>{" "}
                </th>{" "}
                <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200 max-w-[150px] truncate">
                  {" "}
                  <Tooltip
                    title="TOTAL SALARY AFTER ADJUSTMENT"
                    arrow
                    placement="top"
                  >
                    {" "}
                    <span>TOTAL SALARY AFTER ADJUSTMENT</span>{" "}
                  </Tooltip>{" "}
                </th>{" "}
                <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200 max-w-[150px] truncate">
                  {" "}
                  <Tooltip title="OVERTIME PAY" arrow placement="top">
                    {" "}
                    <span>OVERTIME PAY</span>{" "}
                  </Tooltip>{" "}
                </th>{" "}
                <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200 max-w-[150px] truncate">
                  {" "}
                  <Tooltip title="OVERTIME PAY" arrow placement="top">
                    {" "}
                    <span>TOTAL SALARY WITH OVERTIME</span>{" "}
                  </Tooltip>{" "}
                </th>{" "}
                <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200 max-w-[150px] truncate">
                  {" "}
                  <Tooltip title="ABSENT" arrow placement="top">
                    {" "}
                    <span>ABSENT</span>{" "}
                  </Tooltip>{" "}
                </th>{" "}
                
                <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200 max-w-[150px] truncate">
                  {" "}
                  <Tooltip title="LATE/UNDERTIME" arrow placement="top">
                    {" "}
                    <span>LATE/UNDERTIME</span>{" "}
                  </Tooltip>{" "}
                </th>{" "}
                <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200 max-w-[150px] truncate">
                  {" "}
                  <Tooltip title="GROSS COMPENSATION" arrow placement="top">
                    {" "}
                    <span>GROSS COMPENSATION</span>{" "}
                  </Tooltip>{" "}
                </th>{" "}
                <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200 max-w-[150px] truncate">
                  {" "}
                  <Tooltip title="DEDUCTIONS:COOP" arrow placement="top">
                    {" "}
                    <span>DEDUCTIONS:COOP</span>{" "}
                  </Tooltip>{" "}
                </th>{" "}
                <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200 max-w-[150px] truncate">
                  {" "}
                  <Tooltip title="TOTAL AMOUNT DUE" arrow placement="top">
                    {" "}
                    <span>TOTAL AMOUNT DUE</span>{" "}
                  </Tooltip>{" "}
                </th>{" "}
                <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200 max-w-[150px] truncate">
                  {" "}
                  <Tooltip title="NO." arrow placement="top">
                    {" "}
                    <span>NO.</span>{" "}
                  </Tooltip>{" "}
                </th>{" "}
                <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200 max-w-[150px] truncate">
                  {" "}
                  <Tooltip title="CHECK NO." arrow placement="top">
                    {" "}
                    <span>CHECK NO.</span>{" "}
                  </Tooltip>{" "}
                </th>{" "}
                <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200 max-w-[150px] truncate">
                  {" "}
                  <Tooltip title="REMARKS" arrow placement="top">
                    {" "}
                    <span>REMARKS</span>{" "}
                  </Tooltip>{" "}
                </th>{" "}
              </tr>{" "}
            </thead>
    </>
  )
}

export default TableHeader
