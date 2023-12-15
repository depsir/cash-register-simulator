import React, { useState } from 'react';
import BarcodeReader from 'react-barcode-reader';
import {useNavigate} from "@remix-run/react";
import Button from "~/components/Button";

export default function TestBarcode() {
    const navigate = useNavigate();
    const [testBarcode, setTestBarcode] = React.useState("scan a barcode. it appears here");

    return (
        <div className={"flex flex-col h-full"}>
            <BarcodeReader
                onError={(err) => console.error(err)}
                onScan={(barcode: string) => setTestBarcode(barcode)}
            />
            <div>{testBarcode}</div>
            <div>
                <Button onClick={() => {
                    navigate("/admin")
                }}>
                    back
                </Button>
            </div>
        </div>
    );
}