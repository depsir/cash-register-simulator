import {useApplicationStore} from "~/hooks/applicationStore";
import useCart from "~/hooks/useCart";

const CartList = () => {
    const {cart } = useCart()
    const line = (first: string, second: string) => {
        return <div className={"flex justify-between"}>
            <span>{first}</span>
            <span>{second}</span>
        </div>
    }

    const compute = (price:number, quantity:number) => {
        return (((price*100) * (quantity*100))/10000).toFixed(2)

    }
    return (
        <div>
            {cart.map((item: any) => {
                if (item.quantity>1) {
                    return [line(`${item.quantity} x ${item.price}`, ""), line(item.name, compute(item.price , item.quantity))]
                } else
                return line(item.name, item.price);
            })}
        </div>
    )

}

export default CartList
