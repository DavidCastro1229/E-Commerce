import React from 'react';
import {useEffect, useState} from "react";
import Axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import {useCookies} from "react-cookie"
import { v4 as uuidv4 } from 'uuid';
import {TextField, FormGroup} from "@mui/material"
import {Cargando} from "./components/routes/header"

export default function Comprar() {
  const parametro=useParams();
  const navegar= useNavigate();

  const [producto, setProducto]=useState({});
  const [estado, setEstado]=useState(false)
  const [estado2, setEstado2]=useState(true)
  const [cantidad, setCantidad]=useState(parametro.cantidad)
  const [total, setTotal]=useState()
  const [inCart, setCart]=useState([])
  const [query, setQuery]=useState()
  const  [ cookies ,  setCookie ,  removeCookie ] = useCookies();
  
  const [credenciales, setCredenciales]=useState({})
  const handleChange=(e)=>{
    console.log(e.target.name)
    setCredenciales({...credenciales, [e.target.name]: e.target.value});
  }
  const pagar= async (e)=>{
    setEstado2(false)
    e.preventDefault();
    const res =  await Axios.post(process.env.REACT_APP_LOCAL ? `${process.env.REACT_APP_LOCAL}/crearPago/cart` : `/crearPago/cart`, {credenciales, query, cookies, cantidad},{
      headers:{
          "authorization": `Bearer onlyProduct`
      },
          });
    const paypal= res.data.links[1].href;
   window.location.href = paypal
   return setEstado(true)
  }
  const mostrarProducto= async ()=>{
    if(parametro.uuid){
      const res=await Axios.post(process.env.REACT_APP_LOCAL ? `${process.env.REACT_APP_LOCAL}/previaProducto/onlyProduct` : "/previaProducto/onlyProduct", {uuid:parametro.uuid})
      let query = [`'${parametro.uuid}'`]
      setQuery(query)
      setTotal(res.data[0].precio * parametro.cantidad);
      setProducto(res.data[0]);
      return setEstado(true)
    }
    let query = []
    Object.entries(cookies).forEach( async ([key, value]) => {
    query.push(`'${key}'`)
    });
    setQuery(query)
    const res=await Axios.post(process.env.REACT_APP_LOCAL ? `${process.env.REACT_APP_LOCAL}/previaProducto/cart` : "/previaProducto/cart", {query})
    agregarCantidad(res.data)
  }
  function agregarCantidad(cart){
    let total = 0;
    let productos = 0;
    cart.forEach(element => {
      Object.entries(cookies).forEach( async ([key, value]) => {
        if(element.uuid == key){
          element.cantidad = value
            total += element.precio * value
          productos += parseFloat(value) 
          }
      })})
      setTotal(total);
      setCantidad(productos)
      setCart(cart);
      setEstado(true)
  };    
  useEffect(() => {
    mostrarProducto()
  }, [])
  
  return (
<>

<form onSubmit={pagar}>
  { estado ? parametro.uuid ? <Form onChange={handleChange} producto={producto} cantidad={cantidad} total={total} />
  : <CartForm onChange={handleChange} producto={inCart} cantidad={cantidad} total={total}/> : <Cargando alto="8rem" ancho="8rem" /> }
  <aside className="justificado alto6">
  <button className="btnType1 alto100 pointer" type='onSubmit' >{estado2 ? "Pagar con Paypal" :<Cargando alto="5rem" ancho="5rem" />}</button>
  </aside>
  </form>
    </>
  )
}

