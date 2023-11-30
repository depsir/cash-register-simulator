//compponetn

import TextBox from "./TextBox";
import React from "react";

const TwoElementsTextBox = ({children}) => {
    return (
        <TextBox>
            <div className={"flex justify-between"}>
                {children}
            </div>
        </TextBox>
    )
}

export default TwoElementsTextBox;
