import {useEffect} from "react";
import {useApplicationStore} from "~/hooks/applicationStore";
type product = {
    name: string;
    price: number;
    barcode: string;
}
const useCatalog = () => {
    const [catalog, setCatalog] = useApplicationStore("catalog");

    useEffect(() => {
        if (!catalog || catalog.length === 0) {
            fetch("https://parseapi.back4app.com/classes/products", {
                method: "GET",
                headers: {
                    "X-Parse-Application-Id": "LDZJihElZqMmwIGNwGQwTQMxm2SJUsyHVvw6bOuh",
                    "X-Parse-REST-API-Key": "RTKD5XQ8HBJRtGHLD3MBL7TyekcdomBc7s4Tu503"
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Success:", data);
                    setCatalog(data.results);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
    }, []);

    const addProduct = (product: product) => {
        setCatalog([...catalog, product]);
        fetch("https://parseapi.back4app.com/classes/products", {
            method: "POST",
            headers: {
                "X-Parse-Application-Id": "LDZJihElZqMmwIGNwGQwTQMxm2SJUsyHVvw6bOuh",
                "X-Parse-REST-API-Key": "RTKD5XQ8HBJRtGHLD3MBL7TyekcdomBc7s4Tu503",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(product)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
        }


    return {catalog, addProduct};
}

export default useCatalog;
