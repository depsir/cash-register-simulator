import React from 'react'
import useApplicationState from "~/hooks/useApplicationState";
import CartPage from "~/pages/CartPage";
import AdminPage from "~/pages/AdminPage";
import PopupMessage from "~/components/PopupMessage";

const Dashboard = () => {
    const {applicationState} = useApplicationState()

    return (
        <div className={"bg-gray-100 h-screen p-2 lg:text-5xl"}>
            <div className={"flex flex-grow justify-around h-full uppercase"}>
                <PopupMessage/>
                {(!applicationState || applicationState == "init") && <CartPage/> }
                {(applicationState == "admin") && <AdminPage/> }

            </div>
        </div>
    )


}

export default Dashboard
