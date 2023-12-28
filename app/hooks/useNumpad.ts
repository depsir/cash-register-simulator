import React from "react";

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

    const onBackspace = () => {
        setValue(value.slice(0, -1))
    }

    const onNumber = (number: string) => {
        setValue(number.toString())
    }

    return {value, onDigit, onEnter, onClear, onBackspace, onNumber}
}

export default useNumpad