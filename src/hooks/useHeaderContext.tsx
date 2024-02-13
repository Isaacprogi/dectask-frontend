import { useContext } from 'react';
import { HeaderContext } from '../context/HeaderContext';
import { HeaderContextProps } from '../types/types';
  
  const useHeaderContext = (): HeaderContextProps => {
    const context = useContext(HeaderContext);
    if (!context) {
      throw new Error('useHeaderContext must be used within a HeaderContextProvider');
    }
    return context;
  };
  
  export default useHeaderContext;