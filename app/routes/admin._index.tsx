import React from "react";
import Button from "~/components/Button";
import useCart from "~/hooks/useCart";
import useLocalServerIntegration from "~/hooks/useLocalServerIntegration";
import {useNavigate} from "@remix-run/react";

const Admin_index = () => {
    const {emptyCart} = useCart([])
    const navigate = useNavigate();

    const { exit, shutdown } = useLocalServerIntegration();

    const emptyCartAction = () => {
        emptyCart()
        navigate("/")
    }
    return (
        <>
            <div className={"flex-grow basis-0 "}>
                <Button onClick={() => navigate("catalog")}>catalogo</Button>
                <Button onClick={() => navigate("test-barcode")}>prova barcode</Button>
                <Button onClick={() => navigate("customers")}>clienti</Button>
                <Button onClick={emptyCartAction}>svuota carrello</Button>
                <Button onClick={exit}>exit</Button>
                <Button onClick={shutdown}>spegni</Button>
                <Button onClick={() => navigate("/")}>back</Button>
            </div>
        </>
    )


}

export default Admin_index