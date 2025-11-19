import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './agregar.css';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { useProductStore } from '../../store/product.store';
import { chevronBackOutline } from 'ionicons/icons';

const initialFormData = {
  nombre: "",
  descripcion: "",
  precio: "",
  stock: "",
};
const agregar: React.FC = () => {
  const { setUser } = useProductStore();
  const history = useHistory();
  const handleGoBack = () => {
    history.goBack(); // 🔹 vuelve a la ruta anterior
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange =
    (key: keyof typeof formData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [key]: e.target.value }));
      };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nombre.trim()) {
      alert("El nombre del producto es obligatorio.");
      return;
    }
    if (!formData.descripcion.trim()) {
      alert("La descripcion del producto es obligatorio.");
      return;
    }
    if (!formData.precio.trim()) {
      alert("El precio del producto es obligatorio.");
      return;
    }
    if (Number(formData.precio) <= 0) {
      alert("El precio debe ser mayor a 0");
      return;
    }
    if (!formData.stock.trim()) {
      alert("El stock del producto es obligatorio.");
      return;
    }
    if (Number(formData.stock) <= 0) {
      alert("El stock debe ser mayor a 0");
      return;
    }


    try {
      await setUser(formData);
      alert("Producto creado con éxito");
      setFormData(initialFormData);

      // puedes redirigir o limpiar el formulario si quieres
    } catch (error) {
      alert("Error al crear el Producto");
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
        <form className="register-card" onSubmit={handleSubmit}>
          <img
            className="logo"
            src="../f1b28a798154152dd8d9eb0ba94b14a6285da1ae.png"
            alt="Siwventas"
          />

          <div className="spacer" />


          <input
            className="input"
            type="text"
            placeholder="Nombre del producto"
            value={formData.nombre}
            onChange={handleChange("nombre")}
          />

          <input
            className="input"
            type="text"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={handleChange("descripcion")}
          />

          <input
            className="input"
            type="number"
            placeholder="Precio"
            value={formData.precio}
            onChange={handleChange("precio")}
          />
          <input
            className="input"
            type="number"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange("stock")}
          />



          <button className="btn btn-primary" type="submit">
            Crear Producto
          </button>
        </form>

        {/* Carrito “escondido” */}
        {/* <img
              className="bottom-illustration"
              src="../590de56a513e808d8dc8b85dc50e08872624e834.png"
              alt="Carrito"
            /> */}
      </div>
    </div>


  );
};

export default agregar;
