import React, {useEffect, useRef} from "react";
import useCart from "~/hooks/useCart";
import {compute, formatNumber} from "~/utils/utils";

const CartList = () => {
    const {cart} = useCart([])
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight
        }
    }, [cart])

    const line = (id: string, first: string, second: string | number) => {
        return <div key={id} className={"flex justify-between"}>
            <span>{first}</span>
            <span>{second}</span>
        </div>
    }

    return (
        <div ref={containerRef} className="h-full overflow-auto">
            {cart.map((item: any) => {
                if (item.quantity>1) {
                    return [line(item.barcode + "-quantity", `${item.quantity} x ${formatNumber(item.price)}`, ""), line(item.barcode, item.name, formatNumber(compute(item.price , item.quantity)))]
                } else
                return line(item.barcode, item.name, formatNumber(item.price));
            })}
        </div>
    )
}

export default CartList
