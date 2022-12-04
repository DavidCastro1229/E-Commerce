import { useState, useEffect, Fragment} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import Axios from 'axios';
import {Nav, Cargando} from "./components/routes/header"
import { useCookies } from "react-cookie";
import cart from "./components/icons/cart.png"
import {IconButton, Snackbar} from "@mui/material"
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export default function Previa() {
  const navegar=useNavigate();
  const parametro = useParams()
  const [producto, setproducto]=useState({});
  const [cantidad, setCantidad]=useState(1);
  const [estado, setEstado]=useState(false)
  const [open, setOpen] = useState(false);

  const  [ cookies ,  setCookie ,  removeCookie ] = useCookies();
  const pedirProducto= async ()=>{
    window.scroll(0,0)
    const res=await Axios.post(process.env.REACT_APP_LOCAL ? `${process.env.REACT_APP_LOCAL}/previaProducto/onlyProduct` : "/previaProducto/onlyProduct", {uuid:parametro.uuid})
    console.log(res.data);
    setproducto(res.data[0]);
    setEstado(true);
  }
  const addToCart=(name, cantidad)=>{
    setCookie(name, cantidad, {path:"/", maxAge:60*5})      
    setOpen(true)
    setTimeout(() => {
      setOpen(false)
    }, 2000);
  }
  useEffect(() => {    
    pedirProducto()
  }, []);
   return (
    <>
         <Fragment>
      <Snackbar
        open={open}
      />
      <Snackbar sx={{"& .MuiSnackbarContent-message":{fontSize:"1.5rem"}, "& .MuiPaper-root" : {backgroundColor:"green"}}} message="Agregado al carrito" open={open} onClose={() => setOpen(false)} />
    </Fragment>
    {estado ? 
    <Nav title1={'Compra de 3 o mas productos recibe 10% de descuento'} title2={producto.producto} descripcion={producto.descripcion} modoPrevia={true} />
    : <Cargando alto="8rem" ancho="8rem" />
    }
    <main className="gridPrevia marginB30 padding20">
    <div className="imgGrande">
    {estado ? <img  className="imgGrande" src={producto.img} alt="" /> : <Cargando alto="8rem" ancho="8rem" />}
    </div>
<article className='textMediano padding20'>
 <h1 className="resaltarText">{producto.producto}</h1>
 <h1 className="textBlue">Precio ${producto.precio}</h1>
 <p className="margin0">{producto.descripcion}</p>

 <aside className="justificado justificadoStart" >
  <p>Cantidad a comprar</p>
  <aside className="justificadoColumn columGap10" >
 <IconButton color="success" sx={{"& .MuiSvgIcon-root":{fontSize:"3rem"}}} >
 <KeyboardArrowUpIcon onClick={()=>setCantidad(cantidad + 1)} />
 </IconButton>
{cantidad}
 <IconButton color="success" onClick={()=> cantidad === 1 ? null : setCantidad(cantidad - 1)} sx={{"& .MuiSvgIcon-root":{fontSize:"3rem"}}}  >
 <KeyboardArrowDownIcon />
 </IconButton>
  </aside>
 </aside>
<h3 className="textBlue margin0" >Total ${producto.precio * cantidad}</h3>
 
 {/* <TextField id="standard-basic" type= label="Cantidad" helperText="numero" size="small" color="success" variant="standard" /> */}
</article>

      </main>
      <div className="justificadoColumn rowGap10 marginB30">
  <h1 className="resaltarText">Otras fotos del producto</h1>
    <div className="columGap10 gridColumn3 padding10">
 <img className="imgGrande"  src={producto.img} />
 <img className="imgGrande" src={producto.img} />
 <img className="imgGrande" src={producto.img} />
    </div>
<button className="btnType2 alto6 pointer" onClick={()=>addToCart(producto.uuid, cantidad)}>Agregar al carrito<img className="imgPequeña" src={cart}/></button>
<button className="btnType1 alto6 pointer"  onClick={()=>navegar(`/checkout/${producto.uuid}/${cantidad}`)}>¡ Compra Ahora !</button>
      </div>
      
</>
  )
}

