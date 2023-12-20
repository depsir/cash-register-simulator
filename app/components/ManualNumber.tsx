import useNumpad from "~/hooks/useNumpad";
import TextBox from "~/components/TextBox";
import NumberPad from "~/components/NumberPad";
import Button from "~/components/Button";
import React from "react";
import BarcodeReader from "~/components/BarcodeReader";

interface ManualPriceProps {
    onEnter: (value: string) => void;
    onClear: () => void;
    allowBarcode?: boolean;
}

const ManualNumber: React.FC<ManualPriceProps> = ({onEnter, onClear, allowBarcode}) => {
    const {value: manualPrice, onDigit: onManualPriceDigit, onClear: onManualPriceClearInternal, onBackspace} = useNumpad()

    const onManualPriceEnter = () => {
        if (manualPrice) {
            onEnter(manualPrice)
        }
        onManualPriceClearInternal()
        onClear()
    }

    const onManualPriceClear = () => {
        onManualPriceClearInternal()
        onClear()
    }

    const title = "Inserisci numero"
    const titleWithBarcode = "passa barcode o inserisci numero"
    return (
        <>
            <div className={"p-2"}>{allowBarcode ? titleWithBarcode : title}</div>
            {allowBarcode && <BarcodeReader onScan={onEnter}/>}
            <TextBox>{manualPrice}</TextBox>
            <NumberPad onDigit={onManualPriceDigit} onBackspace={onBackspace}/>
            <Button onClick={onManualPriceEnter} icon={"check"}>conferma</Button>
            <Button onClick={onManualPriceClear} icon={"close"}>annulla</Button>
        </>
    );
};

export default ManualNumber;