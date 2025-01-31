import { createContext, useContext, useState, ReactNode } from "react";

const RegContext = createContext<{
  regId: number | undefined;
  setRegId: React.Dispatch<React.SetStateAction<any>>;
}>({
  regId: undefined,
  setRegId: () => {},
});

const RegProvider = ({ children }: { children: ReactNode }) => {
  const [regId, setRegId] = useState(undefined);

  return (
    <RegContext.Provider value={{ regId, setRegId }}>
      {children}
    </RegContext.Provider>
  );
};

const useReg = () => useContext(RegContext);

export default RegProvider;
export { useReg };
