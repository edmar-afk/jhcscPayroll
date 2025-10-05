import React, { useState } from "react";
import QrScannerLib from "react-qr-barcode-scanner";
import api from "../../assets/api";
import Sidebar from "../Sidebar";

function QrScanner() {
  const [data, setData] = useState(null);
  const [payroll, setPayroll] = useState(null);
  const [shares, setShares] = useState(null);
  console.log(payroll);
  const handleScan = async (result) => {
    if (result && result.text && result.text !== data) {
      setData(result.text);

      try {
        const payrollId = result.text.match(/\d+/)?.[0];
        if (payrollId) {
          const res = await api.get(`/api/payrolls/${payrollId}/`);
          setPayroll(res.data);

          const shareRes = await api.get(
            `/api/payroll/${payrollId}/government-shares/`
          );
          setShares(shareRes.data);
        }
      } catch (err) {
        console.error("Failed to fetch payroll or shares", err);
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)
      .toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", "")
      .replace(" ", ". ");
  };

  const formatNumber = (num) => {
    return Number(num).toLocaleString();
  };

  const totalAfterDeductions =
    payroll && shares
      ? Number(payroll.fixed_rate || 0) -
        (Number(shares.gsis || 0) + Number(shares.sss || 0))
      : null;

  return (
    <>
      <Sidebar />
      <div className="flex flex-col items-center justify-center p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          📷 Scan Payroll QR
        </h2>

        <div className="relative w-72 h-72 border-4 border-blue-500 rounded-xl overflow-hidden shadow-lg">
          <QrScannerLib
            onUpdate={(err, result) => {
              if (result) {
                handleScan(result);
              }
            }}
          />
          <div className="absolute inset-0">
            <div className="w-full h-1 bg-blue-500 animate-scan" />
          </div>
        </div>

        {payroll && (
          <div className="mt-6 w-full max-w-lg bg-white rounded-2xl shadow-md p-6">
            <div className=" mb-4 border-b pb-2">
              <h3 className="text-lg font-semibold text-gray-700">
                Payroll Details
              </h3>
              <p className="text-xs text-gray-500">{payroll.staff.first_name}</p>
            </div>
            <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
              {/* <span className="font-medium">ID:</span> <span>{payroll.id}</span>
              <span className="font-medium">Payroll No:</span>{" "}
              <span>{payroll.payroll_no}</span> */}
              <span className="font-medium">Salary:</span>{" "}
              <span>
                ₱
                {payroll.fixed_rate
                  ? Number(payroll.fixed_rate).toLocaleString()
                  : "0"}
              </span>
              {/* <span className="font-medium">Salary Adjustment:</span>{" "}
              <span>{payroll.salary_adjustment}</span>
              <span className="font-medium">Salary After Adjustment:</span>{" "}
              <span>{payroll.salary_after_adjustment}</span>
              <span className="font-medium">Overtime Pay:</span>{" "}
              <span>{payroll.overtime_pay}</span>
              <span className="font-medium">Total Salary Overtime:</span>{" "}
              <span>{payroll.total_salary_overtime}</span>
              <span className="font-medium">Absent:</span>{" "}
              <span>{payroll.absent}</span>
              <span className="font-medium">Late:</span>{" "}
              <span>{payroll.late}</span>
              <span className="font-medium">Deductions:</span>{" "}
              <span>{payroll.deductions}</span>
              <span className="font-medium">Total Amount Due:</span>{" "}
              <span>{payroll.total_amount_due}</span>
              <span className="font-medium">Check No:</span>{" "}
              <span>{payroll.check_no}</span>
              <span className="font-medium">Remarks:</span>{" "}
              <span>{payroll.remarks}</span>
              <span className="font-medium">Gross Compensation:</span>{" "}
              <span>{payroll.gross_compensation}</span>
              <span className="font-medium">Date Prepared:</span>{" "}
              <span>{payroll.date_prepared}</span> */}
              <span className="font-medium">Date Release:</span>{" "}
              <span>{formatDate(payroll.date_release)}</span>
            </div>

            {shares && (
              <div className="mt-4 pt-4 border-t border-dashed border-gray-300">
                <h4 className="text-md font-semibold text-gray-700 mb-2">
                  Government Shares
                </h4>
                <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                  <span className="font-medium">GSIS:</span>
                  <span>₱{formatNumber(shares.gsis || 0)}</span>

                  <span className="font-medium">SSS:</span>
                  <span>₱{formatNumber(shares.sss || 0)}</span>

                  <span className="font-medium mt-2 border-t border-dashed pt-2 col-span-2 text-gray-800">
                    Total After Deductions:
                  </span>
                  <span className="col-span-2 text-green-700 font-semibold">
                    ₱
                    {totalAfterDeductions
                      ? formatNumber(totalAfterDeductions)
                      : "0"}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default QrScanner;
