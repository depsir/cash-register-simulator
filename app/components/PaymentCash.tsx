import useNumpad from "~/hooks/useNumpad";
import MultiElementTextBox from "~/components/ui/MultiElementTextBox";
import NumberPad from "~/components/ui/NumberPad";
import Button from "~/components/ui/Button";
import React from "react";
import useCart from "~/hooks/useCart";

type PaymentCashProps = {
    onEnter: () => void,
    onClear: () => void,
}

const PaymentCash: React.FC<PaymentCashProps> = ({onEnter, onClear}) => {

    const {total} = useCart([])

    const {value: cash, onDigit: onCashDigit, onClear: onCashClearInternal, onBackspace} = useNumpad()

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
            <NumberPad onDigit={onCashDigit} onBackspace={onBackspace}/>
            <Button onClick={onCashEnter} icon={"check"}>ok</Button>
            <Button onClick={onCashClear} icon={"close"}>indietro</Button>
        </>
    );
};

export default PaymentCash;