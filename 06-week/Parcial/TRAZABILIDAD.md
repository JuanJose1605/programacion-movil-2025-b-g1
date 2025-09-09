# Matriz de Trazabilidad (REQ ↔ HU ↔ UC ↔ TEST)

| Requisito | Historias de Usuario | Casos de Uso | Pruebas (Test Case) |
|-----------|----------------------|--------------|----------------------|
| RF-01 Registro de usuario | HU-01 Registro de cliente | UC-01 Registro de usuario | TC-01 Registro válido; TC-02 Usuario ya registrado; TC-03 Contraseña inválida |
| RF-02 Inicio de sesión | HU-02 Iniciar sesión | UC-02 Iniciar sesión | TC-04 Inicio válido; TC-05 Credenciales inválidas; TC-06 Bloqueo tras 5 intentos |
| RF-03 Catálogo de productos | HU-03 Ver catálogo | UC-03 Explorar catálogo de productos | TC-07 Catálogo cargado; TC-08 Catálogo vacío; TC-09 Error de conexión |
| RF-04 Realizar pedidos | HU-04 Realizar pedido | UC-04 Realizar pedido | TC-10 Pedido válido; TC-11 Producto sin stock; TC-12 Error en pago |
| RF-05 Gestión de pedidos | HU-05 Administrar pedidos | UC-05 Administrar pedidos | TC-13 Ver pedidos; TC-15 Cambiar estado pedido |

---
