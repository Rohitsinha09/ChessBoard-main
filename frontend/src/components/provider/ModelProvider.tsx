import { createContext, useState, useContext, ReactNode } from 'react';

// Define the type for the context value
interface ModelContextType {
  selectedModel: string | null;
  setSelectedModel: (model: string | null) => void;
}

// Create the context with a default value
const ModelContext = createContext<ModelContextType | undefined>(undefined);

interface ModelProviderProps {
  children: ReactNode;
}

export const ModelProvider = ({ children }: ModelProviderProps) => {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  return (
    <ModelContext.Provider value={{ selectedModel, setSelectedModel }}>
      {children}
    </ModelContext.Provider>
  );
};

export const useModel = () => {
  const context = useContext(ModelContext);
  if (context === undefined) {
    throw new Error('useModel must be used within a ModelProvider');
  }
  return context;
};
