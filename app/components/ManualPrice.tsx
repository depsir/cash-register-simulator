import useNumpad from "~/hooks/useNumpad";
import TextBox from "~/components/TextBox";
import SimpleNumberPad from "~/components/SimpleNumberPad";
import Button from "~/components/Button";
import React from "react";

interface ManualPriceProps {
    onEnter: (value: number) => void;
    onClear: () => void;
}

const ManualPrice: React.FC<ManualPriceProps> = ({onEnter, onClear}) => {
    const {value: manualPrice, onDigit: onManualPriceDigit, onClear: onManualPriceClearInternal} = useNumpad()

    const onManualPriceEnter = () => {
        onEnter(parseFloat(manualPrice))
        onManualPriceClearInternal()
        onClear()
    }

    const onManualPriceClear = () => {
        onManualPriceClearInternal()
        onClear()
    }

    return (
        <>
            <TextBox>{manualPrice}</TextBox>
            <SimpleNumberPad onDigit={onManualPriceDigit}/>
            <Button onClick={onManualPriceEnter} icon={"check"}>enter</Button>
            <Button onClick={onManualPriceClear} icon={"close"}>clear</Button>
        </>
    );
};

export default ManualPrice;