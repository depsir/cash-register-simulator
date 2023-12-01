import React from "react";

// a variant map with an enum of variants. we need base and square

export enum Variant {
    BASE,
    SQUARE
}

const variantMap = {
    [Variant.BASE]: "flex-grow basis-0",
    [Variant.SQUARE]: "w-16 h-16"
}

type Props = {
    variant?: Variant,
    onClick?: () => void
}

const Button: React.FC<React.PropsWithChildren<Props>> = ({children, onClick, variant=Variant.BASE}) => {
  return (
    <div onClick={onClick} className={"cursor-pointer p-2 border-2 text-center m-1 uppercase drop-shadow bg-gray-300 " + variantMap[variant]}>{children}

    </div>
  );
};

export default Button;