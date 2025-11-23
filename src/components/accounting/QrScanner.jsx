import React, { useState } from "react";
import QrScannerLib from "react-qr-barcode-scanner";
import api from "../../assets/api";
import Sidebar from "../Sidebar";
import logo from "../../assets/logo.png";
import EditDtrModal from "../EditDtrModal";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { getUserInfoFromToken } from "../../utils/auth";
function QrScanner() {
  const [data, setData] = useState(null);
  const [payroll, setPayroll] = useState(null);
  const [statusData, setStatusData] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("userInfo");
  const userInfo = getUserInfoFromToken(token);
  console.log(userInfo);

  const handleScan = async (result) => {
    if (result && result.text && result.text !== data) {
      setData(result.text);

      try {
        const payrollId = result.text.match(/\d+/)?.[0];
        if (payrollId) {
          const res = await api.get(`/api/payrolls/${payrollId}/`);
          setPayroll(res.data);

          const statusRes = await api.get(
            `/api/payroll/${res.data.id}/status/`
          );
          setStatusData(statusRes.data);

          setError("");
        }
      } catch (err) {
        setError("No status found for this payroll");
        setStatusData(null);
      }
    }
  };

  const formatNumber = (num) => (num ? Number(num).toLocaleString() : "0");

  return (
    <>
      <Sidebar />

      <div className="p-6 mt-20 lg:mt-4 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          📷 Scan Payroll QR
        </h2>

        <div
          className={`flex w-full gap-6 flex-wrap
    ${
      payroll
        ? "md:flex-row md:items-start justify-center"
        : "flex-col items-center justify-center"
    }
  `}
        >
          <div className="flex flex-col gap-4">
            <div className="relative w-96 h-full border-4 border-blue-500 rounded-none lg:rounded-xl overflow-hidden shadow-lg flex-shrink-0 flex items-center justify-center">
              <QrScannerLib
                onUpdate={(err, result) => {
                  if (result) handleScan(result);
                }}
              />
              <div className="inset-0">
                <div className="w-full h-1 animate-scan" />
              </div>
            </div>
            {payroll && (
              <div className="flex flex-row flex-wrap items-center gap-4 justify-center lg:justify-between px-2">
                {[
                  "cashier",
                  "budgetoffice",
                  "hroffice",
                  "presidentoffice",
                ].includes(userInfo.username) && (
                  <EditDtrModal payrollId={payroll.id} isScanner={true} />
                )}
                {![
                  "cashier",
                  "budgetoffice",
                  "hroffice",
                  "presidentoffice",
                ].includes(userInfo.username) && (
                  <p
                    className="text-lg bg-blue-600 text-white py-2 px-4 rounded-lg w-fit cursor-pointer flex items-center gap-2"
                    onClick={() =>
                      window.open(
                        `${api.defaults.baseURL}/api/payrolls/${payroll.id}/download/`,
                        "_blank"
                      )
                    }
                  >
                    <PictureAsPdfIcon /> Download Payroll
                  </p>
                )}
              </div>
            )}
          </div>
          {payroll && (
            <div className="w-full md:max-w-lg bg-white rounded-2xl shadow-md p-6 flex-grow mt-20 lg:mt-0">
              <div className="mb-4 border-b pb-2 flex flex-row items-center justify-between">
                <div className="">
                  {" "}
                  <h3 className="text-lg font-semibold text-gray-700">
                    Payroll Details
                  </h3>
                  <p className="text-xs text-gray-500">
                    {payroll.staff.first_name}
                  </p>{" "}
                </div>
                <img src={logo} className="w-12" alt="" />
              </div>

              <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                <span className="font-medium">Salary:</span>
                <span>₱{formatNumber(payroll.salary)}</span>

                <span className="font-medium">Add: PERA / ACA:</span>
                <span>₱{formatNumber(payroll.pera_aca)}</span>

                <span className="font-medium">Gross Monthly Income:</span>
                <span>₱{formatNumber(payroll.monthly_income)}</span>

                <span className="font-medium">PAYSLIP for the Month:</span>
                <span>{payroll.date_release}</span>
              </div>

              <div className="mt-4 pt-4 border-t border-dashed border-gray-300">
                <h4 className="text-md font-semibold text-gray-700 mb-2">
                  Government Shares & Deductions
                </h4>

                <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-600">
                  <span className="font-medium">GSIS / Personal Share:</span>
                  <span>₱{formatNumber(payroll.gsis_personal_share)}</span>

                  <span className="font-medium">GSIS / Consolidated Loan:</span>
                  <span>₱{formatNumber(payroll.gsis_consolidated_loan)}</span>

                  <span className="font-medium">GSIS / MPL:</span>
                  <span>₱{formatNumber(payroll.gsis_mpl)}</span>

                  <span className="font-medium">GSIS / EDUC. ASST. LOAN:</span>
                  <span>₱{formatNumber(payroll.gsis_educ)}</span>

                  <span className="font-medium">GSIS / EMERGENCY LOAN:</span>
                  <span>₱{formatNumber(payroll.gsis_emergency)}</span>

                  <span className="font-medium">PHIC:</span>
                  <span>₱{formatNumber(payroll.phic)}</span>

                  <span className="font-medium">HDMF / PERSONAL SHARE:</span>
                  <span>₱{formatNumber(payroll.hdmf_personal_share)}</span>

                  <span className="font-medium">HDMF / SALARY LOAN:</span>
                  <span>₱{formatNumber(payroll.hdmf_salary_load)}</span>

                  <span className="font-medium">FFASA:</span>
                  <span>₱{formatNumber(payroll.ffasa)}</span>

                  <span className="font-medium">1ST Valley Bank Loan:</span>
                  <span>₱{formatNumber(payroll.valley_bank_load)}</span>

                  <span className="font-medium">HDMF / MPL:</span>
                  <span>₱{formatNumber(payroll.hdmf_mpl)}</span>

                  <span className="font-medium">BIR:</span>
                  <span>₱{formatNumber(payroll.bir)}</span>

                  <span className="font-medium">Date:</span>
                  <span>{payroll.date}</span>

                  <span className="col-span-2 mt-2 border-t pt-2 font-bold text-gray-800">
                    TOTAL DEDUCTIONS: ₱{formatNumber(payroll.total_deductions)}
                  </span>

                  <span className="col-span-2 font-bold text-green-700 text-lg">
                    Net MONTHLY INCOME: ₱
                    {formatNumber(payroll.net_monthly_income)}
                  </span>
                </div>
              </div>

              {statusData && (
                <div className="mt-6">
                  <h4 className="text-md font-semibold text-gray-700 mb-4 text-center">
                    Payroll Status
                  </h4>

                  <div className="space-y-4">
                    {Object.entries(statusData).map(([key, value]) => (
                      <div key={key} className="border-b-2 border-dashed pb-2">
                        <p className="font-extrabold text-blue-800">
                          {key.toUpperCase()}
                        </p>
                        <p>Status: {value || "Pending"}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {error && <p className="text-center text-gray-500 mt-4">{error}</p>}
      </div>
    </>
  );
}

export default QrScanner;
