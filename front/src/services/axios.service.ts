import axios from "axios";
import { Capacitor } from "@capacitor/core";

const isNative = Capacitor.isNativePlatform();

// const baseURL = isNative
//   ? "http://172.20.10.6:4000"  // Emulador Android accediendo a backend local
//   : "http://localhost:4000"; // Web navegador PC

export const axiosClient = axios.create({
  baseURL: "https://f52pghbs-4000.use.devtunnels.ms",
  headers: { "Content-Type": "application/json" },
});
