import React, {useState} from "react";
import useApplicationState from "~/hooks/useApplicationState";

const useNumpad = (previousApplicationState: any) => {
    const {setApplicationState} = useApplicationState()
    const [value, setValue] = React.useState<string>("")
    const onDigit = (digit: string) => {
        setValue(value + digit)
    }
    const onEnter = () => {
        setValue("")
        setApplicationState(previousApplicationState)
    }
    const onClear = () => {
        setValue("")
        setApplicationState(previousApplicationState)
    }



    return {value, onDigit, onEnter, onClear }
}

export default useNumpad