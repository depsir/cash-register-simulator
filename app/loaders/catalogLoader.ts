import {json} from "@remix-run/node";

export const loadCatalog = async () => {
    return fetch("https://parseapi.back4app.com/classes/products", {
        method: "GET",
        headers: {
            "X-Parse-Application-Id": "LDZJihElZqMmwIGNwGQwTQMxm2SJUsyHVvw6bOuh",
            "X-Parse-REST-API-Key": "RTKD5XQ8HBJRtGHLD3MBL7TyekcdomBc7s4Tu503"
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log("Success:", data);
            return json(data.results)
        })
        .catch((error) => {
            console.error("Error:", error);
        });

}