function Form({onChange, producto, cantidad, total}) {
  return (
    <>
    <main className='grid padding30'>
      <article className='textType1 sinLineHeigth colorBlack'>
        <div className='ancho100 textPequeño'>
          <h1>Comprando {cantidad} productos en total </h1>
          <p className='textBlue'>envio estimado: 5 horas</p>
        </div>
        <div className='textPequeño' >
          <h3 className='resaltarText'>{producto.producto}</h3>
          <article>
            <div>
          <img className='imgGrande' src={producto.img} alt="" />
          <p className="difuminarTexto">{producto.descripcion}</p>
            </div>
            <h1 className="resaltarText textPequeño">Detalles del producto</h1>
            <div className='difuminarTexto'>
          <h1>Precio del producto: {producto.precio}$</h1>
        <p>prenda: {producto.tipo}$</p>
        <p>Estilo: {producto.estilo}</p>
          <h2 className="textBlue" >Total: ${total}</h2>
            </div>
          </article>
        </div>
      </article>
      <div >
    <h1 className="resaltarText">Referencia de envio</h1>

<FormGroup onChange={onChange}  sx={{ height:"100%", '& .MuiOutlinedInput-root':{fontSize:"1.8rem"}, "& .MuiInputLabel-root":{fontSize:"1.5rem"} }} >
    <TextField fullWidth margin="dense" label="Direccion 1" variant="outlined" name="direccion" />
    <p className='textPequeño' >Especifica una referencia de la direccion para facilitar la entrega</p>
    <p className='textPequeño' >La entrega de tu Producto sera entre 1 a 5 horas zona local</p>
    <h1 className="resaltarText">credenciales para tu compra</h1>
    <TextField  fullWidth  margin="dense" label="Nombre" variant="outlined" name="nombre" />
    <TextField  fullWidth  margin="dense" label="Apellido" variant="outlined" name="apellido" />
    <TextField  fullWidth  margin="dense" label="Pais" variant="outlined" name="pais" />
    <TextField  fullWidth  margin="dense" label="Ciudad" variant="outlined" name="ciudad" />
    <TextField  fullWidth  margin="dense" label="Recidencial, Colonia o Barrio" variant="outlined" name="recidencia" />
    <TextField  fullWidth  margin="dense" label="Numero de Casa (opcional)" variant="outlined" name="numCasa" />
    <TextField  fullWidth  margin="dense" label="Numero de Celular" type="number" variant="outlined" name="numCel" />
    <TextField  fullWidth  margin="dense" label="Correo personal" variant="outlined" name="correo_personal" />
</FormGroup>
      </div>
    </main>

    </>
    )
}

