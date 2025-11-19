import {
  Redirect,
  Route,
  useLocation
} from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { bag, ellipse, home, person, square, triangle, wine } from "ionicons/icons";

import Tab1 from "./pages/Tab1";
import Tab2 from "./pages/Tab2";
import Tab3 from "./pages/Tab3";
import Login from "./pages/start/login";

/* Ionic Core CSS */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/palettes/dark.system.css";
import "./theme/variables.css";
import Registro from "./pages/start/registro";
import homeAdmin from "./pages/admin/homeAdmin";
import agregar from "./pages/admin/agregar";
import inventario from "./pages/admin/inventario";
import pedidos from "./pages/admin/pedidos";
import Tab4 from "./pages/Tab4";
import ProductoDetalle from "./components/productosDetalle";
import PedidoDetalle from "./pages/admin/pedidosDetalle";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        {/* 👇 Hook debe ir dentro de IonReactRouter */}
        <InnerApp />
      </IonReactRouter>
    </IonApp>
  );
};

// ✅ Mueve la lógica aquí
const InnerApp: React.FC = () => {
  const location = useLocation();
  const hideTabRoutes = ["/login", "/registro", "/homeAdmin", "/agregar", "/inventario", "/pedidos", "/pedido/:id"];
const hideTabs = hideTabRoutes.some((route) => {
    // para rutas con parámetros dinámicos
    if (route.includes("/:")) {
      const base = route.split("/:")[0]; // "/pedido"
      return location.pathname.startsWith(base + "/");
    }
    // rutas exactas
    return location.pathname === route;
  });
  return (
    <>
      {/* Rutas sin Tabs */}
      <Route exact path="/login" component={Login} />
      <Route exact path="/registro" component={Registro} />
      <Route exact path="/homeAdmin" component={homeAdmin} />
      <Route exact path="/agregar" component={agregar} />
      <Route exact path="/inventario" component={inventario} />
      <Route exact path="/pedidos" component={pedidos} />
      <Route path="/pedido/:id" component={PedidoDetalle}  />

      <Route exact path="/">
        <Redirect to="/login" />
      </Route>

      {/* Rutas con Tabs */}
      {!hideTabs && (
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tab1" component={Tab1} />
            <Route exact path="/tab2" component={Tab2} />
            <Route exact path="/tab3" component={Tab3} />
            <Route exact path="/tab4" component={Tab4} />
            <Route exact path="/producto/:id" component={ProductoDetalle} />

            

          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon icon={wine} />
              <IonLabel>Productos</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab3" href="/tab3">
              <IonIcon icon={bag} />
              <IonLabel>Carrito</IonLabel>
            </IonTabButton>
            {/* <IonTabButton tab="tab4" href="/tab4">
              <IonIcon icon={person} />
              <IonLabel>Perfil</IonLabel>
            </IonTabButton> */}
          </IonTabBar>
        </IonTabs>
      )}
    </>
  );
};

export default App;
