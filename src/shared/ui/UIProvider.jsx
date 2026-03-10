import { createContext, useContext, useMemo, useState } from "react";

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [authOpen, setAuthOpen] = useState(false);
  const [authIntent, setAuthIntent] = useState("all"); // all | login | signup

  const value = useMemo(
    () => ({
      authOpen,
      authIntent,
      openAuth: (intent = "all") => {
        setAuthIntent(intent);
        setAuthOpen(true);
      },
      closeAuth: () => {
        setAuthOpen(false);
        setAuthIntent("all");
      },
    }),
    [authOpen, authIntent]
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}