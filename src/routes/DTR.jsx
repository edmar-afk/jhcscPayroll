import React from 'react'
import Sidebar from '../components/Sidebar'
import DTRTable from '../components/dtr/DTRTable'
function DTR() {
  return (
    <>
      <Sidebar/>
      <div className="ml-4 md:ml-72"><DTRTable/></div>
    </>
  )
}

export default DTR
