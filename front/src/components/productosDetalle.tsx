// src/pages/ProductoDetalle.tsx
import React, { useEffect, useState } from "react";
import { IonPage, IonContent, IonIcon } from "@ionic/react";
import { useParams, useHistory } from "react-router-dom";
import { chevronBackOutline } from "ionicons/icons";
import { axiosClient } from "../services/axios.service";
import "./ProductosDetalle.css";
import { useCartStore } from "../store/cart.store";

type Producto = {
  id_producto: number;
  nombre: string;
  precio: number ;
  imagen_url?: string;
};

type RutaParams = {
  id: string;
};

const ProductoDetalle: React.FC = () => {
  const { id } = useParams<RutaParams>();
  const history = useHistory();
  const [producto, setProducto] = useState<Producto | null>(null);
  const [unidadSeleccionada, setUnidadSeleccionada] = useState<"unidad">("unidad");
  const addToCart = useCartStore((s) => s.addToCart);
  const irADetalle = (id: number) => {
    history.push(`/producto/${id}`);
  };
  const productos = [
    {
      id: 2,
      nombre: "Carne",
      imagenUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1NcKr7MJ_RYuqqiXmQmY0Jjzw_vOkfzhJ8Q&s",
    },
    {
      id: 3,
      nombre: "Leche",
      imagenUrl: "https://media.istockphoto.com/id/1989575540/es/vector/milk-illustration.jpg?s=612x612&w=0&k=20&c=51u0AF20IZ-amvQsn79nE170-gJEv8CLttHq7AhvuKo=",
    }

  ];

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await axiosClient.get<Producto>(`/productos/${id}`);
        setProducto(data);
      } catch (e) {
        console.error("Error cargando producto", e);
      }
    };
    load();
  }, [id]);

  const formatPrecio = (precio: number | string) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(Number(precio));

  

  const handleGoBack = () => history.goBack();
  const handleAgregar = () => {
    if (!producto) return;

    addToCart({
      id_producto: producto.id_producto,
      nombre: producto.nombre,
      precio: producto.precio
    });

    history.push("/tab3"); // 👈 te lleva al carrito
  };

  if (!producto) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <p style={{ padding: 16 }}>Cargando producto...</p>
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
              <h2 className="inv-title">Detalles productos</h2>
              <div className="detalle-card">
                <div className="detalle-img-wrapper">
                  <img
                    src={producto.imagen_url || "https://via.placeholder.com/200"}
                    alt={producto.nombre}
                  />
                </div>

                <div className="detalle-info">
                  <h3 className="detalle-nombre">{producto.nombre}</h3>
                  <p className="detalle-precio">{formatPrecio(producto.precio)}</p>

                  <div className="detalle-unidades">
                    <button
                      className={
                        "detalle-chip " +
                        (unidadSeleccionada === "unidad" ? "chip-activo" : "")
                      }
                      onClick={() => setUnidadSeleccionada("unidad")}
                    >
                      Unidad
                    </button>
                    
                  </div>

                  <button className="detalle-agregar-btn" onClick={handleAgregar}>
                    Agregar
                  </button>
                </div>
              </div>

              <div>
                <h2 className="inv-title">lo Popuiar</h2>
                <div className="productos-grid">
                  {productos.map((p) => (
                    <div key={p.id} className="producto-card" onClick={() => irADetalle(p.id)}>
                      <div className="producto-img-wrapper">
                        <img src={p.imagenUrl} alt={p.nombre} />
                      </div>
                      <div className="producto-info">
                        <p className="producto-nombre">{p.nombre}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div></div>
        
        
      </IonContent>
    </IonPage>
  );
};

export default ProductoDetalle;
