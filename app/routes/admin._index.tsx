import React from "react";
import Button from "~/components/Button";
import useCart from "~/hooks/useCart";
import useLocalServerIntegration from "~/hooks/useLocalServerIntegration";
import {useNavigate, useLocation} from "@remix-run/react";
import useCustomerCard from "~/hooks/useCustomerCard";

const Admin_index = () => {
    const {emptyCart} = useCart([])
    const {clearCustomerCard} = useCustomerCard()
    const navigate = useNavigate();
    const location = useLocation();
    const previousPath = location.state?.from || "/";

    const { exit, shutdown } = useLocalServerIntegration();

    const emptyCartAction = () => {
        emptyCart()
        clearCustomerCard()
        navigate("/")
    }

    return (
        <>
            <div className={"flex-grow basis-0 "}>
                <Button onClick={() => navigate(previousPath)} icon={"back"}>indietro</Button>
                <Button onClick={() => navigate("catalog")} icon={"inventory"}>catalogo</Button>
                <Button onClick={() => navigate("customers")} icon={"person"}>clienti</Button>
                <Button onClick={emptyCartAction} icon={"empty-cart"}>svuota carrello</Button>
                <Button onClick={() => navigate("test-barcode")} icon={"barcode-scanner"}>prova barcode</Button>
                <Button onClick={() => navigate("/")} icon={"settings"}>torna alla home</Button>
                <Button onClick={exit} icon={"logout"}>exit</Button>
                <Button onClick={shutdown} icon={"power"}>spegni</Button>
            </div>
        </>
    )
}

export default Admin_index