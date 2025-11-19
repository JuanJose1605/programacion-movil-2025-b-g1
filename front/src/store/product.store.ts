// src/store/useEmpresaStore.ts
import { create } from "zustand";
import { axiosClient } from "../services/axios.service";


interface User {
    nombre: string;
    descripcion: string;  
    precio: string;
    stock:string;
    createAt?: Date;
    
}

type Store = {
    user: User | null;
    setUser: (newUser: Omit<User, "createAt" >) => Promise<void>;
}

export const useProductStore = create<Store>()((set) => ({
    user: null,
    setUser: async (newUser) => {
        try {
            const { data } = await axiosClient.post<User>('/productos', newUser);
            set({ user: data });
            console.log("producto creado:", data);
        } catch (e) {
            console.error("Error al crear el producto:", e);
        }
    }
}));
