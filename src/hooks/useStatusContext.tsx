import { useContext } from 'react';
import { StatusContext } from '../context/StatusContext';

interface StatusContextProps {
    statuses: { id: number; value: string; active: boolean }[];
    setStatuses: React.Dispatch<React.SetStateAction<{ id: number; value: string; active: boolean }[]>>;
}
  
  const useStatusContext = (): StatusContextProps => {
    const context = useContext(StatusContext);
    if (!context) {
      throw new Error('useStatusContext must be used within a StatusContextProvider');
    }
    return context;
  };
  
  export default useStatusContext;