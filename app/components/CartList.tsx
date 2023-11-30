import {useApplicationStore} from "~/hooks/applicationStore";
import useCart from "~/hooks/useCart";

const CartList = () => {
    const {cart } = useCart()
    return (
        <div>
            <ul>
                {cart.map((item: any) => <li>{item.name} - {item.price} - {item.quantity}</li>)}
            </ul>
        </div>
    )

}

export default CartList
