import {useApplicationStore } from "~/hooks/applicationStore";
import {useMessages} from "~/hooks/useMessages";
import {json} from "@remix-run/node";

const useCustomerCard = () => {
    const [customerCard, setCustomerCard] = useApplicationStore('customerCard')
    const {addMessage} = useMessages()


    const fetchCustomerCard = async (customerCardId: string) => {
        return fetch("https://parseapi.back4app.com/classes/customers?where=%7B%20%22cardNumber%22%3A%22"+customerCardId+"%22%20%7D", {
            method: "GET",
            headers: {
                "X-Parse-Application-Id": "LDZJihElZqMmwIGNwGQwTQMxm2SJUsyHVvw6bOuh",
                "X-Parse-REST-API-Key": "RTKD5XQ8HBJRtGHLD3MBL7TyekcdomBc7s4Tu503"
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log("Success:", data);
                const results = data.results
                if (results.length === 0) {
                    addMessage({type: 'error', message: 'cliente non trovato'})
                    return console.log('Customer not found')
                }
                if (results.length > 1) {
                    addMessage({type: 'error', message: 'trovati più clienti con lo stesso codice'})
                    return console.log('Customer not found')
                }
                setCustomerCard(data.results[0])
            })
            .catch((error) => {
                console.error("Error:", error);
            });

    }

    const updatePoints = async (customerId: string, newPoints: number) => {
        const updatedCustomer = {name:customerCard.name, cardNumber: customerCard.cardNumber, points: (customerCard.points||0) + newPoints}
        return fetch("https://parseapi.back4app.com/classes/customers/"+customerId, {
            method: "PUT",
            headers: {
                "X-Parse-Application-Id": "LDZJihElZqMmwIGNwGQwTQMxm2SJUsyHVvw6bOuh",
                "X-Parse-REST-API-Key": "RTKD5XQ8HBJRtGHLD3MBL7TyekcdomBc7s4Tu503",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedCustomer)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

    }

    const clearCustomerCard = () => {
        setCustomerCard({})
    }


    return {customerCard, fetchCustomerCard, updatePoints, clearCustomerCard}
}

export default useCustomerCard