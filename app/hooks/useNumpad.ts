import React, {useState} from "react";

const useNumpad = () => {
    const [value, setValue] = React.useState<string>("")
    const onDigit = (digit: string) => {
        setValue(value + digit)
    }
    const onEnter = () => {
        setValue("")
    }
    const onClear = () => {
        setValue("")
    }



    return {value, onDigit, onEnter, onClear }
}

export default useNumpad