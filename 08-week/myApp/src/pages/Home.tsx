import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonTextarea, IonLabel, IonText, IonItem, IonInput, IonButton } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage >
      <IonContent fullscreen scrollY={false} className='background-home'>
        <img src="/ChatGPT Image 29 ago 2025, 21_04_59.png" alt="" className='image'/>       
      <IonText className="titulo">
          <h2>iniciar sesión</h2>
        </IonText>

        <IonText className="subtitulo">
          <p>Ingresa tu usuario y contraseña para ingresar</p>
        </IonText>

        <div className="form-container">
          <IonItem className="input-item">
            <IonInput placeholder="Nombre de Usuario" className='text-input'/>
          </IonItem>

          <IonItem className="input-item">
            <IonInput type="password" placeholder="Contraseña" className='text-input'/>
          </IonItem>

          <IonButton expand="block" className="btn-continuar" >
            Continuar
          </IonButton>

          <IonButton expand="block" className="btn-registrar">
            Registrate
          </IonButton>
        </div>

        <IonText className="footer">
          <p>
            Al hacer clic en continuar, aceptas nuestros{" "}
            <span className="link">Términos de servicio</span> y{" "}
            <span className="link">Política de privacidad</span>
          </p>
        </IonText>

      </IonContent>
    </IonPage>
  );
};

export default Home;
