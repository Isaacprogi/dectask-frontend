import { AuthContextType } from "../types/types";
import {useContext} from 'react'
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
  };
  