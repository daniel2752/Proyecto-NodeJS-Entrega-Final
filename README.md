# API del Curso

Esta es una API simple para gestionar productos. Proporciona endpoints para obtener la lista de productos y detalles de cada producto.

## Endpoints

- `GET /api/productos`: Obtiene la lista de todos los productos.
- `GET /api/productos/:id`: Obtiene los detalles de un producto específico por su ID.
- `POST /api/productos`: Crea un nuevo producto.
- `PUT /api/productos/:id`: Actualiza un producto existente por su ID.
- `DELETE /api/productos/:id`: Elimina un producto existente por su ID.

## Ejemplo de respuesta

[
{ "id": 1, "nombre": "Producto 1", "precio": 100, "categoryId": 1 },
{ "id": 2, "nombre": "Producto 2", "precio": 200, "categoryId": 2 }
]

## Contrato de productos

| Necesidad              | Método | Endpoint            | Respuesta esperada                | Estado principal esperado |
| ---------------------- | ------ | ------------------- | --------------------------------- | ------------------------- |
| Listar Productos       | GET    | /api/productos      | Array Productos en JSON           | 200                       |
| Obtener un producto    | GET    | /api/productos/{id} | Objeto Producto en JSON           | 200                       |
| Crear un producto      | POST   | /api/productos      | Un objeto Producto en JSON con ID | 201                       |
| Actualizar un producto | PUT    | /api/productos/{id} | Un objeto Producto en JSON        | 200                       |
| Eliminar un producto   | DELETE | /api/productos/{id} | Confirmación o sin contenido      | 200 o 204                 |

## Login

POST /api/auth/login recibe las credenciales de usuario en el cuerpo (body) de la petición y devuelve el Bearer token si son válidas o un error de autenticación en caso contrario.

## Register

POST /api/auth/register recibe las credenciales de usuario en el cuerpo (body) de la petición y devuelve el id del usuario con su email.
