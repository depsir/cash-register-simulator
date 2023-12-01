import {useApplicationStore} from "~/hooks/applicationStore";
import useCart from "~/hooks/useCart";
import {compute, formatNumber} from "~/utils/utils";

const CartList = () => {
    const {cart } = useCart()
    const line = (first: string, second: string | number) => {
        return <div className={"flex justify-between"}>
            <span>{first}</span>
            <span>{second}</span>
        </div>
    }

    return (
        <div>
            {cart.map((item: any) => {
                if (item.quantity>1) {
                    return [line(`${item.quantity} x ${formatNumber(item.price)}`, ""), line(item.name, formatNumber(compute(item.price , item.quantity)))]
                } else
                return line(item.name, formatNumber(item.price));
            })}
        </div>
    )

}

export default CartList
