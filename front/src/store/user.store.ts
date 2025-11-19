// src/store/user.store.ts
import { create } from "zustand";
import { axiosClient } from "../services/axios.service";

interface User {
  id_usuario: string;
  nombres: string;
  apellidos: string;
  username: string;
  password: string;
  createAt?: Date;
}

type Store = {
  user: User | null;
  error: string | null;

  setUser: (newUser: Omit<User, "createAt">) => Promise<void>;
  clearError: () => void;
};

export const useUserStore = create<Store>((set) => ({
  user: null,
  error: null,

  // ========== CREAR USUARIO ==========
  setUser: async (newUser) => {
    try {
      set({ error: null }); // limpiamos errores previos

      const { data } = await axiosClient.post<User>("/usuarios", newUser);

      // Usuario creado correctamente
      set({ user: data });

    } catch (e: any) {
      console.error("Error creando usuario:", e);

      // Extraemos mensaje del backend
      const msg =
        e?.response?.data?.message ||
        "Error al crear el usuario. Intenta nuevamente.";

      // Guardamos error en el store para el frontend
      set({ error: msg });

      // IMPORTANTE: Relanzamos el error para manejarlo en el front si deseas
      throw new Error(msg);
    }
  },

  clearError: () => set({ error: null }),
}));
