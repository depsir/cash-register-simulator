import useNumpad from "~/hooks/useNumpad";
import TextBox from "~/components/TextBox";
import SimpleNumberPad from "~/components/SimpleNumberPad";
import Button from "~/components/Button";
import React from "react";

type ManualBarcodeProps = {
  onEnter: (value: string) => void;
  onClear: () => void;
};

export const ManualBarcode = ({onEnter, onClear}: ManualBarcodeProps) => {
    const {value: manualBarcode, onDigit: onManualBarcodeDigit, onClear: onManualBarcodeClearInternal} = useNumpad()

    const onManualBarcodeEnter = () => {
        onEnter(manualBarcode)
        onManualBarcodeClearInternal()
        onClear()
    }

    const onManualBarcodeClear = () => {
        onManualBarcodeClearInternal()
        onClear()
    }

    return (
        <>
            <TextBox>{manualBarcode}</TextBox>
            <SimpleNumberPad onDigit={onManualBarcodeDigit}/>
            <Button onClick={onManualBarcodeEnter} icon={"check"}>enter</Button>
            <Button onClick={onManualBarcodeClear} icon={"close"}>clear</Button>
        </>
    );
};