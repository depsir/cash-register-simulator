import React, {useEffect, useRef, useState} from "react";
import useCart from "~/hooks/useCart";
import {compute, formatNumber} from "~/utils/utils";

interface CartItem {
    barcode: string;
    name: string;
    price: number;
    quantity: number;
}

interface SwipeableItemProps {
    item: CartItem;
    onDelete: (barcode: string) => void;
    children: React.ReactNode;
}

const SwipeableItem: React.FC<SwipeableItemProps> = ({ item, onDelete, children }) => {
    const [startX, setStartX] = useState<number | null>(null);
    const [translateX, setTranslateX] = useState(0);
    const [isSwiped, setIsSwiped] = useState(false);

    const minSwipeDistance = 50;
    const maxSwipeDistance = 80;

    const handleStart = (clientX: number) => {
        setStartX(clientX);
        setTranslateX(0);
    };

    const handleMove = (clientX: number) => {
        if (startX === null) return;
        const diff = startX - clientX;
        setTranslateX(Math.max(0, Math.min(diff, maxSwipeDistance)));
    };

    const handleEnd = () => {
        if (startX === null) return;
        
        if (translateX > minSwipeDistance) {
            setTranslateX(maxSwipeDistance);
            setIsSwiped(true);
        } else {
            setTranslateX(0);
            setIsSwiped(false);
        }
        setStartX(null);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isSwiped) {
            onDelete(item.barcode);
            setIsSwiped(false);
            setTranslateX(0);
        }
    };

    return (
        <div className="relative">
            <div
                className="transition-transform duration-200 select-none w-full cursor-grab active:cursor-grabbing"
                style={{ transform: `translateX(-${translateX}px)` }}
                onTouchStart={(e) => handleStart(e.touches[0].clientX)}
                onTouchMove={(e) => handleMove(e.touches[0].clientX)}
                onTouchEnd={handleEnd}
                onMouseDown={(e) => handleStart(e.clientX)}
                onMouseMove={(e) => handleMove(e.clientX)}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
            >
                <div className="w-full">
                    {children}
                </div>
            </div>
            <div 
                className={`absolute right-0 top-0 h-full w-20 bg-red-500 flex items-center justify-center transition-opacity duration-200 ${isSwiped ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                onClick={handleDelete}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </div>
        </div>
    );
};

const CartList = () => {
    const {cart, removeProduct} = useCart([])
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'smooth'
            })
        }
    }, [cart])

    const line = (id: string, first: string, second: string | number) => {
        return <div key={id} className={"flex justify-between animate-fade-in w-full"}>
            <span>{first}</span>
            <span>{second}</span>
        </div>
    }

    return (
        <div ref={containerRef} className="h-full overflow-auto">
            {cart.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                    Carrello vuoto
                </div>
            ) : (
                cart.map((item: CartItem) => {
                    const content = item.quantity > 1 ? [
                        line(item.barcode + "-quantity", `${item.quantity} x ${formatNumber(item.price)}`, ""),
                        line(item.barcode, item.name, formatNumber(compute(item.price, item.quantity)))
                    ] : line(item.barcode, item.name, formatNumber(item.price));

                    return (
                        <SwipeableItem key={item.barcode} item={item} onDelete={removeProduct}>
                            {content}
                        </SwipeableItem>
                    );
                })
            )}
        </div>
    )
}

export default CartList
