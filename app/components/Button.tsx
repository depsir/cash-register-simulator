import React from "react";

export enum Variant {
    BASE = "BASE",
    FULL = "FULL",
    SQUARE = "SQUARE"
}

const variantMap = {
    [Variant.BASE]: "",
    [Variant.FULL]: "flex-grow basis-0",
    [Variant.SQUARE]: "w-[3em] h-[3em] lg:w-[2em] lg:h-[2em]"
}

const iconMap = {
    "search": "\ue8b6",
    "back": "\ue5c4",
    "power": "\ue8ac",
    "logout": "\ue9ba",
    "person": "\ue7fd",
    "empty-cart": "\uf4f7",
    "checkout": "\ueb88",
    "barcode-scanner": "\ue70c",
    "inventory": "\ue179",
    "settings": "\ue8b8",
    "delete": "\ue872",
    "add": "\ue145",
    "barcode": "\ue145",
    "euro": "\uea15",
    "shopping-bag": "\uf1cc",
    "payment-cash": "\uef63",
    "close": "\ue5cd",
    "check": "\ue5ca",
    "membership-card": "\ue8f7",
    "backspace": "\ue14a",
    "remove-product": "\ue928",
    "keyboard-hide": "\ue31a",
    "keyboard-show": "\uf7db",
    "add-product": "\ue854",
    "person-add": "\ue7fe",
    "edit": "\ue3c9",
    "coffee": "\uefef",
    "filter-off": "\ueb32",
}

type Props = {
    variant?: Variant,
    onClick?: () => void
    icon?: keyof typeof iconMap
    children?: React.ReactNode
}

const Button: React.FC<Props> = ({variant = Variant.BASE, onClick, icon, children}) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (onClick) {
            onClick();
        }
        // Rimuovi il focus dal pulsante dopo il click
        if (e.currentTarget instanceof HTMLElement) {
            e.currentTarget.blur();
        }
    }

    return (
        <button
            className={"cursor-pointer p-[1ex] border-2 text-center m-2 uppercase drop-shadow bg-gray-300 flex justify-center gap-2 " + variantMap[variant]}
            onClick={handleClick}
        >
            {icon && <span className={"material-symbols-outlined text-[1em] mr-2"}>{iconMap[icon]}</span>}
            {children}
        </button>
    )
}

export default Button;