import React, { createContext, useState } from "react";
import { HeaderContextProps } from "../types/types";

export const HeaderContext = createContext<HeaderContextProps | undefined>(undefined);

const HeaderContextProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [active,setActive] = useState<boolean>(false)


  return (
    <HeaderContext.Provider value={{ active, setActive}}>
      {children}
    </HeaderContext.Provider>
  );
};

export default HeaderContextProvider;
