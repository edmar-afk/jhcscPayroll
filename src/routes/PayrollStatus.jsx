import React from "react";
import Sidebar from "../components/Sidebar";
import PayrollStatusTable from "../components/staffs/PayrollStatusTable";
function PayrollStatus() {
  return (
    <div>
      <Sidebar />
      <div className="ml-4 md:ml-72"><PayrollStatusTable/></div>
    </div>
  );
}

export default PayrollStatus;
