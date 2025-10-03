import React, { useEffect, useState } from "react";
import Search from "./Search";
import Filter from "./Filter";
import api from "../../assets/api";
import { Button } from "@mui/material";
import PayrollEditModal from "../cashier/PayrollEditModal";
import ViewDTRModal from "./ViewDTRModal";

function PayrollTable() {
  const [payrolls, setPayrolls] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState(null);

  const fetchPayrolls = async () => {
    try {
      const res = await api.get("/api/payrolls/");
      setPayrolls(res.data);
    } catch (error) {
      console.error("Error fetching payrolls:", error);
    }
  };

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const handleOpen = (payroll) => {
    setSelectedPayroll(payroll);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPayroll(null);
  };

  return (
    <>
      <div className="overflow-x-auto p-6">
        <div className="flex gap-4 flex-wrap justify-between items-center mb-4">
          <Search />
          {/* <Filter /> */}
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
                Release Date
              </th>
              <th className="px-4 py-3 text-left text-[13px] font-medium text-slate-600 border-r border-gray-200">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="whitespace-nowrap divide-y divide-gray-200">
            {payrolls.length > 0 ? (
              payrolls.map((payroll) => (
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
                   <ViewDTRModal payrollId={payroll.id}/>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-slate-900 font-medium border-r border-gray-200">
                    {payroll.date_release || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-[13px] text-slate-600 font-medium border-r border-gray-200">
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleOpen(payroll)}
                    >
                      Edit
                    </Button>
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

      <PayrollEditModal
        open={open}
        handleClose={handleClose}
        payroll={selectedPayroll}
        refresh={fetchPayrolls}
      />
    </>
  );
}

export default PayrollTable;
