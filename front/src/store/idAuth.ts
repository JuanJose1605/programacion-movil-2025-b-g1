// src/utils/auth.ts
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id?: string;
  uid?: string;
  sub?: string;
  // otros campos que traiga tu token
  [key: string]: any;
}

export const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    // Ajusta esto según cómo venga tu token
    const id =
      decoded.id ||       // ej: { id: '123' }
      decoded.uid ||      // ej: { uid: '123' }
      decoded.sub ||      // ej: { sub: '123' }
      null;

    return id ?? null;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return null;
  }
};
