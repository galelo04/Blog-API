import AppHeader from "./AppHeader";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const MainLayout = ( ) => {
    return (
    <div className="mainLayout flex flex-col ">
      <header>
        <AppHeader></AppHeader>
      </header>
      <main className="p-5">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
}

export default MainLayout;