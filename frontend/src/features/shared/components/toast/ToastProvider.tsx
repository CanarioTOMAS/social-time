import { createContext, useContext, useState } from "react";
import Toast from "./Toast";

const ToastContext = createContext<any>({});

type Props = {
  children: React.ReactNode;
};

type ToastOptions = {
  message: "";
  severity: "success" | "warning" | "info" | "error";
  duration?: number;
  vertical?: string;
  horizontal?: string;
};

export const ToastProvider = ({ children }: Props) => {
  const [show, toastShow] = useState<ToastOptions>({
    message: "",
    severity: "info",
  });

  const value = {
    show,
    toastShow,
  };

  return (
    <ToastContext.Provider value={value}>
      <Toast />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
