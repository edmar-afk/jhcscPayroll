import React from 'react'
import Sidebar from '../components/Sidebar'
import PayrollTable from '../components/dtr/PayrollTable'
function PayrollList() {
  return (
    <div>
      <Sidebar />
      <div className="ml-4 md:ml-72"><PayrollTable/></div>
    </div>
  )
}

export default PayrollList
