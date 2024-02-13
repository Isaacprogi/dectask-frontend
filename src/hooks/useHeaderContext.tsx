import { useContext } from 'react';
import { HeaderContext } from '../context/HeaderContext';
import { HeaderContextProps } from '../types/types';
  
  const useHeaderContext = (): HeaderContextProps => {
    const context = useContext(HeaderContext);
    if (!context) {
      throw new Error('useStatusContext must be used within a StatusContextProvider');
    }
    return context;
  };
  
  export default useHeaderContext;