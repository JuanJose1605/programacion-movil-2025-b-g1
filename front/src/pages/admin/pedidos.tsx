import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './pedidos.css';
import { useHistory } from 'react-router';
import { chevronBackOutline } from 'ionicons/icons';
import { usePedidosStore } from '../../store/pedidos.store';
import { useEffect, useState } from 'react';
import { axiosClient } from '../../services/axios.service';

interface Usuario {
  id_usuario: string;
  nombres: string;
  apellidos?: string;
}
interface Pedidos { id_pedido: number; id_usuario: string; usuario?: Usuario;}


const pedidos: React.FC = () => {
  const history = useHistory();
  const [pedido, setProducto] = useState<Pedidos | null>(null);
  const [productos, setProductos] = useState<Pedidos[]>([]);
  const handleGoBack = () => history.goBack();
  const { pedidos, loading, error, fetchPedidos } = usePedidosStore();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const resp = await axiosClient.get("/pedidos");
        setProductos(resp.data); 
      } catch (err) { console.error(err); alert("Error cargando pedidos"); }
    }; fetchProductos();
  }, []);
  const irADetalle = (id: number) => {
    history.push(`/pedido/${id}`);
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
          <h2 className="inv-title">Pedidos</h2>


          <div className="pedidos-lista">
            {productos.map((p) => (
              <div key={p.id_pedido} className="pedido-item">
                <div className="pedido-left">
                  {/* <div className="pedido-avatar-wrapper">
                  <span className="pedido-dot" />
                  <img
                    className="pedido-avatar"
                    src={p.usuario?.avatarUrl || "/assets/avatar-default.png"}
                    alt={p.usuario?.nombres || "Usuario"}
                  />
                </div> */}

                  <div className="pedido-info">
                    <div className="pedido-top-row">
                      <span className="pedido-nombre">
                        {p.usuario?.nombres
                ? `${p.usuario.nombres} ${p.usuario.apellidos ?? ""}`
                : p.id_usuario}
                      </span>
                    </div>
                    <p className="pedido-subtitulo">
                      Realizo un pedido
                    </p>
                  </div>
                </div>

                <button
                  className="pedido-btn-revisar"
                  onClick={() => irADetalle(p.id_pedido)}
                >
                  Revisar
                </button>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>

  );
};

export default pedidos;
