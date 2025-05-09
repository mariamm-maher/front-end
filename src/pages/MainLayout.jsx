import { Outlet } from "react-router-dom";
import Footer from "../components/Home/Footer";
import NavBar from "../components/Home/nav";

function MainLayout() {
  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default MainLayout;
