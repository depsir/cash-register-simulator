
// a context provider to store application state

import React, { createContext, useContext, useState } from 'react'
import useCatalog from "~/hooks/useCatalog";
const initialState = {
    cart: [],
  catalog: [],
}
const ApplicationStateContext = createContext( {} as any)

export function useApplicationState() {
  let {state, setState} = useContext(ApplicationStateContext);
  const setApplicationState = (newState: any) => {
    const nextState = Object.assign({}, state, {state:newState})
    setState(nextState)
  }

  const addProduct = (barcode: string) => {
    const {catalog} = state
    const product = catalog.find((item: any) => item.barcode === barcode)

    const nextState = Object.assign({}, state, {cart: [...state.cart, {...product, quantity: 1}]})
    setState(nextState)
  }

  const setCatalog = (catalog: any) => {
    const nextState = Object.assign({}, state, {catalog})
    setState(nextState)
  }

  const init = () => {
    setState(initialState)
  }
  return {state, setApplicationState, addProduct,setCatalog ,init}
}

export function ApplicationStateProvider({ children }) {
  const [state, setState] = useState(initialState)

  return (
    <ApplicationStateContext.Provider value={{ state, setState }}>
      {children}
    </ApplicationStateContext.Provider>
  )
}