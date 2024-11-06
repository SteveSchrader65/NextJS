'use client'

import { createContext, useState, useContext } from 'react'

const StatesContext = createContext()

const _initialStates = {
  city: "Perth",
  cityPrefix: "d",
  language: "English",
  homeAnimated: false,
  rentalsAnimated: false,
}

export function StatesProvider({ children }) {
  const [ states, setStates ] = useState(_initialStates)

  // Update any state value by updating all current values
  // with passed key/value pair overwriting any previous value
  const updateStates = (key, value) => {
    setStates(prevStates => ({
      ...prevStates,
      [key]: value
    }))
  }

  return (
    <StatesContext.Provider value={ {states, updateStates} }>
      {children}
    </StatesContext.Provider>
  )
}

export const useStates = () => useContext(StatesContext)
