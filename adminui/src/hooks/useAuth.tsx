import { LogInUser, User } from "../types/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import * as SessionsApi from "@/api/sessions";
import * as UsersApi from "@/api/users";

interface AuthContextType {
  user?: User;
  loading: boolean;
  error?: any;
  login: (loginParams: LogInUser, callback?: any) => void;
  logout: () => void;
  reload: () => void;
  loggedIn: boolean;
  clearError: any;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [user, setUser] = useState<User>();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  useEffect(() => {
    if (error) setError(null);
  }, []);

  useEffect(() => {
    UsersApi.checkAuth()
      .then(async (res: any) => {
        if (res !== "error") {
          const res_json = await res.json();
          if (res_json.username) {
            setLoggedIn(res_json.isAuthenticated);
            UsersApi.getUserDetails(res_json.username)
              .then(async (res: any) => {
                const res_json = await res.json();
                setUser(res_json.data);
              })
              .catch((err) => {
                setError(err);
              });
          }
        }
      })
      .finally(() => setLoadingInitial(false));
  }, []);

  function reload() {
    setLoading(true);
    UsersApi.checkAuth()
      .then(async (res: any) => {
        const res_json = await res.json();
        setLoggedIn(res_json.isAuthenticated);
        UsersApi.getUserDetails(res_json.username).then(async (res: any) => {
          const res_json = await res.json();
          setUser(res_json.data);
        });
      })
      .finally(() => setLoading(false));
  }

  function login({ username, password }: LogInUser, callback?: any) {
    setLoading(true);
    SessionsApi.login({ username, password })
      .then(async (res: any) => {
        const res_json = await res.json();
        if (!Object.hasOwn(res_json, "error")) {
          localStorage.setItem("gocial_auth_token", res_json.token);
          UsersApi.checkAuth().then(async (res: any) => {
            const res_json = await res.json();
            setLoggedIn(res_json.isAuthenticated);
            UsersApi.getUserDetails(res_json.username)
              .then(async (res: any) => {
                const res_json = await res.json();
                setUser(res_json.data);
              })
              .catch((err) => {
                setError(err);
              });
          });
        } else {
          setError(res_json.error);
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
        callback?.();
      });
  }

  function clearError() {
    setError("");
  }

  function logout() {
    SessionsApi.logOut().then(() => setUser(undefined));
  }

  const memoedValue = useMemo(
    () => ({
      user,
      error,
      loading,
      login,
      clearError,
      logout,
      loggedIn,
      reload,
    }),
    [user, loading, loggedIn, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
