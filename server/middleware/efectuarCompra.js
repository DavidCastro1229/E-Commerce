const Axios = require("axios");
const dataBase = require('../dataBase/dataBase');

const calcularCart= async (req, res, next)=>{
  try{
    const {credenciales, query, cookies, cantidad} = req.body;
    const validarTipoDeCompra = req.headers["authorization"];
    let total = 0;
    let productos = []
    const result = await dataBase.query(`SELECT * FROM productos WHERE uuid in(${query.toString()})`);
    if(validarTipoDeCompra.split(' ')[1] === "onlyProduct"){
        total = result.rows[0].precio * cantidad 
        productos = `${result.rows[0].producto} : ${cantidad}`
        result.rows[0].cantidad = cantidad
        result.rows.total = total;
        result.rows.credenciales = credenciales;
        result.rows.resumen = productos;
        req.venta = result.rows;
     return next()
      }
      result.rows.forEach(element => {
        Object.entries(cookies).forEach( async ([key, value]) => {
          if(element.uuid == key){
            element.cantidad = value
              total += element.precio * value
              productos.push(`${element.producto} : ${value}, `)
            }
        })})
        result.rows.total = total
        result.rows.credenciales = credenciales
        result.rows.resumen = productos
        return console.log(credenciales)
      next()
     }
      catch (error) {
      console.log(error)
     }
    } 
    
// Middleware para obtener token y enviarlo al req para recivirlo en la api privada para validar acceso
const validarSiTokenLlego=(req, res, next)=>{
  // obtenesmo acceso al token quenos llega del lado del cliente que enviamos con la api login
  const obteninendoToken = req.headers["authorization"];
  console.log('middleware')

  // Validar si dicho token existe "se analiz el tipado "  'obtenemos el token con el metodo split'
  if(typeof obteninendoToken !== 'undefined') {
      const token= obteninendoToken.split(' ')[1]  //con esto obtenemos el token
      req.token=token //enviamos el token por el req   
      next()
  }else{
      res.sendStatus(403);
  }
}
    module.exports = {calcularCart, validarSiTokenLlego}