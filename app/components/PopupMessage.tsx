// a component that displays a popup message

import React from 'react'
import {useApplicationStore} from "~/hooks/applicationStore";
import {useMessages} from "~/hooks/useMessages";


const PopupMessage = () => {
    const {messages, deleteFirstMessage} = useMessages()

    // after three seconds, remove the message
    React.useEffect(() => {
        if (messages && messages.length > 0) {
            setTimeout(() => {
                deleteFirstMessage()
            }, 3000)
        }
    }, [messages])


    if (!messages || messages.length == 0) return null

    return (
        <div className={"fixed top-0 left-0 w-screen h-screen bg-black z-50 opacity-30"}>
            <div className={"flex h-full m-2 justify-around items-center"}>
                {<div className={"bg-white border-2 w-[500px] h-[300px] p-2 drop-shadow"}>{messages[0].message}</div>}
            </div>

        </div>
    )
}

export default PopupMessage