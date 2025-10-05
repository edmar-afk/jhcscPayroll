import React, { useEffect, useState } from "react";
import Search from "../dtr/Search";
import api from "../../assets/api";
import ViewDTRModal from "../dtr/ViewDTRModal";
import ViewQrModal from "./ViewQrModal";
function PayrollHistoryTable() {
  const [payrolls, setPayrolls] = useState([]);

  const fetchPayrolls = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      console.log("User Info from localStorage:", userInfo);

      if (!userInfo || !userInfo.id) {
        console.error("User info not found in localStorage");
        return;
      }
      const res = await api.get(`/api/payroll-details/staff/${userInfo.id}/`);
      setPayrolls(res.data);
    } catch (error) {
      console.error("Error fetching payrolls:", error);
    }
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  return (
    <div>
      <div className="overflow-x-auto p-6">
        <div className="flex gap-4 flex-wrap justify-between items-center mb-4">
          <Search />
        </div>

        <table className="min-w-full border border-gray-200">
          <thead className="bg-white whitespace-nowrap">
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
                Name
              </th>
              <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
                DTR Status
              </th>
              <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
                Details
              </th>
               <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
                QR Code
              </th>
              <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
                Release Date
              </th>
            </tr>
          </thead>

          <tbody className="whitespace-nowrap divide-y divide-gray-200">
            {payrolls.length > 0 ? (
              payrolls
                .filter((payroll) => payroll.status === "Released")
                .map((payroll) => (
                  <tr key={payroll.id} className="odd:bg-gray-50">
                    <td className="px-4 py-3 border-r border-gray-200">
                      <p className="text-[13px] text-slate-900 font-medium">
                        {payroll.staff?.first_name}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-[13px] text-slate-900 font-medium border-r border-gray-200">
                      {payroll.status}
                    </td>
                    <td className="px-4 py-3 text-[13px] text-blue-600 font-medium border-r border-gray-200 cursor-pointer">
                      <ViewDTRModal payrollId={payroll.id} />
                    </td>
                     <td className="px-4 py-3 text-[13px] text-blue-600 font-medium border-r border-gray-200 cursor-pointer">
                    <ViewQrModal payrollId={payroll.id}/>
                  </td>
                    <td className="px-4 py-3 text-[13px] text-slate-900 font-medium border-r border-gray-200">
                      {payroll.date_release || "N/A"}
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center text-[13px] text-slate-500 py-4"
                >
                  No payrolls found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PayrollHistoryTable;
