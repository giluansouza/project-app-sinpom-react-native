import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from "react";
import { useStorageState } from "./use-storage-state";
import { getLogin, loadUser } from "@/services/auth-service";
import { Platform } from "react-native";
import { setToken } from "@/services/token-service";
import { router } from "expo-router";

interface IUser {
  id: number;
  name: string;
  email: string;
}

const AuthContext = createContext<{
  login: (
    email: string,
    password: string
  ) => Promise<boolean | string | undefined>;
  logout: () => void;
  session?: string | null;
  isLoading: boolean;
  user: IUser | null;
}>({
  login: async () => false,
  logout: () => null,
  session: null,
  isLoading: false,
  user: null,
});

export function useSession() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error("useSession must be used within an AuthProvider");
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  const [user, setUser] = useState<IUser | null>(null);

  const login = async (
    { email, password }: { email: string; password: string },
    setUser: (user: IUser | null) => void
  ) => {
    try {
      await getLogin({
        email,
        password,
        device_name: `${Platform.OS} ${Platform.Version}`,
      });

      const user = await loadUser();

      if (user) {
        setSession("123");
        setUser(user);
        return true;
      }
    } catch (e: any) {
      if (e.response?.status === 422) {
        return "Usuário ou senha inválidos";
      }
      return "Erro: " + e.message;
      console.log(e);
    }
  };

  const logout = () => {
    setSession(null);
    setUser(null);
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{
        login: async (email, password) => {
          const result = await login({ email, password }, setUser);
          return result;
        },
        logout,
        session,
        isLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
