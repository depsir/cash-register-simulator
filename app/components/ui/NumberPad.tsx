import React from 'react'
import Button, {Variant} from "~/components/ui/Button";

type Props = {
    onDigit: (digit: string) => void
    onBackspace: () => void
}
const NumberPad = ({onDigit, onBackspace}: Props) => {
    return (
        <div className={"grid grid-cols-3"}>
            <Button variant={Variant.FULL} onClick={()=> onDigit("1")}>1</Button>
            <Button variant={Variant.FULL} onClick={()=> onDigit("2")}>2</Button>
            <Button variant={Variant.FULL} onClick={()=> onDigit("3")}>3</Button>

            <Button variant={Variant.FULL} onClick={()=> onDigit("4")}>4</Button>
            <Button variant={Variant.FULL} onClick={()=> onDigit("5")}>5</Button>
            <Button variant={Variant.FULL} onClick={()=> onDigit("6")}>6</Button>

            <Button variant={Variant.FULL} onClick={()=> onDigit("7")}>7</Button>
            <Button variant={Variant.FULL} onClick={()=> onDigit("8")}>8</Button>
            <Button variant={Variant.FULL} onClick={()=> onDigit("9")}>9</Button>

            <Button variant={Variant.FULL} onClick={()=> onDigit("0")}>0</Button>
            <Button variant={Variant.FULL} onClick={()=> onDigit(".")}>.</Button>
            <Button variant={Variant.FULL} onClick={()=> onBackspace()} icon={"backspace"}></Button>
        </div>
    )
}

export default NumberPad