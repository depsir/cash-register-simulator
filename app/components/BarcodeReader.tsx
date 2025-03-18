import React, { useEffect, useRef } from "react";

type Props = {
    onScan: (barcode: string) => void
    active?: boolean
}

const BarcodeReader: React.FC<Props> = ({onScan, active = true}) => {
    const buffer = useRef("");
    const timeout = useRef<NodeJS.Timeout>();
    const lastKeyTime = useRef<number>(0);
    const isProcessing = useRef(false);
    const scannerBuffer = useRef("");

    useEffect(() => {
        if (!active) {
            buffer.current = "";
            scannerBuffer.current = "";
            if (timeout.current) {
                clearTimeout(timeout.current);
            }
            return;
        }

        const handleKeyPress = (event: KeyboardEvent) => {
            // Ignore Enter key
            if (event.key === "Enter") {
                if (scannerBuffer.current && !isProcessing.current) {
                    isProcessing.current = true;
                    onScan(scannerBuffer.current);
                    scannerBuffer.current = "";
                    isProcessing.current = false;
                }
                return;
            }

            const currentTime = Date.now();
            // If more than 100ms have passed since the last key, clear the buffer
            if (currentTime - lastKeyTime.current > 100) {
                scannerBuffer.current = "";
            }
            lastKeyTime.current = currentTime;

            // Clear any existing timeout
            if (timeout.current) {
                clearTimeout(timeout.current);
            }

            // Add the character to the scanner buffer
            scannerBuffer.current += event.key;

            // Set a timeout to clear the buffer if no more characters are received
            timeout.current = setTimeout(() => {
                if (scannerBuffer.current && !isProcessing.current) {
                    isProcessing.current = true;
                    onScan(scannerBuffer.current);
                    scannerBuffer.current = "";
                    isProcessing.current = false;
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