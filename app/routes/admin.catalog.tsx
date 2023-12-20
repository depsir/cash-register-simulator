import React from 'react';
import useProductForm from "~/hooks/useProductForm";
import {useFetcher, useLoaderData, useNavigate} from "@remix-run/react";
import Button from "~/components/Button";
import Keyboard from "~/components/Keyboard";
import NumberPad from "~/components/NumberPad";
import {ActionFunction, json, LoaderFunction} from "@remix-run/node";
import {loadCatalog} from "~/loaders/catalogLoader";
import BarcodeReader from "~/components/BarcodeReader";

interface ProductsProps {
    subpage: string,
    onBarcode: (data: any) => void,
    exitFromProductPage: () => void,
    catalog: Array<any>,
    onDelete: (id: string) => void,
    product: any,
    onSave: () => void,
    onKeyboardDigit: (digit: string) => void,
    onNumberPadDigit: (digit: string) => void,
}

export let loader: LoaderFunction = async () => {
   return loadCatalog()
}
export let action: ActionFunction = async ({ request }) => {
    const formData = new URLSearchParams(await request.text());
    const actionType = formData.get("actionType");

    switch (actionType) {
        case "add": {
            const newProduct = {
                barcode: formData.get("barcode"),
                name: formData.get("name"),
                price: parseFloat(formData.get("price") || "0"),
            };
            await fetch("https://parseapi.back4app.com/classes/products", {
                method: "POST",
                headers: {
                    "X-Parse-Application-Id": "LDZJihElZqMmwIGNwGQwTQMxm2SJUsyHVvw6bOuh",
                    "X-Parse-REST-API-Key": "RTKD5XQ8HBJRtGHLD3MBL7TyekcdomBc7s4Tu503",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProduct)
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Success:", data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
            break;
        }
        case "delete": {
            const productIdToDelete = formData.get("productId");
            await fetch(`https://parseapi.back4app.com/classes/products/${productIdToDelete}`, {
                method: "DELETE",
                headers: {
                    "X-Parse-Application-Id": "LDZJihElZqMmwIGNwGQwTQMxm2SJUsyHVvw6bOuh",
                    "X-Parse-REST-API-Key": "RTKD5XQ8HBJRtGHLD3MBL7TyekcdomBc7s4Tu503",
                },
            })
                .then(response => response.json())
                .then(data => {
                    console.log("Success:", data);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
            break;
        }
        default:
            break;
    }

    return json({ ok: true });
};


const Products : React.FC<ProductsProps> = () => {
    let catalog = useLoaderData();
    let fetcher = useFetcher();


    const navigate = useNavigate();
    const {product, onBarcode, onKeyboardDigit, onNumberPadDigit, onClear, onNumberPadBackspace} = useProductForm();
    const onDelete = (id: string) => {
        fetcher.submit(
            { actionType: 'delete', productId: id }, { method: 'post' }
       )
    }

    const onSave = () => {
        fetcher.submit(
            { actionType: 'add', barcode: product.barcode, name: product.name, price: product.price }, { method: 'post' }
       )
        onClear();
    }
    const exitFromProductPage = () => {
        onClear(); // Use the onClear function here
        navigate("/admin")
    };

    return (
         <div className={"flex flex-col h-full w-full"}>
            <BarcodeReader
                onScan={onBarcode}
            />
            <div><Button onClick={exitFromProductPage} icon={"back"}>indietro</Button></div>
            <div className={"flex-grow flex-shrink overflow-auto min-h-0"}>
                <div className={"grid grid-cols-[15ex_1fr_6ex_3em] gap-2"}>
                    {catalog.map((product: any) => {
                        return <React.Fragment key={product.objectId}>
                            <div>{product.barcode}</div>
                            <div>{product.name}</div>
                            <div>{product.price}</div>
                            <div><Button onClick={() => onDelete(product.objectId)} icon={"delete"}></Button></div>
                        </React.Fragment>
                    })}
                </div>
            </div>
            <div className={" grid grid-cols-[15ex_1fr_6ex_3em] gap-2"}>
                <div className={"bg-white h-[3ex] leading-[3ex]"}>{product.barcode}</div>
                <div className={"bg-white h-[3ex] leading-[3ex]"}>{product.name}</div>
                <div className={"bg-white h-[3ex] leading-[3ex]"}>{product.price}</div>
                <div><Button onClick={onSave} icon={"add"}></Button></div>
            </div>
            <div className={"flex"}>
                <Keyboard onDigit={onKeyboardDigit}></Keyboard>
                <NumberPad onDigit={onNumberPadDigit} onBackspace={onNumberPadBackspace}/>
            </div>
        </div>
    );
}

export default Products;