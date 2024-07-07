import React, { useState, createContext, ReactNode, FC } from 'react';

// Define the context type
interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
}

// Create the context with default values
export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Define the props type for the provider
interface SidebarProviderProps {
  children: ReactNode;
}

const SidebarProvider: FC<SidebarProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen, handleClose }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
