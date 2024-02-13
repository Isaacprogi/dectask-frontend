import React, { createContext, useState } from "react";

interface StatusContextProps {
  statuses: { id: number; value: string; active: boolean }[];
  setStatuses: React.Dispatch<React.SetStateAction<{ id: number; value: string; active: boolean }[]>>;
}

export const StatusContext = createContext<StatusContextProps | undefined>(undefined);

const StatusContextProvider: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [statuses, setStatuses] = useState<{ id: number; value: string; active: boolean }[]>(
    [
      { id: 1, value: 'All', active: true },
      { id: 2, value: 'To Do', active: false },
      { id: 3, value: 'In Progress', active: false },
      { id: 4, value: 'Done', active: false },
    ]
  );


  return (
    <StatusContext.Provider value={{ statuses, setStatuses }}>
      {children}
    </StatusContext.Provider>
  );
};

export default StatusContextProvider;
