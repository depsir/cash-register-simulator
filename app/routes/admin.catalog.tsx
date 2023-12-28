import React, { useEffect } from 'react';
import useProductForm from "~/hooks/useProductForm";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import Button, { Variant } from "~/components/Button";
import Keyboard from "~/components/Keyboard";
import NumberPad from "~/components/NumberPad";
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Catalog, loadCatalog } from "~/loaders/catalogLoader";
import BarcodeReader from "~/components/BarcodeReader";
import { formatNumber } from "~/utils/utils";
import ConfirmPopup from '~/components/ConfirmPopup';
import PopupMessage from '~/components/PopupMessage';
import { useMessages } from '~/hooks/useMessages';

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
        case "update": {
            const productToUpdate = {
                barcode: formData.get("barcode"),
                name: formData.get("name"),
                price: parseFloat(formData.get("price") || "0"),
                id: formData.get("id")
            };
            await fetch(`https://parseapi.back4app.com/classes/products/${formData.get("id")}`, {
                method: "PUT",
                headers: {
                    "X-Parse-Application-Id": "LDZJihElZqMmwIGNwGQwTQMxm2SJUsyHVvw6bOuh",
                    "X-Parse-REST-API-Key": "RTKD5XQ8HBJRtGHLD3MBL7TyekcdomBc7s4Tu503",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productToUpdate)
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


const Products: React.FC<ProductsProps> = () => {
    const catalog: Catalog = useLoaderData();
    const [filteredCatalog, setFilteredCatalog] = React.useState(catalog)
    const fetcher = useFetcher();

    const [keyboardVisible, setKeyboardVisible] = React.useState(false);
    const [confirmDelete, setConfirmDelete] = React.useState<string | null>(null);
    const [mode, setMode] = React.useState<"add" | "edit" | "init" | "search">("init");
    const {addMessage} = useMessages();
    const [productFilter, setProductFilter] = React.useState<{name: string, barcode: string} | undefined>();
    const hasFilter = productFilter && (productFilter.name || productFilter.barcode)
    const onDeleteRequest = (id: string) => {
        setConfirmDelete(id);
    }

    const navigate = useNavigate();
    const { product, onBarcode, onName, onKeyboardDigit, onNumberPadDigit, onClear, onNumberPadBackspace, onKeyboardBackspace, onId, onPrice } = useProductForm();
    const onDelete = (id: string) => {
        fetcher.submit(
            { actionType: 'delete', productId: id }, { method: 'post' }
        )
        setConfirmDelete(null)
    }

    const onSave = () => {
        fetcher.submit(
            { actionType: product.id ? 'update' : 'add', barcode: product.barcode, name: product.name, price: product.price, id: product.id }, { method: 'post' }
        )
        onClear();
    }
    const exitFromProductPage = () => {
        onClear();
        navigate("/admin")
    };

    const onAddMode = () => {
        setMode("add")
        setKeyboardVisible(true)
        onClear()
    }

    const onSearchMode = () => {
        onClear()
        if (mode!=="search" && hasFilter) {
            onBarcode(productFilter.barcode)
            onName(productFilter.name)
        }
        setMode("search")
        setKeyboardVisible(true)
    }

    const onInitMode = () => {
        setMode("init")
        setKeyboardVisible(false)
        onClear()
    }

    const onEditMode = (id: string) => {
        const productToEdit = catalog.find((product: any) => product.objectId === id)
        if (productToEdit) {
            setMode("edit")
            onBarcode(productToEdit.barcode)
            onName(productToEdit.name)
            onPrice(productToEdit.price.toString())
            onId(productToEdit.objectId)
            setKeyboardVisible(true)
        }
    }
    
    useEffect(() => {
        if (mode === "search") {
            setProductFilter({name: product.name, barcode: product.barcode})
        }
    }, [product.name, product.barcode, mode])

    useEffect(() => {
        if (hasFilter) {
            const filteredCatalog2 = catalog.filter((product1: any) => {
                const barcodeMatch = !productFilter.barcode || product1.barcode.includes(productFilter.barcode)
                const nameMatch = !productFilter.name || product1.name.toLowerCase().includes(productFilter.name.toLowerCase())
                return barcodeMatch && nameMatch
            })
            setFilteredCatalog(filteredCatalog2)
        } else {
            setFilteredCatalog(catalog)
        }
    }, [productFilter, productFilter?.name, productFilter?.barcode, catalog])


    useEffect(() => {
        if (mode === "add") {
            const product2 = catalog.find((product1: any) => product1.barcode === product.barcode)
            if (product2) {
                addMessage({message: "barcode già presente", type: "error"})
                onBarcode("")
            }
        }
    }, [product.barcode, mode])

    function onFilterReset() {
       setProductFilter(undefined);
       if(mode === "search") {
           onClear()
       }
    }

    return (
        <div className={"flex flex-col h-full w-full"}>
            <BarcodeReader
                onScan={onBarcode}
            />
            <div className='flex'>
                <Button onClick={exitFromProductPage} icon={"back"}>indietro</Button>
                <Button variant={Variant.SQUARE} onClick={onAddMode} icon={"add-product"}></Button>
                <Button variant={Variant.SQUARE} onClick={onSearchMode} icon={"search"}></Button>
                {hasFilter && <Button variant={Variant.SQUARE} onClick={onFilterReset} icon={"filter-off"}></Button>}
            </div>
            <div className={"flex-grow flex-shrink overflow-auto min-h-0"}>
                <div className={"grid grid-cols-[16ex_1fr_6ex_3em_3em] gap-2"}>
                    <div className={"mb-2 pb-2 border-b-4"}>barcode</div>
                    <div className={"mb-2 pb-2 border-b-4"}>nome</div>
                    <div className={"mb-2 pb-2 border-b-4"}>prezzo</div>
                    <div className={"mb-2 pb-2 border-b-4"}></div>
                    <div className={"mb-2 pb-2 border-b-4"}></div>
                    {filteredCatalog.map((product: any) => {
                        return <React.Fragment key={product.objectId}>
                            <div>{product.barcode}</div>
                            <div>{product.name}</div>
                            <div className={"text-right"}>{formatNumber(product.price)}</div>
                            <div><Button onClick={() => onEditMode(product.objectId)} icon={"edit"}></Button></div>
                            <div><Button onClick={() => onDeleteRequest(product.objectId)} icon={"delete"}></Button></div>
                        </React.Fragment>
                    })}
                </div>
            </div>
            {keyboardVisible &&<div className={"absolute bottom-2 right-2"}>
                <Button variant={Variant.SQUARE} onClick={onInitMode} icon={"keyboard-hide"}></Button>
            </div>}
            {keyboardVisible && <div>
                <div className={" grid grid-cols-[15ex_1fr_6ex_3em] gap-2"}>
                    <div className={"bg-white h-[3ex] leading-[3ex]"}>{product.barcode}</div>
                    <div className={"bg-white h-[3ex] leading-[3ex]"}>{product.name}</div>
                    <div className={"bg-white h-[3ex] leading-[3ex]"}>{product.price}</div>
                    <div>
                        {(mode == 'add' || mode == 'edit')&& <Button onClick={onSave} icon={"add-product"}></Button>}</div>
                </div>
                <div className={"flex"}>
                    <Keyboard onDigit={onKeyboardDigit} onBackspace={onKeyboardBackspace}></Keyboard>
                    <NumberPad onDigit={onNumberPadDigit} onBackspace={onNumberPadBackspace} />
                </div>
            </div>
            }
            {confirmDelete && (
                <ConfirmPopup
                    message="Sei sicuro di voler eliminare questo prodotto?"
                    onConfirm={() => {
                        onDelete(confirmDelete);
                    }}
                    onCancel={() => setConfirmDelete(null)}
                />
            )}
        </div>
    );
}

export default Products;