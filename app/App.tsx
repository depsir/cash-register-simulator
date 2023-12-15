import React from 'react'
import PopupMessage from "~/components/PopupMessage";
import {Outlet} from "@remix-run/react";

const App = () => {
    return (
        <div className={"bg-gray-100 h-screen p-2 lg:text-5xl"}>
            <div className={"flex flex-grow justify-around h-full uppercase"}>
                <PopupMessage/>
                <Outlet />
            </div>
        </div>
    )


}

export default App
