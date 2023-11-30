import {useEffect} from "react";
import {useApplicationState} from "~/hooks/applicationState";

const useCatalog = () => {
    const {state, setCatalog} = useApplicationState();

    useEffect(() => {
        if (!state.catalog || state.catalog.length === 0) {
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

}

export default useCatalog;
