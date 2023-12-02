import React from 'react'
import useCart from "~/hooks/useCart";
import useApplicationState from "~/hooks/useApplicationState";
import useNumpad from "~/hooks/useNumpad";
import CartPage from "~/pages/CartPage";
import AdminPage from "~/pages/AdminPage";
import PopupMessage from "~/components/PopupMessage";

const Dashboard = () => {
    const {applicationState} = useApplicationState()

    return (
        <div className={"bg-gray-100 h-screen p-2"}>
            <div className={"flex flex-grow justify-around h-full"}>
                <PopupMessage/>
                {(!applicationState || applicationState == "init") && <CartPage/> }
                {(applicationState == "admin") && <AdminPage/> }

            </div>
        </div>
    )


}

export default Dashboard
