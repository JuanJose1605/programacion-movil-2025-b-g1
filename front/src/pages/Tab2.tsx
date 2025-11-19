import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { useEffect, useState } from 'react';
import { axiosClient } from '../services/axios.service';
import { useHistory } from 'react-router';
import { useCartStore } from '../store/cart.store';

interface Producto {
  id_producto: number;
  nombre: string;
  precio: number;
  imagen_url: string;
}
const Tab2: React.FC = () => {
    const history = useHistory();
    const [producto, setProducto] = useState<Producto | null>(null);
      
    const addToCart = useCartStore((s) => s.addToCart);

    
  
  const [productos, setProductos] = useState<Producto[]>([]);
  const irADetalle = (id: number) => {
    history.push(`/producto/${id}`);
  };
   const handleAgregar = () => {
    if (!producto) return;

    addToCart({
      id_producto: producto.id_producto,
      nombre: producto.nombre,
      precio: producto.precio
    });

    history.push("/tab3"); // 👈 te lleva al carrito
  };
  const formatCOP = (v: number) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(v);

  // 🔥 Traer productos que ya tienes en el backend
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const resp = await axiosClient.get("/productos"); // ajusta la ruta si es distinta
        // Si tu backend devuelve { productos: [...] } usa resp.data.productos
        setProductos(resp.data);
        setProducto(resp.data);
      } catch (err) {
        console.error(err);
        alert("Error cargando productos");
      }
    };

    fetchProductos();
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
         <div className="admin-container">
          <img
            src="../f1b28a798154152dd8d9eb0ba94b14a6285da1ae.png"
            alt="Siwventas"
            className="admin-logo"
          />
          <h2 className="inv-title">Productos</h2>
          <div className="productos-grid">
          {productos.map((p) => (
            <div key={p.id_producto} className="producto-card">
              <div className="producto-img-wrapper" onClick={() => irADetalle(p.id_producto)}>
                <img src={p.imagen_url} alt={p.nombre} />
              </div>

              <p className="producto-nombre">{p.nombre}</p>
              <p className="producto-precio">{formatCOP(p.precio)}</p>
               
            </div>
          ))}
         
        </div>
  
            
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
