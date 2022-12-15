const dataBase = require('../dataBase/dataBase');
const jwt =require('jsonwebtoken');
const Axios =require("axios");
let credencialesUser;
let venta;

const productos =async (req, res)=>{
  const {producto, estilo, genero, color} = req.body
  const inicio = req.params.inicio
  console.log("body", req.body)
    try {
      if(inicio == "search"){
        console.log("se ejecuta")
        console.log(producto)
        const result = await dataBase.query(`SELECT * FROM productos WHERE disponibilidad ='true' ${producto[0] ? `AND producto LIKE('%${producto[0]}%')` : ""}  ${producto[1] ? `AND etiquetas LIKE('%${producto[1]}%')` : ""} ${producto[2] ? `AND etiquetas LIKE('%${producto[2]}%')` : ""} ${producto[3] ? `AND etiquetas LIKE('%${producto[3]}%')` : ""} ${producto[4] ? `AND etiquetas LIKE('%${producto[4]}%')` : ""} ${producto[5] ? `AND etiquetas LIKE('%${producto[5]}%')` : ""} ${producto[6] ? `AND etiquetas LIKE('%${producto[6]}%')` : ""} ${producto[7] ? `AND etiquetas LIKE('%${producto[7]}%')` : ""} ORDER BY producto ASC`);
        return res.send(result.rows);
      }    
      if(inicio == "inicio"){
      const result = await dataBase.query(`SELECT * FROM productos`);
      return res.send(result.rows);
    }
    if(producto == "todo"){
        const result = await dataBase.query(`SELECT * FROM productos WHERE disponibilidad = 'true' ${estilo ? `AND estilo = '${estilo}'` : ""} ${genero ? `AND genero = '${genero}'` : ""} ${color ? `AND color = '${color}'` : ""}`);
        return res.send(result.rows);
    }
    if(producto != "todo"){
        const result = await dataBase.query(`SELECT * FROM productos WHERE disponibilidad = 'true' AND tipo = $1 ${estilo ? `AND estilo = '${estilo}'` : ""} ${genero ? `AND genero = '${genero}'` : ""} ${color ? `AND color = '${color}'` : ""}`, [producto]);
       return res.send(result.rows);
      }
} catch (error) {
 console.log(error)
}
}

const subirProducto =async (req, res)=>{
  try {    
    const { producto, precio, descripcion, img, uuid, tipo, estilo, genero, color,  disponibilidad, etiquetas} = req.body
    console.log(req.body)
    await dataBase.query('INSERT INTO productos ( producto, precio, descripcion, img, uuid, tipo, estilo, genero, color,  disponibilidad, etiquetas ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11 )', [ producto, precio, descripcion, img, uuid, tipo, estilo, genero, color,  disponibilidad, etiquetas]);
    res.send('peticion post correcta')
  } catch (error) {
    console.log(error)
  }
}

const previaProducto = async (req, res) => {
    try {
      if(req.params.producto == "onlyProduct" ){
        const { uuid } = req.body;
        const result = await dataBase.query("SELECT * FROM productos WHERE uuid = $1" , [uuid]);
        return res.send(result.rows)
      };
      const { query } = req.body;
      const result = await dataBase.query(`SELECT * FROM productos WHERE uuid in(${query.toString()})`);
     return res.send(result.rows)
    }
    catch (error) {
        console.log(error)
    }
};

const crearPago= async (req, res)=>{
    try {
  venta = req.venta;
  const order={
    intent:"CAPTURE",
    purchase_units:[{
      amount:{
        currency_code:"USD",
        value:req.venta.total,
      },
      description:req.venta.resumen
    }],
    application_context:{
      brand_name:"ShopeEcomers",
      lading_page:"NO PERFORMANCE",
      user_action:"PAY_NOW",
      return_url:"http://localhost:4000/caputurarOrden",
      cancel_url:"http://localhost:4000/cancelarOrden"      
    }
  };
  const parametro = new URLSearchParams();
  parametro.append("grant_type", "client_credentials");
  console.log("sssddddddd")
        const { data: {access_token} } = await Axios.post(`https://api-m.sandbox.paypal.com/v1/oauth2/token`, parametro ,{
          headers:{
            "Content_Type" : "application/x-www-form-urlencoded",
          },
          auth:{
            username:"AYpDFrrRrtNXIMIpzV8YQRHdygd4N2_OM5IRl75vrVRhfTmTDDUXhjfvgniT-d9eBU9QTclzNIopMGdm",
            password:"EFWe8Hr3qXpqYn4ft5Mklf_6zJI5sLYkPb2TBpefwR0HenikpReo_P-1xW39y41WcjoftvhSKTelPaI4",
          }
        });
        const response=await Axios.post(`https://api-m.sandbox.paypal.com/v2/checkout/orders`, order,{
          headers:{
            authorization:`Bearer ${access_token}`        }
        });
        res.json(response.data)
      
    } catch (error) {
      console.log(error)
    }    
}

const caputurarOrden=async (req, res)=>{
  try {
    console.log("capturando orden", venta)
    var hoy = new Date();
    var fecha= `${hoy.getDate()}_${(hoy.getMonth()+1)}_${hoy.getFullYear()}`;
    var hora = `${hoy.getHours()}:${hoy.getMinutes()}:${hoy.getSeconds()}`;
    var fecha_venta=`fecha: ${fecha} hora: ${hora}`;
    console.log("linea 110", req.query);
    await dataBase.query("INSERT INTO ventas ( fecha_venta, productos ) VALUES($1, $2)" , [fecha_venta, JSON.stringify(venta)]);
    return res.redirect('http://localhost:3000')
} catch (error) {
console.log(error)
}

}

const cancelarOrden=async (req, res)=>{
    return res.redirect('http://localhost:3000')
}
const ventas = async (req, res)=>{
  const result = await dataBase.query("SELECT * FROM ventas")
  res.send(result.rows)
}


module.exports={productos, subirProducto, previaProducto, crearPago, caputurarOrden, cancelarOrden, ventas}