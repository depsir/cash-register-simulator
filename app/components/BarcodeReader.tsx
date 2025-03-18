import React, { useEffect, useRef } from "react";

type Props = {
    onScan: (barcode: string) => void
    active?: boolean
}

const BarcodeReader: React.FC<Props> = ({onScan, active = true}) => {
    const buffer = useRef("");
    const timeout = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if (!active) {
            buffer.current = "";
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
            return;
        }

        const handleKeyPress = (event: KeyboardEvent) => {
            // Ignore Enter key
            if (event.key === "Enter") {
                if (buffer.current) {
                    onScan(buffer.current);
                    buffer.current = "";
                }
                return;
            }

            // Clear the buffer if it's been too long since the last keypress
            if (timeout.current) {
                clearTimeout(timeout.current);
            }

            // Add the character to the buffer
            buffer.current += event.key;

            // Set a timeout to clear the buffer if no more characters are received
            timeout.current = setTimeout(() => {
                if (buffer.current) {
                    onScan(buffer.current);
                    buffer.current = "";
                }
            }, 100);
        };

        window.addEventListener("keypress", handleKeyPress);
        return () => {
            window.removeEventListener("keypress", handleKeyPress);
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
        };
    }, [onScan, active]);

    return null;
}

export default BarcodeReader;