# Software Requirements Specification (SRS)  
**Sistema: SIWVENTAS**  

---

## 1. Introducción  

### 1.1.1 Propósito  
Este Software Requirements Specification está dirigido para el equipo de desarrollo y al stakeholder principal (administrador del supermercado) con el fin de estar con precisión el alcance, funcionalidad, restricciones y criterios de aceptación del sistema. También servirá como base para pruebas, validación y futuras iteraciones de la aplicación.  

### 1.1.2 Alcance  
Nuestra aplicación móvil permitirá a los usuarios realizar pedidos en línea de productos de supermercado (alimentos, aseo y otros básicos) desde casa. El sistema puede:  
- Registro e inicio de sesión de clientes.  
- Exploración y selección de productos.  
- Generación de pedidos con confirmación en tiempo real. 
- Registro de productos por parte del administrador. 
- Gestión de pedidos por parte del administrador.  
- Notificaciones del pedido.  

**Qaue no hace esta aplicacion:**  
- Pagos en línea (se contempla pago contra entrega).  
- Integración con sistemas contables o facturación electrónica.  
- Módulos de cupones o recompensas.  

### 1.1.3 Definiciones, acrónimos y abreviaturas  
- **RF**: Requisito Funcional.  
- **RNF**: Requisito No Funcional.  
- **MVP**: Producto Mínimo Viable.  
- **API**: Application Programming Interface.  

### 1.1.4 Referencias  
- IEEE Std 830-1998: Recommended Practice for Software Requirements Specifications.  

### 1.1.5 Visión general del documento  
Este documento se organiza en tres grandes secciones:  
- Introducción (contexto y alcance).  
- Descripción general del producto (usuarios, restricciones, dependencias).  
- Requerimientos específicos (funcionales, no funcionales, interfaces, datos).  

---

## 1.2 Descripción general  

### 1.2.1 Perspectiva del producto  
La aplicación sera híbrida y se lanzará inicialmente en Android. Se comunicará con un backend propio mediante API REST y contará con base de datos centralizada para gestión de usuarios, productos y pedidos.  

### 1.2.2 Funciones del producto  
- Registro e inicio de sesión.  
- Catálogo de productos.  
- Carrito de compras.  
- Panel de administracion para agregar productos.
- Confirmación de pedidos.  
- Panel de administración para gestión de pedidos.  

### 1.2.3 Características de los usuarios  
- **Clientes (18-50 años):** Compradores con nivel tecnológico medio y experiencia básica en apps de domicilios.  
- **Administrador:** Persona encargada de recibir, aceptar y gestionar pedidos desde la plataforma.  

### 1.2.4 Restricciones  
- Solo disponible en Android (fase inicial).  
- Tiempo de desarrollo: 2 a 3 meses.  
- Un único desarrollador asume diseño, desarrollo y despliegue.  
- MVP sin integración de pagos en linea.  

### 1.2.5 Supuestos y dependencias  
- El usuario final contará con conexión para generar las compras.  
- El catálogo de productos será actualizado manualmente por el administrador.  

---

## 1.3 Requerimientos específicos  

### 1.3.1 Interfaces externas  
- **UI móvil (cliente):** Navegación sencilla, categorías visibles, carrito de compras.  
- **API:**  
  - `POST /api/registerUser` → Crear cuenta de usuario.  
  - `POST /api/registrarProducts` → Crear cuenta de usuario.  
  - `GET /api/products` → Listado de productos disponibles.  
  - `POST /api/orders` → Crear pedido.  

### 1.3.2 Funciones del sistema (RF)  

| ID   | Descripción | Prioridad | Criterio de aceptación |
|------|-------------|-----------|-------------------------|
| RF01 | El sistema permitirá registrar usuarios con correo y contraseña. | Alta | Dados un email válido y contraseña, se crea la cuenta y se guarda la confirmación. |
| RF02 | El usuario podrá explorar productos y buscar por catalogo. | Alta | Al buscar (lacteos), se muestra esa categoria de productos relacionados. |
| RF03 | El usuario podrá agregar productos a un carrito de compras. | Alta | Los productos seleccionados aparecen en el carrito con cantidad ajustable. |
| RF04 | El usuario podrá confirmar pedidos con dirección de entrega. | Alta | Al confirmar, se registra el pedido y se envía notificación al administrador. |
| RF05 | El administrador podrá agregar productos o modificar la cantidad de productos tiene . | Alta | Al entrar al panel, se muestra una opcion de agregar productos, se podran modificar los productos ya creados o agregar nuevos. |
| RF06 | El administrador podrá visualizar pedidos pendientes. | Alta | Al entrar al panel, se muestran pedidos ordenados por hora de creación. |
| RF07 | El administrador podrá actualizar el estado de un pedido. | Media | Al marcar “En camino”, el cliente recibe notificación. |

### 1.3.3 Rendimiento (RNF-Performance)  
- Tiempo de carga inicial ≤ 3 s en dispositivos gama media.
- Respuesta de catálogo ≤ 1 s para hasta 1000 productos.
- Soporte mínimo de 500 pedidos concurrentes.
- Procesamiento de pedidos ≤ 2 s desde confirmación hasta almacenamiento en la BD.
- Tiempo de autenticación ≤ 1.5 s en condiciones de red 4G estándar.
- Disponibilidad del sistema ≥ 99.5% mensual.  

### 1.3.4 Lógica de datos / base de datos  
- **USUARIO**: id, name, last_name, user, password.  
- **PRODUCTS**: id, name, description,category, price, stock.  
- **ORDERS**: id, user_id, status, created_at.  
- **ORDER_PRODUCTS**: id, order_id, product_id, total.  

### 1.3.5 Restricciones de diseño  
- Uso de Material Design (Android).  
- SDK mínimo Android 9.0 (Pie).  
- Framework híbrido.  

### 1.3.6 Atributos del sistema (RNF)  
- **Seguridad:** almacenamiento seguro de credenciales.  
- **Disponibilidad:** 99% dependiendo del backend.  
- **Mantenibilidad:** Código estructurado en módulos.  
- **Portabilidad:** Posible despliegue en iOS en fases futuras.  
- **Accesibilidad:** Contraste AA, soporte a lector de pantalla.  

### 1.3.8 Requisitos legales y de privacidad  
- Cumplir con la Ley de Protección de Datos Personales.  
- Políticas de privacidad y consentimiento informado al registrarse.  

---

## 1.4 Apéndices  
- Mockups de pantallas iniciales.  
- DER simplificado de base de datos.  
- Políticas de tratamiento de datos.  

---