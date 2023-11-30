
// a context provider to store application state

import React, { createContext, useContext, useState } from 'react'
const initialState = {
    cart: []
}
const ApplicationStateContext = createContext( {} as any)

export function useApplicationState() {
  let {state, setState} = useContext(ApplicationStateContext);
  const setApplicationState = (newState: any) => {
    const nextState = Object.assign({}, state, {state:newState})
    setState(nextState)
  }

  const addProduct = (name: string, price: number) => {
    const nextState = Object.assign({}, state, {cart: [...state.cart, {name, price}]})
    setState(nextState)
  }

  const init = () => {
    setState(initialState)
  }
  return {state, setApplicationState, addProduct, init}
}

export function ApplicationStateProvider({ children }) {
  const [state, setState] = useState(initialState)

  return (
    <ApplicationStateContext.Provider value={{ state, setState }}>
      {children}
    </ApplicationStateContext.Provider>
  )
}