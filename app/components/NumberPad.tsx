import React from 'react'
import Button from "~/components/Button";

type Props = {
    onDigit: (digit: string) => void
    onEnter: () => void
    onClear: () => void

}
const NumberPad = ({onDigit, onEnter, onClear}: Props) => {
    return (
        <div className={"flex-col"}>
            <div className={"flex"}>
                <Button onClick={()=> onDigit("1")}>1</Button>
                <Button onClick={()=> onDigit("2")}>2</Button>
                <Button onClick={()=> onDigit("3")}>3</Button>
            </div>
            <div className={"flex"}>
                <Button onClick={()=> onDigit("4")}>4</Button>
                <Button onClick={()=> onDigit("5")}>5</Button>
                <Button onClick={()=> onDigit("6")}>6</Button>
            </div>
            <div className={"flex"}>
                <Button onClick={()=> onDigit("7")}>7</Button>
                <Button onClick={()=> onDigit("8")}>8</Button>
                <Button onClick={()=> onDigit("9")}>9</Button>
            </div>
            <div className={"flex"}>
                <Button onClick={()=> onClear()}>Clear</Button>
                <Button onClick={()=> onDigit("0")}>0</Button>
                <Button onClick={()=> onDigit(".")}>.</Button>
            </div>
            <div className={"flex"}>
                <Button onClick={()=> onEnter()}>Enter</Button>
            </div>
        </div>
    )
}

export default NumberPad