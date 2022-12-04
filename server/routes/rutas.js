const { Router }= require('express')
const rutas=Router();
const {calcularCart}=require('../middleware/efectuarCompra')

const {productos, subirProducto, previaProducto, crearPago, caputurarOrden, cancelarOrden, ventas}=require('../controllers/controllers')

rutas.post('/productos/:inicio', productos );
rutas.post('/subirProducto', subirProducto );
rutas.post('/previaProducto/:producto', previaProducto );
rutas.post('/crearPago/cart', calcularCart, crearPago);
rutas.get('/caputurarOrden', caputurarOrden );
rutas.post('/cancelarOrden', cancelarOrden );
rutas.post('/ventas', ventas );

module.exports= rutas;