import { create } from "zustand";
import { axiosClient } from "../services/axios.service";
import { Pedido } from "../pages/types/pedidos";

interface PedidosState {
  pedidos: Pedido[];
  pedidoActivo: Pedido | null;
  loading: boolean;
  error: string | null;

  // acciones
  fetchPedidos: () => Promise<void>;
  fetchPedidoById: (id_pedido: number) => Promise<void>;
  clearPedidoActivo: () => void;
}

export const usePedidosStore = create<PedidosState>((set, get) => ({
  pedidos: [],
  pedidoActivo: null,
  loading: false,
  error: null,

  async fetchPedidos() {
    try {
      set({ loading: true, error: null });
      const { data } = await axiosClient.get<Pedido[]>("/pedidos");
      set({ pedidos: data, loading: false });
    } catch (error: any) {
      console.error(error);
      set({
        loading: false,
        error: error?.response?.data?.message || "Error al cargar pedidos",
      });
    }
  },

  async fetchPedidoById(id_pedido: number) {
    try {
      set({ loading: true, error: null });
      const { data } = await axiosClient.get<Pedido>(`/pedidos/${id_pedido}`);
      set({ pedidoActivo: data, loading: false });
    } catch (error: any) {
      console.error(error);
      set({
        loading: false,
        error: error?.response?.data?.message || "Error al cargar el pedido",
      });
    }
  },

  clearPedidoActivo() {
    set({ pedidoActivo: null });
  },
}));
