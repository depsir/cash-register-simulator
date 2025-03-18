import {useApplicationStore } from "~/hooks/applicationStore";
import {useMessages} from "~/hooks/useMessages";
import { useFetcher } from "@remix-run/react";
import { useEffect, useRef } from "react";

interface Customer {
    id: string;
    name: string;
    points: number;
    card_number: string;
}

interface FetcherData {
    error?: string;
    id?: string;
    name?: string;
    points?: number;
    card_number?: string;
}

const useCustomerCard = () => {
    const [customerCard, setCustomerCard] = useApplicationStore('customerCard')
    const {addMessage} = useMessages()
    const fetcher = useFetcher<FetcherData>()
    const lastProcessedData = useRef<FetcherData | null>(null);

    useEffect(() => {
        if (fetcher.data && fetcher.state === 'idle' && fetcher.data !== lastProcessedData.current) {
            lastProcessedData.current = fetcher.data;
            
            if (fetcher.data.error) {
                addMessage({ message: fetcher.data.error, type: 'error' });
                setCustomerCard({});
            } else if (fetcher.data.id) {
                setCustomerCard(fetcher.data as Customer);
            }
        }
    }, [fetcher.data, fetcher.state, setCustomerCard, addMessage]);

    const fetchCustomerCard = async (customerCardId: string) => {
        if (fetcher.state === 'submitting') return;
        lastProcessedData.current = null;
        fetcher.submit(
            { cardNumber: customerCardId },
            { method: "POST", action: "/api/customers/fetch" }
        );
    }

    const updatePoints = async (customerId: string, newPoints: number) => {
        if (fetcher.state === 'submitting') return;
        lastProcessedData.current = null;
        fetcher.submit(
            { customerId, newPoints },
            { method: "POST", action: "/api/customers/points" }
        );
    }

    const clearCustomerCard = () => {
        setCustomerCard({})
        lastProcessedData.current = null;
    }

    return {customerCard, fetchCustomerCard, updatePoints, clearCustomerCard}
}

export default useCustomerCard