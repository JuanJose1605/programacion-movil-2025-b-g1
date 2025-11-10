import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { useHistory } from 'react-router';

const Tab1: React.FC = () => {
  const history = useHistory();

  // 🔹 Funciones para redirigir
  const goInventario = () => history.push("/admin/inventario");
  const goPedidos = () => history.push("/admin/pedidos");
  const goAgregar = () => history.push("/admin/agregar");

  return (
    <div className="admin-container">
      <img src="../f1b28a798154152dd8d9eb0ba94b14a6285da1ae.png" alt="Siwventas" className="admin-logo" />
      <img src="../Capture.PNG" alt="banner" className="admin-banner" />

      <h3 className="section-title">Opciones</h3>
      <div className="admin-buttons">
        <div className="admin-btn" onClick={goInventario}>
          <img src="../f75e4ce9c0f4b0a698516a355b080a48e2f7b98e.png" alt="Inventario" />
          
        </div>

        <div className="admin-btn" onClick={goPedidos}>
          <img src="../5a551eff6324757a584fd8faac9eb0442d99a04f.png" alt="Pedido" />
          
        </div>

        <div className="admin-btn" onClick={goAgregar}>
          <img src="../954e8b4a4e92060d1f8bc4bf3bd7d8e838685a63.png" alt="Agregar producto" />
         
        </div>
      </div>
    </div>
  );
};

export default Tab1;
