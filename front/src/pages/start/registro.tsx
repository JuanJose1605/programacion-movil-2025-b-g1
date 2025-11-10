import React, { useState } from "react";
import "./registro.css";
import { useHistory } from "react-router";
import { InputChangeEventDetail, InputCustomEvent, IonIcon } from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import { useUserStore } from "../../store/user.store";


const Registro: React.FC = () => {
  const { setUser } = useUserStore();
  const history = useHistory();
  const handleGoBack = () => {
    history.goBack(); // 🔹 vuelve a la ruta anterior
  };

  const [formData, setFormData] = useState({
    id_usuario: "",
    nombres: "",
    apellidos: "",
    username: "",
    password: "",
  });

  const handleChange =
    (key: keyof typeof formData) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [key]: e.target.value }));
      };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await setUser(formData);
      alert("usuario creado con éxito");
      // puedes redirigir o limpiar el formulario si quieres
    } catch (error) {
      alert("Error al crear el usuario");
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
            type="number"
            placeholder="Documento"
            value={formData.id_usuario}
            onChange={handleChange("id_usuario")}
          />
          <input
            className="input"
            type="text"
            placeholder="Nombres"
            value={formData.nombres}
            onChange={handleChange("nombres")}
          />

          <input
            className="input"
            type="text"
            placeholder="Apellidos"
            value={formData.apellidos}
            onChange={handleChange("apellidos")}
          />

          <input
            className="input"
            type="text"
            placeholder="Nombre de usuario"
            value={formData.username}
            onChange={handleChange("username")}
          />

          <input
            className="input"
            type="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange("password")}
          />

          <button className="btn btn-primary"  type="submit">
            Crear Usuario
          </button>

          <p className="terms">
            Al hacer clic en continuar, aceptas nuestros{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>
              Términos de servicio
            </a>{" "}
            y{" "}
            <a href="#" onClick={(e) => e.preventDefault()}>
              Política de privacidad
            </a>
          </p>
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

export default Registro;
