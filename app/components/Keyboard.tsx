
// a component that renders a keyboard

import React from 'react';
import Button, {Variant} from './Button';

type Props = {
    onDigit: (digit: string) => void
}

const Keyboard = ({onDigit, }: Props) => {
    return (
        <div className={"flex-col"}>
            <div className={"flex"}>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("q")}>q</Button>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("w")}>w</Button>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("e")}>e</Button>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("r")}>r</Button>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("t")}>t</Button>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("y")}>y</Button>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("u")}>u</Button>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("i")}>i</Button>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("o")}>o</Button>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("p")}>p</Button>
            </div>
            <div className={"flex"}>
                <div className={"w-8"}></div>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("a")}>a</Button>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("s")}>s</Button>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("d")}>d</Button>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("f")}>f</Button>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("g")}>g</Button>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("h")}>h</Button>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("j")}>j</Button>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("k")}>k</Button>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("l")}>l</Button>
            </div>
            <div className={"flex"}>
                <div className={"w-16"}></div>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("z")}>z</Button>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("x")}>x</Button>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("c")}>c</Button>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("v")}>v</Button>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("b")}>b</Button>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("n")}>n</Button>
                <Button variant={Variant.SQUARE} onClick={()=> onDigit("m")}>m</Button>
            </div>
            <div className={"flex"}>
                <div className={"ml-2"}></div>
                <Button variant={Variant.FULL} onClick={()=> onDigit(" ")}> </Button>
                </div>

        </div>
    )
}

export default Keyboard