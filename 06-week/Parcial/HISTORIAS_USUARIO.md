# 2. Historias de Usuario (HU)

Las historias de usuario complementan el SRS con enfoque en el **valor para el usuario**.  
Cada historia incluye su prioridad, criterios de aceptación y trazabilidad con los RF/RNF.

---

## HU01 - Registro de usuario
| ID   | Como (rol) | Quiero (objetivo)        | Para (beneficio)                       | Prioridad | RF/RNF relacionados |
|------|------------|--------------------------|----------------------------------------|-----------|---------------------|
| HU-01 | Cliente    | registrarme con nombre, apellido,usuario y password   | acceder a las funciones de la app       | Alta      | RF01 / API   |

**Criterios de aceptación (Gherkin):**
Escenario: Registro exitoso 
Dado que ingreso un nombre, apellido, usuario válido y una contraseña 
Cuando presiono "Registrar"
Entonces se debe crear la cuenta


---

## HU02 - Visualización de productos
| ID   | Como (rol) | Quiero (objetivo)           | Para (beneficio)              | Prioridad | RF/RNF relacionados |
|------|------------|-----------------------------|-------------------------------|-----------|---------------------|
| HU02 | Cliente    | ver productos por categoría | planificar mejor mis compras   | Media     | RF02 / Catálogo     |

**Criterios de aceptación (Gherkin):**
Escenario: Filtrar productos por categoría
Dado que existen productos en varias categorías
Cuando selecciono la categoría "Aseo"
Entonces se debe mostrar un listado solo con los productos de esa categoría


---
## HU04 - Agregar productos
| ID   | Como (rol) | Quiero (objetivo)                 | Para (beneficio)               | Prioridad | RF/RNF relacionados |
|------|------------|-----------------------------------|--------------------------------|-----------|---------------------|
| HU04 | administrador    | agregar productos o modificar  | crear nuevos o agregar stock| alta     | RNF-Backed productos      |

**Criterios de aceptación (Gherkin):**
Escenario: Productos nuevos
Dado que hay un nuevo producto
Cuando el administrador accede a la sección productos
Entonces podrar crear un nuevo producto

---
## HU05 - Gestión de pedidos por administrador
| ID   | Como (rol)     | Quiero (objetivo)      | Para (beneficio)                          | Prioridad | RF/RNF relacionados   |
|------|----------------|------------------------|-------------------------------------------|-----------|-----------------------|
| HU05 | Administrador  | visualizar pedidos     | gestionarlos de forma eficiente            | Alta      | RF04 / Backend pedidos|

**Criterios de aceptación (Gherkin):**
Escenario: Listado de pedidos pendientes
Dado que existen varios pedidos
Cuando el administrador accede a la sección "Pedidos"
Entonces debe visualizar un listado con esos pedidos


