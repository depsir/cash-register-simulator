import React from 'react'
import PopupMessage from "~/components/PopupMessage";
import {Outlet} from "@remix-run/react";

const App = () => {
    return (
        <div className="h-full p-2 lg:text-5xl">
            <div className="flex flex-grow justify-around h-full uppercase">
                <PopupMessage/>
                <Outlet />
            </div>
        </div>
    )
}

export default App
