import { UIProvider } from "../../shared/ui/UIProvider";

export default function AppProviders({ children }) {
  return <UIProvider>{children}</UIProvider>;
}