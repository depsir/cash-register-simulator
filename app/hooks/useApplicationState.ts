import {useApplicationStore} from "~/hooks/applicationStore";

type ApplicationState = "init" | "manual-barcode" | "checkout" | "payment-cash";
const useApplicationState = () => {
    const [applicationState, set] = useApplicationStore("state");

    const setApplicationState = (state: ApplicationState) => {
        set(state);
    }

    return {applicationState, setApplicationState};

}

export default useApplicationState;