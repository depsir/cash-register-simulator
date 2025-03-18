import {useApplicationStore } from "~/hooks/applicationStore";
import {useMessages} from "~/hooks/useMessages";

const useCart = (catalog: any) => {
    const [cart, setCart] = useApplicationStore('cart')
    const {addMessage} = useMessages()

    const addProduct = (barcode: string) => {
        const productIndex = cart.findIndex((item: any) => item.barcode === barcode)
        const newCart = [...cart]
        if (productIndex !== -1) {
            newCart[productIndex].quantity++
        } else {
            const product = catalog.find((item: any) => item.barcode === barcode)
            if (product === undefined) {
                addMessage({type: 'error', message: 'Prodotto non trovato'})
                return console.log('Product not found')
            }

            newCart.push({
                ...product,
                quantity: 1,
                id: product.id // Assicuriamoci di includere l'id di Supabase
            })
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

    const removeProduct = (barcode: string) => {
        const productIndex = cart.findIndex((item: any) => item.barcode === barcode)
        const newCart = [...cart]
        if (productIndex !== -1) {
            newCart[productIndex].quantity--
            if (newCart[productIndex].quantity === 0) {
                newCart.splice(productIndex, 1)
            }
            setCart(newCart)
        }
    }

    const addManualPrice = (price: number, description?: string) => {
        const newCart = [...cart]
        const timestamp = new Date().getTime()
        const product = {
            id: `manual-${timestamp}`,
            barcode: 'manual'+timestamp, 
            name: description || 'prezzo manuale', 
            price: price
        }
        newCart.push({...product, quantity: 1})
        setCart(newCart)
    }

    return {cart, addProduct, total, emptyCart, addManualPrice, removeProduct}
}

export default useCart