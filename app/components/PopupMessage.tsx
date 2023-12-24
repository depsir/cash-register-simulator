import React from 'react'
import { useApplicationStore } from "~/hooks/applicationStore";
import { useMessages } from "~/hooks/useMessages";
import Button from "~/components/Button";
import Popup from './Popup';


const PopupMessage = () => {
    const { messages, deleteFirstMessage } = useMessages()

    if (!messages || messages.length == 0) return null

    return (
        <Popup>
            {<div className={""}>{messages[0].message}</div>}
            <Button onClick={deleteFirstMessage}>OK</Button>
        </Popup >
    )
}

export default PopupMessage