import {useApplicationStore} from "~/hooks/applicationStore";

type ApplicationState = "init" | "admin";
const useApplicationState = () => {
    const [applicationState, set] = useApplicationStore("state");

    const setApplicationState = (state: ApplicationState) => {
        set(state);
    }

    return {applicationState, setApplicationState};

}

export default useApplicationState;