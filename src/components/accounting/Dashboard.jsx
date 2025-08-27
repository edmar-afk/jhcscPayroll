import Sidebar from "../Sidebar";
import Stats from "../Stats";

function Dashboard() {
  return (
    <>
      <Sidebar />
      <div className="ml-4 md:ml-72">
        <Stats />
      </div>
    </>
  );
}

export default Dashboard;
