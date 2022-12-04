import React from 'react';
import {Cargando} from "./components/routes/header";
import {useState, useEffect} from "react"
import { useNavigate } from 'react-router-dom';
import {useCookies} from "react-cookie"
import Axios from "axios"
import cartImg from "./components/icons/cart.png"
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, Snackbar  } from "@mui/material";
export default function Cart() {
  const navegar = useNavigate();
  const [estado, setEstado]=useState(false);
  let [inCart, setCart]=useState([]);
  const [precio, setPrecio]=useState([]);
  const  [ cookies ,  setCookie ,  removeCookie ] = useCookies();
  const [open, setOpen] = useState(false);
  const cart= async()=>{
    if(cookies === undefined || null) return; 
    let query = []
    Object.entries(cookies).forEach( async ([key, value]) => {
    query.push(`'${key}'`)
    });
    let cart=null;
    const res=await Axios.post(process.env.REACT_APP_LOCAL ? `${process.env.REACT_APP_LOCAL}/previaProducto/cart` : "/previaProducto/cart", {query});
    cart = res.data
    console.log("linea 25", cart)
    agregarCantidad(cart)
  };
const agregarCantidad = (cart)=>{
    console.log("linea 29", cart)
    let total = 0
    cart.forEach(element => {
      Object.entries(cookies).forEach( async ([key, value]) => {
        if(element.uuid == key){
          element.cantidad = value
          total += element.precio * value
          }
        }
        )})
      setCart(cart);
      setPrecio(total);
     setEstado(true) 
  };      
  const render=()=>{
        if(Object.entries(cookies).length===0){
          return(<h1>no hay nada en tu carrito</h1>)
        }else{
          return(
            <Cargando alto="8rem" ancho="8rem" />
            )
        }
      }
      const remover=async(uuid)=>{
        setEstado(false)
        removeCookie(uuid);
        setOpen(true)
        setTimeout(() => {
          setOpen(false)
        }, 2000);
            }
      useEffect(()=>{
        cart()
      }, [])
      useEffect(() => {
        cart()
      }, [cookies]) 
      return (
        <>
         <React.Fragment>
      <Snackbar
        open={open}
      />
      <Snackbar sx={{"& .MuiSnackbarContent-message":{fontSize:"1.5rem"}, "& .MuiPaper-root" : {backgroundColor:"red"}}} message="Eliminado" open={open} onClose={() => setOpen(false)} />
    </React.Fragment>
        <div className='justificadoColumn fondoWhite sticky top1 index9'> <h1>Carrito</h1><img className='imgPequeña' src={cartImg}/> 
        <br/>
        <div> <h1 className='difuminarTexto'>tienes   {Object.entries(cookies).length} productos en tu carrito <br /> total: ${precio}</h1></div>
        </div>


        <div>

        </div>
        {
        estado ?  
         inCart.map((data, index)=>{
           return(
             <article className='articleCart' key={index}>
               <div className='justificado justificadoStart '>
                 <div className='margin30' >
               <img width={100} height={100} src={data.img} />
                 </div>
                 <article>
                   <h2 className="textMayuscula">{data.producto}</h2><br />
                   <p className='difuminarTexto textPequeño'>{data.descripcion}</p> <br />
                   <h1>cantidad {data.cantidad}</h1>
                   <h2>subtotal {data.precio * data.cantidad}</h2>
                   <h3>${data.precio}</h3>
                 </article>
               </div>
                 <aside className='justificado'>
  <IconButton onClick={()=>remover(data.uuid)} aria-label="add to shopping cart" size="large">
  <DeleteIcon style={{fontSize:"2.5rem"}}/>
</IconButton>
                 <button onClick={()=>navegar(`/previa/${data.uuid}`)} className='btnType2 ancho40 pointer'>ver producto</button>
                 </aside>
                 <address>
                 </address>
             </article>
           )

            }) :  render() }
        <div onClick={()=>navegar('/checkout/cart')} className="justificado margin30 alto6 sticky bottom3"><button className='btnType1 pointer ancho40 alto100'>Pagar Todo</button></div>


        
    </>
  )
}
