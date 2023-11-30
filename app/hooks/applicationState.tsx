
// a context provider to store application state

import React, { createContext, useContext, useState } from 'react'

const ApplicationStateContext = createContext({state: {init:true}} as any)

export function useApplicationState() {
  let {state, setState} = useContext(ApplicationStateContext);
  const setApplicationState = (newState: any) => {
    const nextState = Object.assign({}, state, {state:newState})
    setState(nextState)
  }
  return {state, setApplicationState}
}

export function ApplicationStateProvider({ children }) {
  const [state, setState] = useState({})

  return (
    <ApplicationStateContext.Provider value={{ state, setState }}>
      {children}
    </ApplicationStateContext.Provider>
  )
}