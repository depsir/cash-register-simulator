// a component that displays a popup message

import React from 'react'
import {useApplicationStore} from "~/hooks/applicationStore";
import {useMessages} from "~/hooks/useMessages";
import Button from "~/components/Button";


const PopupMessage = () => {
    const {messages, deleteFirstMessage} = useMessages()

    // after three seconds, remove the message
    // React.useEffect(() => {
    //     if (messages && messages.length > 0) {
    //         setTimeout(() => {
    //             deleteFirstMessage()
    //         }, 3000)
    //     }
    // }, [messages])


    if (!messages || messages.length == 0) return null

    return (
        <div className={"fixed top-0 left-0 w-screen h-screen bg-black z-50 bg-opacity-30 flex  m-2 justify-around items-center"}>
            <div className={"bg-white border-2 max-w-[90%] max-h-[80%] min-w-[400px] min-h-[250px] p-2 drop-shadow items-center flex flex-col justify-around"}>
                {<div className={""}>{messages[0].message}</div>}
                <Button onClick={deleteFirstMessage}>OK</Button>
            </div>

        </div>
    )
}

export default PopupMessage