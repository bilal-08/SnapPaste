'use client';
import React, { createContext, useState, useContext } from 'react';

interface CodeIdContextType {
  dynamicData: string;
  handleDataChange: (newData: string) => void;
}

const CodeIdContext = createContext<CodeIdContextType | undefined>(undefined);

export const useCodeIdContext = () => {
  const context = useContext(CodeIdContext);
  if (!context) {
    throw new Error('useCodeIdContext must be used within a CodeIdProvider');
  }
  return context;
};

export const CodeIdProvider = ({ children }: { children: React.ReactNode }) => {
  const [dynamicData, setDynamicData] = useState('I');

  const handleDataChange = (newData: string) => {
    setDynamicData(newData);
  };

  return (
    <CodeIdContext.Provider value={{ dynamicData, handleDataChange }}>
      {children}
    </CodeIdContext.Provider>
  );
};

export default CodeIdContext;
