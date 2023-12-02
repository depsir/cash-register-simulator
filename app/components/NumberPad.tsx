import React from 'react'
import Button, {Variant} from "~/components/Button";

type Props = {
    onDigit: (digit: string) => void
    onEnter: () => void
    onClear: () => void

}
const NumberPad = ({onDigit, onEnter, onClear}: Props) => {
    return (
        <div className={"flex-col"}>
            <div className={"flex"}>
                <Button variant={Variant.FULL} onClick={()=> onDigit("1")}>1</Button>
                <Button variant={Variant.FULL} onClick={()=> onDigit("2")}>2</Button>
                <Button variant={Variant.FULL} onClick={()=> onDigit("3")}>3</Button>
            </div>
            <div className={"flex"}>
                <Button variant={Variant.FULL} onClick={()=> onDigit("4")}>4</Button>
                <Button variant={Variant.FULL} onClick={()=> onDigit("5")}>5</Button>
                <Button variant={Variant.FULL} onClick={()=> onDigit("6")}>6</Button>
            </div>
            <div className={"flex"}>
                <Button variant={Variant.FULL} onClick={()=> onDigit("7")}>7</Button>
                <Button variant={Variant.FULL} onClick={()=> onDigit("8")}>8</Button>
                <Button variant={Variant.FULL} onClick={()=> onDigit("9")}>9</Button>
            </div>
            <div className={"flex"}>
                <Button variant={Variant.FULL} onClick={()=> onClear()}>Clear</Button>
                <Button variant={Variant.FULL} onClick={()=> onDigit("0")}>0</Button>
                <Button variant={Variant.FULL} onClick={()=> onDigit(".")}>.</Button>
            </div>
            <div className={"flex"}>
                <Button variant={Variant.FULL} onClick={()=> onEnter()}>Enter</Button>
            </div>
        </div>
    )
}

export default NumberPad