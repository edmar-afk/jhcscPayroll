import React from "react";
import Sidebar from "../components/Sidebar";
import PayrollHistoryTable from "../components/staffs/PayrollHistoryTable";
function PayrollHistory() {
  return (
    <div>
      <Sidebar />
      <div className="ml-4 md:ml-72"><PayrollHistoryTable/></div>
    </div>
  );
}

export default PayrollHistory;
