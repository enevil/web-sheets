import Sidebar from "./components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import { withAuth } from "./components/hoc/withAuth";

const LayoutSecondary = () => {
  return (
    <>
      <div className="MainContainer csContainer">
        <Sidebar></Sidebar>
        <Outlet />
      </div>
    </>
  );
};

export default withAuth(LayoutSecondary);
