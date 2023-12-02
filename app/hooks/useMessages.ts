import {Message, useApplicationStore} from "~/hooks/applicationStore";

export const useMessages = () => {
    const [messages, setMessages] = useApplicationStore("messages")
    const addMessage = (message: Message) => {
        setMessages([...messages, message])
    }

    const deleteFirstMessage = () => {
        const newMessages = [...messages]
        newMessages.shift()
        setMessages(newMessages)
    }
    return {messages, addMessage, deleteFirstMessage}
}
