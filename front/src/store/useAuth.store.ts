import { create } from "zustand";
import { axiosClient } from "../services/axios.service";

interface AuthResponse {
  token: string;
  mensaje: string;
}

interface LoginResult {
  ok: boolean;
  isAdmin: boolean;
  panelPath: string;
}

interface AuthState {
  token: string | null;
  mensaje: string | null;
  error: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;

  login: (username: string, password: string) => Promise<LoginResult>;
  logout: () => void;
  hydrate: () => void;
}

// credenciales admin “lista blanca” (solo front)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// rutas de panel
const ADMIN_ROUTE = "/tab1";
const CLIENT_ROUTE = "/tab2";

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  mensaje: null,
  error: null,
  loading: false,
  isAuthenticated: false,
  isAdmin: false,

  login: async (username, password) => {
    try {
      set({ loading: true, error: null });

      // Llama a tu backend (valida contra BD)
      const { data } = await axiosClient.post<AuthResponse>(
        "/usuarios/inicio",
        { username, password }
      );

      // Si el backend respondió OK, guardamos token
      localStorage.setItem("token", data.token);

      // Determinar admin SOLO por las credenciales escritas
      const isAdmin =
        username.trim().toLowerCase() === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD;

      // Persistir flag para rehidratar luego
      localStorage.setItem("isAdmin", isAdmin ? "1" : "0");

      set({
        token: data.token,
        mensaje: data.mensaje,
        loading: false,
        isAuthenticated: true,
        isAdmin,
        error: null,
      });

      return {
        ok: true,
        isAdmin,
        panelPath: isAdmin ? ADMIN_ROUTE : CLIENT_ROUTE,
      };
    } catch (error: any) {
      set({
        error:
          error?.response?.data?.message ||
          "Error de conexión o credenciales incorrectas",
        loading: false,
        isAuthenticated: false,
        isAdmin: false,
      });
      return { ok: false, isAdmin: false, panelPath: CLIENT_ROUTE };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    set({
      token: null,
      mensaje: null,
      error: null,
      loading: false,
      isAuthenticated: false,
      isAdmin: false,
    });
  },

  hydrate: () => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin") === "1";
    if (token) {
      set({
        token,
        isAuthenticated: true,
        isAdmin,
      });
    }
  },
}));
