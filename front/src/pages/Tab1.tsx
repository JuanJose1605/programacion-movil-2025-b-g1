import {
  IonPage,
  IonContent,
} from "@ionic/react";
import "./Tab1.css";
import { useHistory } from "react-router";
import { useAuthStore } from "../store/useAuth.store";

const Tab1: React.FC = () => {
  const history = useHistory();
  const logoutStore = useAuthStore((state) => state.logout);
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

  const goInventario = () => history.push("/admin/inventario");
  const goPedidos =   () => history.push("/admin/pedidos");
  const goAgregar =   () => history.push("/admin/agregar");

  const handleLogout = () => {
    // 1️⃣ Limpia estado global + localStorage + axios
    logoutStore();
    // 2️⃣ Navega al login
    history.replace("/login");
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="admin-container">
          <img
            src="../f1b28a798154152dd8d9eb0ba94b14a6285da1ae.png"
            alt="Siwventas"
            className="admin-logo"
          />
          <img
            src="../Gemini_Generated_Image_nr0jranr0jranr0j.png"
            alt="banner"
            className="admin-banner"
          />
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

          

          <div>
            <button
              className="inv-update-btn"
              onClick={handleLogout}
            >
              cerrar sesión
            </button>
          </div>
          <img
              className="bottom-illustration"
              src="../590de56a513e808d8dc8b85dc50e08872624e834.png"
              alt="Carrito"
            />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
