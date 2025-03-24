import React from 'react';
import {useNavigate} from "@remix-run/react";
import Button from "~/components/ui/Button";
import BarcodeReader from "~/components/BarcodeReader";

export default function TestBarcode() {
    const navigate = useNavigate();
    const [testBarcode, setTestBarcode] = React.useState("scansiona un barcode, apparirà qui");

    return (
        <div className={"flex flex-col h-full"}>
            <BarcodeReader
                onScan={(barcode: string) => setTestBarcode(barcode)}
            />
            <div className={"border-2 w-[500px] h-[200px] flex justify-center items-center"}>{testBarcode}</div>
            <div>
                <Button onClick={() => {
                    navigate("/admin")
                }} icon={"back"}>
                    indietro
                </Button>
            </div>
        </div>
    );
}