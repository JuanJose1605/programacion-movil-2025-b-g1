// src/store/useEmpresaStore.ts
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
    setUser: (newUser: Omit<User, "createAt" >) => Promise<void>;
}

export const useUserStore = create<Store>()((set) => ({
    user: null,
    setUser: async (newUser) => {
        try {
            const { data } = await axiosClient.post<User>('/usuarios', newUser);
            set({ user: data });
            console.log("usuario creado:", data);
        } catch (e) {
            console.error("Error al crear el estudiante:", e);
        }
    }
}));
