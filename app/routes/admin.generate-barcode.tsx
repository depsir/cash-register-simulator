import React, { useState } from "react";
import Barcode from 'react-barcode';
import Button from "~/components/Button";
import {useNavigate} from "@remix-run/react";

const BarcodeGenerator = () => {
    const [inputText, setInputText] = useState("");
    const navigate = useNavigate();

    return (
        <div>
            <div>
                <Button
                    onClick={() => {
                        navigate('/admin');
                    }}
                    icon='back'
                >
                    indietro
                </Button>
            </div>
            <input value={inputText}
                   onChange={(e) => setInputText(e.target.value)}
                   placeholder="Enter text here to generate barcode"/>
            <div className={"m-2"}>
                <Barcode value={inputText}/>
            </div>
        </div>
    );
};


export default BarcodeGenerator;