import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

type CheckoutContextType = {
  isCheckingout: boolean;
  setIsCheckingout: Dispatch<SetStateAction<boolean>>;
};
const checkoutContext = createContext<CheckoutContextType>({
  isCheckingout: false,
  setIsCheckingout: () => {},
});

export const useCheckout = () => {
  const context = useContext(checkoutContext);
  return context;
};

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [isCheckingout, setIsCheckingout] = useState(false);
  return (
    <checkoutContext.Provider
      value={{
        isCheckingout,
        setIsCheckingout,
      }}
    >
      {children}
    </checkoutContext.Provider>
  );
}

export default checkoutContext;
