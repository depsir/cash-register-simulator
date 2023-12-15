import { useCallback } from 'react';

const useLocalServerIntegration = () => {
    const exit = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:8080/cgi-bin/stop-kiosk.sh');
            alert(response.status + " " + response.statusText);
        } catch(err) {
            alert(err);
        }
    }, []);

    const shutdown = useCallback(async () => {
        try {
            const response = await fetch('http://localhost:8080/cgi-bin/shutdown.sh');
            alert(response.status + " " + response.statusText);
        } catch(err) {
            alert(err);
        }
    }, []);

    return { exit, shutdown };
};

export default useLocalServerIntegration;