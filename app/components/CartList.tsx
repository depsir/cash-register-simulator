import useCart from "~/hooks/useCart";
import {compute, formatNumber} from "~/utils/utils";
import React from "react";

const CartList = () => {
    const {cart } = useCart([])
    const line = (id: string, first: string, second: string | number) => {
        return <div key={id} className={"flex justify-between"}>
            <span>{first}</span>
            <span>{second}</span>
        </div>
    }

    return (
        <div>
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
