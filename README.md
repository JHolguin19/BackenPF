# BackenPF
Proyecto final


Link del Deployed en Vercel
Guia de EndPoints: 
Ruta: /api <------ Prefijo para todas las rutas
--------------------------------------
  Users
*Get: /users/
*Post: /users/register 
  first_name: String
  last_name: String
  email: String
  age: number
  password:number
*Post: /users/login
  email:String
  password: password
    Usuarios Premium: 
    email:juan@coder.com
    password:12345
    Usuarios Admin:
    email: adminCoder@coder.com'
    password: adminCoder123
*get: /users/profile
*post: /users/reset-pass
*Post: /users/new-pass
    newPassword: numbers
*Delete: /users/inactivity
--------Products-----------
  Products:
*Get: /products/
*Get: /products/:id 
  id:66f32f834e0aaeaaaabe89df <----- Example
*Post: /products/
  name:String
  description:String
  price:number
  stock:Number
*Put: /product/:id
  id:66f32f834e0aaeaaaabe89df
  name:String           |
  description:String    | Propiedad a cambiar
  price:number          |
  stock:Number          |
*delete: /product/:id
  id: 66f32f834e0aaeaaaabe89df <----- Example
-------Cart---------------------
*Get: /carts/
*Get: /carts/:idCart
  idCart:66cbd76814b66444ee519e79
*Post: /carts/products/:idProd
  idProd:66f32f834e0aaeaaaabe89df
*Delete: /carts/:idCart 
  id:66cbd76814b66444ee519e79
*Delete: /carts/:idCart/products/:idProd
  idCart:66cbd76814b66444ee519e79
  idProd:66f32f834e0aaeaaaabe89df
*Put: /carts/:idCart/products/:idProd
  idCart:66cbd76814b66444ee519e79
  idProd:66f32f834e0aaeaaaabe89df
  cantidad: CantidadProductoEnCarrito
*Delete: /carts/clear/:idCart
  idCart: 66cbd76814b66444ee519e79
---------TicketRouter--------------
*Post: /ticket/purcharse/

