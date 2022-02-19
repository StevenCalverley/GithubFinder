import { createContext, useReducer, ReactNode } from "react";
import alertReducer from "./alertReducer";

type AlertCTX = {
  alert: { msg: string; type: string } | null;
  setAlert: (msg: string, type: string) => void;
};

const AlertContext = createContext<AlertCTX>({
  alert: null,
  setAlert: (msg, type) => {},
});

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const initialState = null;

  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (msg: string, type: string) => {
    dispatch({
      type: "SET_ALERT",
      payload: { msg, type },
    });

    setTimeout(() => dispatch({ type: "REMOVE_ALERT" }), 3000);
  };

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
