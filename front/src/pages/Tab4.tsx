import { IonContent, IonPage } from "@ionic/react";

import "./Tab4.css";
import { useAuthStore } from "../store/useAuth.store";
import { authStore } from "../store/authUser";

const Tab4: React.FC = () => {
  const { user, logout } = authStore();

  const nombreCompleto = user
    ? `${user.nombres} ${user.apellidos ?? ""}`.trim()
    : "Usuario";

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="admin-container">
          <img
            src="../f1b28a798154152dd8d9eb0ba94b14a6285da1ae.png"
            alt="Siwventas"
            className="admin-logo"
          />
          <h2 className="inv-title">Mi Perfil</h2>
           <p className="cuenta-greeting">Hola, {nombreCompleto}</p>
          <p style={{ fontSize: 13, color: "#000000ff" }}>
            Usuario: {user?.username}
          </p>
  
            
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;
