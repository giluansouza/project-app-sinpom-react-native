import { createContext } from "react";

export default createContext<{ user: any; setUser: (user: any) => void }>({
  user: null,
  setUser: () => {},
});
