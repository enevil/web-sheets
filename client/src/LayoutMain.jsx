import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const LayoutMain = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="MainContainer">
        <Outlet></Outlet>
      </div>
    </>
  );
};

export default LayoutMain;
