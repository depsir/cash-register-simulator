import React from "react";

// a variant map with an enum of variants. we need base and square

export enum Variant {
    BASE,
    SQUARE,
    FULL
}

const variantMap = {
    [Variant.BASE]: "",
    [Variant.FULL]: "flex-grow basis-0",
    [Variant.SQUARE]: "w-[2em] h-[2em]"
}

type Props = {
    variant?: Variant,
    onClick?: () => void
}

const Button: React.FC<React.PropsWithChildren<Props>> = ({children, onClick, variant=Variant.BASE}) => {
  return (
    <div onClick={onClick} className={"cursor-pointer p-4 border-2 text-center m-2 uppercase drop-shadow bg-gray-300 " + variantMap[variant]}>{children}

    </div>
  );
};

export default Button;