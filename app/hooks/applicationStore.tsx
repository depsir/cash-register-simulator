
// a context provider to store application state

import React, { createContext, useContext, useState } from 'react'
import useCatalog from "~/hooks/useCatalog";
type State = {
    cart: any[],
    catalog: any[],
    state?: string
}
const initialState: State = {
  cart: [],
  catalog: [],

}
const ApplicationStateContext = createContext( {} as any)

export function useApplicationStore(partName: keyof State) {
  let {state, setState} = useContext(ApplicationStateContext);

  const setStatePart = (part: any) => {
    setState((curState: State) => Object.assign({}, curState, {[partName]: part}))
  }

  const init = () => {
    setState(initialState)
  }
  return [state[partName], setStatePart]
}

export function ApplicationStateProvider({ children }) {
  const [state, setState] = useState<State>(initialState)

  return (
    <ApplicationStateContext.Provider value={{ state, setState }}>
      {children}
    </ApplicationStateContext.Provider>
  )
}