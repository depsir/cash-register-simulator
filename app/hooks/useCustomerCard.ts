import {useApplicationStore } from "~/hooks/applicationStore";
import {useMessages} from "~/hooks/useMessages";
import { useFetcher } from "@remix-run/react";

const useCustomerCard = () => {
    const [customerCard, setCustomerCard] = useApplicationStore('customerCard')
    const {addMessage} = useMessages()
    const fetcher = useFetcher()

    const fetchCustomerCard = async (customerCardId: string) => {
        fetcher.submit(
            { cardNumber: customerCardId },
            { method: "POST", action: "/api/customers/fetch" }
        );
    }

    const updatePoints = async (customerId: string, newPoints: number) => {
        fetcher.submit(
            { customerId, newPoints },
            { method: "POST", action: "/api/customers/points" }
        );
    }

    const clearCustomerCard = () => {
        setCustomerCard({})
    }

    return {customerCard, fetchCustomerCard, updatePoints, clearCustomerCard}
}

export default useCustomerCard