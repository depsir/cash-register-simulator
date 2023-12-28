import {json} from "@remix-run/node";

export type Product = {
    barcode: string;
    name: string;
    price: number;
    objectId: string;
}

export type Catalog = Product[]

export const loadCatalog = async () => {
    return fetch("https://parseapi.back4app.com/classes/products?limit=10000", {
        method: "GET",
        headers: {
            "X-Parse-Application-Id": "LDZJihElZqMmwIGNwGQwTQMxm2SJUsyHVvw6bOuh",
            "X-Parse-REST-API-Key": "RTKD5XQ8HBJRtGHLD3MBL7TyekcdomBc7s4Tu503"
        }
    })
        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log("Success:", data);
            return json(data.results.sort((a: Product, b: Product) => a.name.localeCompare(b.name)))
        })
        .catch((error) => {
            console.error("Error:", error);
        });

}