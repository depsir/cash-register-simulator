import React, {useState} from "react";
import useApplicationState from "~/hooks/useApplicationState";

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