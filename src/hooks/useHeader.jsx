import React, { useContext } from 'react'
import { HeaderContext } from '../assets/context/HeaderProvider'

export function useHeader(){
    const contextValue = useContext(HeaderContext);
    return contextValue;
}