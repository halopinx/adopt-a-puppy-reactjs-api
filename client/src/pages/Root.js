import { useState } from "react";
import { Outlet } from "react-router-dom";
import MainNavigation from "../components/layout/MainNavigation";
import FormContext from '../store/form-context'

const RootLayout = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    return ( 
        <FormContext.Provider value={{ isSubmitted, setIsSubmitted }}>
            <MainNavigation />
            <main className="app-main">
                <Outlet />
            </main>
        </FormContext.Provider>
    );
}
 
export default RootLayout;