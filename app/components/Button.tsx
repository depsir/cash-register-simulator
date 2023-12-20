import React from "react";

export enum Variant {
    BASE,
    SQUARE,
    FULL
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
}

type Props = {
    variant?: Variant,
    onClick?: () => void
    icon?: keyof typeof iconMap
}

const Button: React.FC<React.PropsWithChildren<Props>> = ({children, onClick, variant=Variant.BASE, icon}) => {
  return (
      <div onClick={onClick}
           className={"cursor-pointer p-[1ex] border-2 text-center m-2 uppercase drop-shadow bg-gray-300 flex justify-center gap-2 " + variantMap[variant]}>
          {icon && <span  className={"material-symbols-outlined lg:!text-5xl mr-2"}>{iconMap[icon]}</span>}
          {children}
      </div>
  );
};

export default Button;