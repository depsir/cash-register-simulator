import {useApplicationState} from "~/hooks/applicationState";

const CartList = () => {
    const {state} = useApplicationState()
    console.log(state)
    return (
        <div>
            <ul>
                {state.cart.map((item: any) => <li>{item.name} - {item.price}</li>)}
            </ul>
        </div>
    )

}

export default CartList
