import React from "react";

const Button = ({children, onClick}) => {
  return (
    <div onClick={onClick} className={"p-2 border-2 flex-grow basis-0 text-center m-1 uppercase"}>{children}

    </div>
  );
};

export default Button;