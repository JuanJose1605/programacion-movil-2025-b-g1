// src/pages/PedidoDetalle.tsx
import React, { useEffect, useState } from "react";
import { IonPage, IonContent, IonIcon } from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { chevronBackOutline } from "ionicons/icons";
import "./pedidosDetalle.css"; // reutilizamos estilos que ya tienes
import { axiosClient } from "../../services/axios.service";

interface Usuario {
  id_usuario: string;
  nombres: string;
  apellidos?: string;
}

interface ItemCarrito {
  id_producto: number;
  nombre: string;
  precio: number;
  cantidad?: number;  // por si lo guardaste
}

type EstadoPedido = "pendiente" | "en_camino" | "entregado" | "cancelado" | string;

interface Pedido {
  id_pedido: number;
  id_usuario: string;
  fecha_pedido: string;
  total?: number | string | null;
  direccion_envio?: string | null;
  estado: EstadoPedido;
  carrito?: ItemCarrito[] | null;
  usuario?: Usuario;
}

type RutaParams = {
  id: string;
};

const PedidoDetalle: React.FC = () => {
  const { id } = useParams<RutaParams>();
  const history = useHistory();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [cargando, setCargando] = useState(true);

  const handleGoBack = () => history.goBack();

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axiosClient.get<Pedido>(`/pedidos/${id}`);
        // si el backend devuelve carrito como JSON string o como {carrito: "..."}
        let carritoParseado: ItemCarrito[] | null = null;

        if (data && (data as any).carrito) {
          const c = (data as any).carrito;
          if (typeof c === "string") {
            try {
              carritoParseado = JSON.parse(c);
            } catch {
              carritoParseado = null;
            }
          } else {
            carritoParseado = c as ItemCarrito[];
          }
        }

        setPedido({
          ...data,
          carrito: carritoParseado ?? [],
        });
      } catch (e) {
        console.error("Error cargando pedido", e);
      } finally {
        setCargando(false);
      }
    };

    load();
  }, [id]);

  const formatCOP = (v: number | string) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(Number(v));

  const formatFecha = (fecha: string) => {
    try {
      return new Date(fecha).toLocaleString("es-CO", {
        dateStyle: "short",
        timeStyle: "short",
      });
    } catch {
      return fecha;
    }
  };

  if (cargando) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <p style={{ padding: 16 }}>Cargando pedido...</p>
        </IonContent>
      </IonPage>
    );
  }

  if (!pedido) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <p style={{ padding: 16 }}>No se encontró el pedido</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="register-bg">
          <div className="phone-frame">
            <IonIcon
              icon={chevronBackOutline}
              onClick={handleGoBack}
              style={{
                position: "absolute",
                top: "18px",
                left: "18px",
                fontSize: "28px",
                color: "#000",
                cursor: "pointer",
                zIndex: 10,
              }}
            />

            <div className="register-card">
              <img
                className="logo"
                src="../f1b28a798154152dd8d9eb0ba94b14a6285da1ae.png"
                alt="Siwventas"
              />

              <h2 className="inv-title">Detalle del pedido</h2>

              {/* INFO GENERAL DEL PEDIDO */}
              <div className="detalle-card">
                <div className="detalle-info" style={{ width: "100%" }}>
                  <h3 className="detalle-nombre">
                    Pedido #{pedido.id_pedido}
                  </h3>
                  <p className="detalle-precio">
                    Total:{" "}
                    {pedido.total != null
                      ? formatCOP(pedido.total)
                      : "Sin total"}
                  </p>

                  <p className="pedido-detalle-linea">
                    <strong>Estado:</strong> {pedido.estado}
                  </p>

                  <p className="pedido-detalle-linea">
                    <strong>Fecha:</strong> {formatFecha(pedido.fecha_pedido)}
                  </p>

                  <p className="pedido-detalle-linea">
                    <strong>Dirección de envío:</strong>{" "}
                    {pedido.direccion_envio || "No registrada"}
                  </p>

                  <p className="pedido-detalle-linea">
                    <strong>Cliente:</strong>{" "}
                    {pedido.usuario
                      ? `${pedido.usuario.nombres} ${
                          pedido.usuario.apellidos ?? ""
                        }`
                      : pedido.id_usuario}
                  </p>
                </div>
              </div>

              {/* LISTA DE ITEMS DEL CARRITO */}
              <h2 className="inv-title" style={{ marginTop: "24px" }}>
                Productos del pedido
              </h2>

              {pedido.carrito && pedido.carrito.length > 0 ? (
                <div className="productos-grid">
                  {pedido.carrito.map((item) => (
                    <div
                      key={item.id_producto}
                      className="producto-card pedido-detalle-item"
                    >
                      <div className="producto-info">
                        <p className="producto-nombre">{item.nombre}</p>

                        <p className="pedido-detalle-linea">
                          Cantidad: {item.cantidad ?? 1}
                        </p>

                        <p className="pedido-detalle-linea">
                          Precio unitario: {formatCOP(item.precio)}
                        </p>

                        <p className="pedido-detalle-linea">
                          Subtotal:{" "}
                          {formatCOP(
                            (item.cantidad ?? 1) * Number(item.precio)
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ textAlign: "center", marginTop: 12 }}>
                  Este pedido no tiene productos registrados en el carrito.
                </p>
              )}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PedidoDetalle;
