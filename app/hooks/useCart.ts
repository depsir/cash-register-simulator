import {useApplicationStore } from "~/hooks/applicationStore";
import useCatalog from "~/hooks/useCatalog";
import {useMessages} from "~/hooks/useMessages";

const useCart = () => {
    const [cart, setCart] = useApplicationStore('cart')
    const {catalog} = useCatalog()
    const {addMessage} = useMessages()

    const addProduct = (barcode: string) => {
        const productIndex = cart.findIndex((item: any) => item.barcode === barcode)
        const newCart = [...cart]
        if (productIndex !== -1) {
            newCart[productIndex].quantity++

        } else {
            const product = catalog.find((item: any) => item.barcode === barcode)
            if (product === undefined) {
                addMessage({type: 'error', message: 'Product not found'})
                return console.log('Product not found')
            }

            newCart.push({...product, quantity: 1})
        }
        setCart(newCart)
    }
    const compute = (price:number, quantity:number) => {
        return (((price*100) * (quantity*100))/10000)
    }

    const total = cart.reduce((acc: number, item: any) => {
        return acc + compute(item.price, item.quantity)
    }, 0)

    const emptyCart = () => {
        setCart([])
    }

    return {cart, addProduct, total, emptyCart}

}

export default useCart