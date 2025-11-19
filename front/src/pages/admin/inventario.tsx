// src/pages/admin/Inventario.tsx
import React, { useEffect, useState, useMemo } from "react";
import { IonPage, IonContent, IonIcon } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import "./inventario.css";
import { axiosClient } from "../../services/axios.service";
// O si ya tienes un store de productos, lo importas en lugar de axios:
// import { useProductStore } from "../../store/product.store";

type Producto = {
  id_producto: string;
  nombre: string;
  precio: number;
  stock: number;
};

const Inventario: React.FC = () => {
  const history = useHistory();

  const [productos, setProductos] = useState<Producto[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [guardando, setGuardando] = useState(false);

  const handleGoBack = () => history.goBack();

  // 🔹 Cargar productos (ejemplo usando axios directamente)
  useEffect(() => {
  const load = async () => {
    try {
      const { data } = await axiosClient.get<Producto[]>("/productos");

      const normalizados = data.map((p: any) => ({
        ...p,
        stock: Number(p.stock), // 👈 asegura que sea number
      }));

      setProductos(normalizados);
    } catch (error) {
      console.error("Error cargando productos", error);
    }
  };
  load();
}, []);


  // 🔹 Filtro por texto
  const productosFiltrados = useMemo(
    () =>
      productos.filter((p) =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
      ),
    [productos, busqueda]
  );

  // 🔹 Cambiar stock en tiempo real (estado local)
  const cambiarStock = (id: string, delta: number) => {
    setProductos((prev) =>
      prev.map((p) =>
        p.id_producto === id
          ? { ...p, stock: Math.max(0, p.stock + delta) }
          : p
      )
    );
  };

  // 🔹 Guardar cambios en backend
  const handleGuardarCambios = async () => {
  try {
    setGuardando(true);

    await Promise.all(
      productos.map((p) =>
        axiosClient.patch(`/productos/${p.id_producto}`, {
          stock: String(p.stock), // 👈 lo conviertes a string si el DTO lo pide así
        })
      )
    );

    alert("Inventario actualizado");
  } catch (error) {
    console.error(error);
    alert("Error al actualizar el inventario");
  } finally {
    setGuardando(false);
  }
};


  return (
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

          {/* Título */}
          <h2 className="inv-title">Inventario</h2>

          {/* Buscador */}
          <div className="inv-search-wrapper">
            <input
              type="text"
              className="inv-search"
              placeholder="Buscar ..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          {/* Lista de productos */}
          {busqueda.trim() !== "" && (
          <div className="inv-list">
            {productosFiltrados.map((p) => (
              <div key={p.id_producto} className="inv-item">


                <div className="inv-info">
                  <h4 className="inv-name">{p.nombre}</h4>
                  <p className="inv-text">Existencia : {p.stock}</p>
                </div>

                <div className="inv-actions">
                  <button
                    className="inv-btn"
                    onClick={() => cambiarStock(p.id_producto, -1)}
                  >
                    -
                  </button>
                  <span className="inv-qty">{p.stock}</span>
                  <button
                    className="inv-btn"
                    onClick={() => cambiarStock(p.id_producto, +1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>)}

          {/* Botón actualizar */}
          <button
            className="inv-update-btn"
            onClick={handleGuardarCambios}
            disabled={guardando}
          >
            {guardando ? "Actualizando..." : "Actualizar"}
          </button>
        </div>
          
        </div>
      </div>
   

    
  );
};

export default Inventario;
