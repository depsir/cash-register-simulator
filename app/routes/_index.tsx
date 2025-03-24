import React from "react";
import Button from "~/components/ui/Button";
import {useNavigate} from '@remix-run/react'
import useCart from "~/hooks/useCart";
import useCustomerCard from "~/hooks/useCustomerCard";

const Index = () => {
    const navigate = useNavigate();
    const {emptyCart} = useCart([]);
    const {clearCustomerCard} = useCustomerCard();

    const navigateToMode = (path: string) => {
        emptyCart();
        clearCustomerCard();
        navigate(path);
    }

    return (
        <div className={"flex flex-col items-center justify-center h-screen"}>
            <Button onClick={() => navigateToMode("/store")} icon={"shopping-bag"}>negozio</Button>
            <Button onClick={() => navigateToMode("/bar")} icon={"coffee"}>bar</Button>
        </div>
    )
}

export default Index