import React, { useState } from "react";
import "./login.css";
import { useHistory } from "react-router";
import { useAuthStore } from "../../store/useAuth.store";



const Login: React.FC = ({ }) => {
 const { login, loading, error, mensaje, isAuthenticated } = useAuthStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleRegisterClick = () => {
    history.push("/registro"); // 🔹 Navegar al registro
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const { ok, panelPath } = await login(username, password);
  if (!ok) return; // aquí puedes mostrar el error del store
  history.push(panelPath); // /panel-admin o /panel-cliente
};

  return (
    <div className="login-bg">
      <div className="phone-frame">
        <form className="login-card" onSubmit={handleSubmit}>
          {/* Logo */}
          <img
            className="logo"
            src="../f1b28a798154152dd8d9eb0ba94b14a6285da1ae.png"
            alt="Siwventas"
          />

          {/* Títulos */}
          <h1 className="title">iniciar sesión</h1>
          <p className="subtitle">
            Ingresa tu usuario y contraseña para ingresar
          </p>

          {/* Inputs */}
          <label className="sr-only" htmlFor="usuario">
            Nombre de Usuario
          </label>
          <input
            id="usuario"
            className="input"
            type="text"
            placeholder="Nombre de Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
          />

          <label className="sr-only" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            className="input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          {/* Botones */}
          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Continuar"}
          </button>

          <button
            className="btn btn-secondary"
            type="button"
            onClick={handleRegisterClick}
          >
            Registrate
          </button>

          {/* Términos */}
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

        {/* Imagen inferior (frutas) */}
        {/* <img
          className="bottom-illustration"
          src="../590de56a513e808d8dc8b85dc50e08872624e834.png"
          alt="ilustración mercado"
        /> */}
      </div>
    </div>
  );
};

export default Login;
