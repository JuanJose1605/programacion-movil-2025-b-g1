import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { useHistory } from 'react-router';
import { useCartStore } from '../store/cart.store';
import { useState } from 'react';
import { axiosClient } from '../services/axios.service';
import { getUserIdFromToken } from '../store/idAuth';

const Tab3: React.FC = () => {
  const history = useHistory();
  const { items, subtotal, clearCart,removeFromCart  } = useCartStore();
  const [direccion, setDireccion] = useState("");
  const [enviando, setEnviando] = useState(false);


  const formatCOP = (v: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(v);

  const handleHacerPedido = async () => {
    if (!direccion.trim()) {
      alert("Por favor ingresa una dirección de envío");
      return;
    }
    if (items.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    try {
      setEnviando(true);

      // ⚠️ Ajusta esto: idealmente id_usuario viene del login / token
      const id_usuario = getUserIdFromToken();

      const body = {
        id_usuario,
        direccion_envio: direccion,
        total: subtotal(),
        carrito: items, // 👈 mandamos TODO el array del carrito tal cual
      };

      await axiosClient.post("/pedidos", body);

      alert("Pedido creado correctamente");
      clearCart();
      history.push("/tab2"); // o a pantalla de confirmación
    } catch (err) {
      console.error(err);
      alert("Error al crear el pedido");
    } finally {
      setEnviando(false);
    }
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
          <h2 className="inv-title">Carrito de compras</h2>
          <div className="cart-section">
            <label>Dirección de envío</label>
            <input
              className="cart-input"
              type="text"
              placeholder="Ingresa tu dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>

          {/* Lista de items */}
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id_producto} className="cart-item-row">
                {/* <div className="cart-item-img-wrapper">
                  <img
                    src={item.imagen_url || "https://via.placeholder.com/64"}
                    alt={item.nombre}
                  />
                </div> */}
                <div className="cart-item-desc">
                  <p className="cart-item-name">{item.nombre}</p>
                  <p className="cart-item-qty">
                    Cantidad: {item.cantidad}
                  </p>
                </div>
                <div className="cart-item-price">
                  {formatCOP(item.precio * item.cantidad)}
                </div>
               <button
        className="cart-item-remove-btn"
        onClick={() => removeFromCart(item.id_producto)}
      >
        X
      </button>
              </div>
            ))}
          </div>

          {/* Totales */}
          <div className="cart-summary">
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>{formatCOP(subtotal())}</span>
            </div>
            <div className="cart-summary-row">
              <span>Envío</span>
              <span>Gratis</span>
            </div>
            <div className="cart-summary-row cart-summary-total">
              <span>Total</span>
              <span>{formatCOP(subtotal())}</span>
            </div>
          </div>

          <button
            className="cart-submit-btn"
            onClick={handleHacerPedido}
            disabled={enviando}
          >
            {enviando ? "Enviando pedido..." : "Hacer pedido"}
          </button>
        </div>


        
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
