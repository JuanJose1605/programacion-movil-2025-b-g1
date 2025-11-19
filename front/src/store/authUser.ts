// src/store/useAuth.store.ts
import { create } from "zustand";
import { axiosClient } from "../services/axios.service";

type Usuario = {
  id_usuario: string;
  nombres: string;
  apellidos?: string | null;
  username: string;
};

interface AuthResponse {
  token: string;
  mensaje: string;
  usuario: Usuario;   // 👈 nuevo
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
  user: Usuario | null;      // 👈 info de la persona logueada

  login: (username: string, password: string) => Promise<LoginResult>;
  logout: () => void;
  hydrate: () => void;
}

// credenciales admin “lista blanca” (solo front)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";

// rutas de panel
const ADMIN_ROUTE = "/homeAdmin";
const CLIENT_ROUTE = "/tab1";

export const authStore = create<AuthState>((set) => ({
  token: null,
  mensaje: null,
  error: null,
  loading: false,
  isAuthenticated: false,
  isAdmin: false,
  user: null,

  login: async (username, password) => {
    try {
      set({ loading: true, error: null });

      const { data } = await axiosClient.post<AuthResponse>(
        "/usuarios/inicio",
        { username, password }
      );

      const { token, mensaje, usuario } = data;

      // guardar en storage
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));

      // header auth para axios
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const isAdmin =
        username.trim().toLowerCase() === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD;

      localStorage.setItem("isAdmin", isAdmin ? "1" : "0");

      set({
        token,
        mensaje,
        user: usuario,
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
        user: null,
      });
      return { ok: false, isAdmin: false, panelPath: CLIENT_ROUTE };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("usuario");
    delete axiosClient.defaults.headers.common["Authorization"];

    set({
      token: null,
      mensaje: null,
      error: null,
      loading: false,
      isAuthenticated: false,
      isAdmin: false,
      user: null,
    });
  },

  hydrate: () => {
    const token = localStorage.getItem("token");
    const isAdmin = localStorage.getItem("isAdmin") === "1";
    const usuarioStr = localStorage.getItem("usuario");
    const user = usuarioStr ? (JSON.parse(usuarioStr) as Usuario) : null;

    if (token) {
      set({
        token,
        isAuthenticated: true,
        isAdmin,
        user,
      });

      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  },
}));
