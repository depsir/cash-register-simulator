import {useEffect} from "react";
import {useApplicationStore} from "~/hooks/applicationStore";

type addCustomer = {
    name: string;
    cardNumber: string;
}

type customer = addCustomer & {
    objectId: string;
}

const useCustomers = () => {
    const [customers, setCustomers] = useApplicationStore("customers");

    useEffect(() => {
        if (!customers || customers.length === 0) {
            fetch("https://parseapi.back4app.com/classes/customers", {
                method: "GET",
                headers: {
                    "X-Parse-Application-Id": "LDZJihElZqMmwIGNwGQwTQMxm2SJUsyHVvw6bOuh",
                    "X-Parse-REST-API-Key": "RTKD5XQ8HBJRtGHLD3MBL7TyekcdomBc7s4Tu503"
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Success:", data);
                    setCustomers(data.results);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }, []);

    const addCustomer = (customer: addCustomer) => {
        fetch("https://parseapi.back4app.com/classes/customers", {
            method: "POST",
            headers: {
                "X-Parse-Application-Id": "LDZJihElZqMmwIGNwGQwTQMxm2SJUsyHVvw6bOuh",
                "X-Parse-REST-API-Key": "RTKD5XQ8HBJRtGHLD3MBL7TyekcdomBc7s4Tu503",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(response => response.json())
            .then(data => {
                setCustomers([...customers, customer]);
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    const deleteCustomer = (customerId: string) => {
        fetch(`https://parseapi.back4app.com/classes/customers/${customerId}`, {
            method: "DELETE",
            headers: {
                "X-Parse-Application-Id": "LDZJihElZqMmwIGNwGQwTQMxm2SJUsyHVvw6bOuh",
                "X-Parse-REST-API-Key": "RTKD5XQ8HBJRtGHLD3MBL7TyekcdomBc7s4Tu503",
            },
        })
            .then(response => response.json())
            .then(data => {
                // remove customer from customers
                const newCustomers = customers.filter((customer: customer) => customer.objectId !== customerId);
                setCustomers(newCustomers);
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }

    return {customers, addCustomer, deleteCustomer};
}

export default useCustomers;