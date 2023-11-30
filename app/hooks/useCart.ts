import {useApplicationStore} from "~/hooks/applicationStore";
import useCatalog from "~/hooks/useCatalog";

const useCart = () => {
    const [cart, setCart] = useApplicationStore('cart')
    const {catalog} = useCatalog()

    const addProduct = (barcode: string) => {
        const productIndex = cart.findIndex((item: any) => item.barcode === barcode)
        const newCart = [...cart]
        if (productIndex !== -1) {
            newCart[productIndex].quantity++

        } else {
            const product = catalog.find((item: any) => item.barcode === barcode)

            newCart.push({...product, quantity: 1})
        }
        setCart(newCart)
    }

    return {cart, addProduct}

}

export default useCart