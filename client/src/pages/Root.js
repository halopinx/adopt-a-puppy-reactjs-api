import { Outlet } from "react-router-dom";
import MainNavigation from "../components/layout/MainNavigation";

const RootLayout = () => {
   
    return ( 
        <>
            <MainNavigation />
            <main className="app-main">
                <Outlet />
            </main>
        </>
    );
}
 
export default RootLayout;