function CartForm({onChange, producto, cantidad, total}) {
  const navegar= useNavigate();
  return (
    <>
    <main className='grid padding30'>
      <article className='textType1 sinLineHeigth colorBlack'>
        <div className='ancho100 textPequeño'>
          <h1>Comprando {cantidad} productos en total </h1>
          <p className='textBlue'>envio estimado: 5 horas</p>
        </div>
        <div className='textPequeño' >
          <h3 className='resaltarText'>Carrito de compra</h3>
          <article>
            <div>
              <article className="gridCartImg">
            {producto.map((data, index)=>{
              return(
                <img key={index} className='imgGrande' src={data.img} alt="" aria-label={data.cantidad} />

              )
            })}

              </article>
          <p className="difuminarTexto">{producto.descripcion}</p>
            </div>
            <aside className='justificado'>
            <button onClick={()=>navegar("/cart")} className="btnType1 alto4 pointer">ver carrito</button>
            </aside>
            <div className='difuminarTexto'>
          <h2 className="textBlue" >Total: {total}$</h2>
            </div>
          </article>
        </div>
      </article>
      <div >
    <h1 className="resaltarText">Referencia de envio</h1>
    <TextField inputProps={{style:{fontSize:'1.8rem'}}} InputLabelProps={{style:{fontSize:'1.5rem'}}} sx={{ height:"2.4rem", marginBottom:"4.5rem", '& .MuiOutlinedInput-root':{fontSize:"1.5rem"} }} fullWidth margin="dense" label="Direccion 1" variant="outlined" name="direccion_envio" onChange={onChange} />
    <TextField inputProps={{style:{fontSize:'1.8rem'}}} InputLabelProps={{style:{fontSize:'1.5rem'}}} sx={{ height:"2.4rem", marginBottom:"4.5rem", '& .MuiOutlinedInput-root':{fontSize:"1.5rem"} }} fullWidth margin="dense" label="Direccion 2 (opcional)" variant="outlined" name="direccion_envio" onChange={onChange} />
    <p className='textPequeño' >Especifica una referencia de la direccion para facilitar la entrega</p>
    <p className='textPequeño' >La entrega de tu Producto sera entre 1 a 5 horas zona local</p>
    <h1 className="resaltarText">credenciales para tu compra</h1>
    <TextField  inputProps={{style:{fontSize:'1.8rem'}}} InputLabelProps={{style:{fontSize:'1.5rem'}}} sx={{ height:"2.4rem", marginBottom:"4.5rem", '& .MuiOutlinedInput-root':{fontSize:"1.5rem"} }} fullWidth  margin="dense" label="Nombre" variant="outlined" name="nombre" onChange={onChange} />
    <TextField  inputProps={{style:{fontSize:'1.8rem'}}} InputLabelProps={{style:{fontSize:'1.5rem'}}} sx={{ height:"2.4rem", marginBottom:"4.5rem", '& .MuiOutlinedInput-root':{fontSize:"1.5rem"} }} fullWidth  margin="dense" label="Apellido" variant="outlined" name="apellido" onChange={onChange} />
    <TextField  inputProps={{style:{fontSize:'1.8rem'}}} InputLabelProps={{style:{fontSize:'1.5rem'}}} sx={{ height:"2.4rem", marginBottom:"4.5rem", '& .MuiOutlinedInput-root':{fontSize:"1.5rem"} }} fullWidth  margin="dense" label="Pais" variant="outlined" name="pais" onChange={onChange} />
    <TextField  inputProps={{style:{fontSize:'1.8rem'}}} InputLabelProps={{style:{fontSize:'1.5rem'}}} sx={{ height:"2.4rem", marginBottom:"4.5rem", '& .MuiOutlinedInput-root':{fontSize:"1.5rem"} }} fullWidth  margin="dense" label="Ciudad" variant="outlined" name="ciudad" onChange={onChange} />
    <TextField  inputProps={{style:{fontSize:'1.8rem'}}} InputLabelProps={{style:{fontSize:'1.5rem'}}} sx={{ height:"2.4rem", marginBottom:"4.5rem", '& .MuiOutlinedInput-root':{fontSize:"1.5rem"} }} fullWidth  margin="dense" label="Recidencial, Colonia o Barrio" variant="outlined" name="recidente" onChange={onChange} />
    <TextField  inputProps={{style:{fontSize:'1.8rem'}}} InputLabelProps={{style:{fontSize:'1.5rem'}}} sx={{ height:"2.4rem", marginBottom:"4.5rem", '& .MuiOutlinedInput-root':{fontSize:"1.5rem"} }} fullWidth  margin="dense" label="Numero de Casa (opcional)" variant="outlined" name="numCasa" onChange={onChange} />
    <TextField  inputProps={{style:{fontSize:'1.8rem'}}} InputLabelProps={{style:{fontSize:'1.5rem'}}} sx={{ height:"2.4rem", marginBottom:"4.5rem", '& .MuiOutlinedInput-root':{fontSize:"1.5rem"} }} fullWidth  margin="dense" label="Numero de Celular" type="number" variant="outlined" name="numCel" onChange={onChange} />
    <TextField  inputProps={{style:{fontSize:'1.8rem'}}} InputLabelProps={{style:{fontSize:'1.5rem'}}} sx={{ height:"2.4rem", marginBottom:"4.5rem", '& .MuiOutlinedInput-root':{fontSize:"1.5rem"} }} fullWidth  margin="dense" label="Correo personal" variant="outlined" name="correo_personal" onChange={onChange} />
      </div>
    </main>

    </>
    
  )
}


