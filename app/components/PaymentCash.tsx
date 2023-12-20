import useNumpad from "~/hooks/useNumpad";
import MultiElementTextBox from "~/components/MultiElementTextBox";
import SimpleNumberPad from "~/components/SimpleNumberPad";
import Button from "~/components/Button";
import React from "react";
import useCart from "~/hooks/useCart";

type PaymentCashProps = {
    onEnter: () => void,
    onClear: () => void,
}

const PaymentCash: React.FC<PaymentCashProps> = ({onEnter, onClear}) => {

    const {total} = useCart([])

    const {value: cash, onDigit: onCashDigit, onClear: onCashClearInternal} = useNumpad()

    const onCashEnter = () => {
        onCashClearInternal()
        onEnter()
        onClear()
    }

    const onCashClear = () => {
        onCashClearInternal()
        onClear()
    }

    const resto = cash ? Math.max(0, (parseFloat(cash) - total)).toFixed(2) : ""
    return (
        <>
            <MultiElementTextBox>
                <div>{cash}</div>
                <div>resto</div>
                <div>{resto}</div>
            </MultiElementTextBox>
            <SimpleNumberPad onDigit={onCashDigit}/>
            <Button onClick={onCashEnter} icon={"check"}>ok</Button>
            <Button onClick={onCashClear} icon={"close"}>indietro</Button>
        </>
    );
};

export default PaymentCash;