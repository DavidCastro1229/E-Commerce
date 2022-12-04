import React from 'react'
import search from "../icons/search.png"
import {useNavigate} from "react-router-dom"
import { useRef, useState } from 'react'
import {CircularProgress, IconButton, TextField, InputAdornment} from "@mui/material"
import { ShoppingCartOutlined as ShoppingCartOutlinedIcon } from "@material-ui/icons";
import { WidgetsRounded as WidgetsRoundedIcon } from "@material-ui/icons";
import { Search as SearchIcon  } from "@material-ui/icons";
import logo from "../icons/logo.png"
import anuncio from "../icons/anuncio1.jpeg"
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
export default function Header() {
  const navegar = useNavigate()

  const busqueda = async (e)=>{
        if (e.which == '13') {
          navegar(`/search/${e.target.value.toLowerCase()}`)
        }
    }

 
  return (
  <>
          <header className='header1 alto10'>
        <nav className="justificado justificadoBetween alto70por">
          <div className="ancho40 alto100 justificado"><img className='ancho10 alto100 pointer' onClick={()=>navegar('/')} src={logo}/></div>          
      <aside className="searchContainer" >
           <TextField onKeyPress={busqueda} label="Buscar" id="outlined-basic" variant="outlined" sx={{"& .MuiFormLabel-root":{fontSize:"1.5rem"},"& .MuiOutlinedInput-notchedOutline":{borderRadius:"4rem", fontSize:"1.5rem"}, "& .MuiSvgIcon-root":{fontSize:"3rem"}, "& .MuiOutlinedInput-input":{fontSize:"1.6rem"}}} />
      </aside>
           <div className='justificado ancho40'>
              <IconButton onClick={()=>navegar("/cart")} aria-label="add to shopping cart" size="large">
  <ShoppingCartOutlinedIcon style={{fontSize:"4rem", color:"black"}}   />
  </IconButton>
              <IconButton onClick={()=>{window.location.href = "https://wa.pe/David50512"}} color="primary" aria-label="whatsApp" size="large">
  <WhatsAppIcon style={{fontSize:"4rem"}}  />
  </IconButton>
              </div>
               </nav>
      </header>
        <div className="justificado textType1 fondoBlack alto30por">
        <p onClick={()=>navegar("/")}  className="pointer" >Home</p>
        <p onClick={()=>navegar("/sobreNosotros")} className="pointer" >Sobre nosotros</p>
        <p onClick={()=>navegar("/contactos")} className="pointer" >Contactanos</p>
        <p onClick={()=>navegar("/terminos")} className="pointer" >Terminos</p>
        </div>
      </>
        
  )}

export function Nav({seleccionar, title1, env1, env2, env3, env4, id1,id2, id3, id4, modoPrevia}) {

  const [seccion, setSeccion] = useState([true, false, false, false])
  const cambiarSeccion=(e)=>{
    if(e.target.value == "todo" ){
      setSeccion([true, false, false, false])
    }
    if(e.target.value == "hoddie"){
    setSeccion([false, true, false, false])
  }
    if(e.target.value == "pants"){
  setSeccion([false, false, true, false])
    }
    if(e.target.value == "shoes"){
  setSeccion([false, false, false, true])
    }
  }
  function render(){
    if(env4)
    return(
      <button  value={id1} name="todo" onClick={(e)=>{cambiarSeccion(e); seleccionar(e)}} className={seccion[0] ? "seleccionarSeccion" : "noSelectSeccion"} >
        {env4}
      </button>
    )
    return
  }
  return (
    <header className='header'>
    <nav className='alto80'><img className="imgGrande" src={anuncio}/> </nav>
    {modoPrevia ? <h2 className="resaltarText fondoWhite">{title1}</h2>
    :
    <nav className='navSearch justificado'>
    {render()}
    <button value={id2} name='tipo' onClick={(e)=>{cambiarSeccion(e); seleccionar(e)}} className={seccion[1] ? "seleccionarSeccion" : "noSelectSeccion"}>
    {env1}
      </button>
      <button value={id3} name='tipo' onClick={(e)=>{cambiarSeccion(e); seleccionar(e)}} className={seccion[2] ? "seleccionarSeccion" : "noSelectSeccion"} >
    {env2}
    </button>
      <button value={id4} name='tipo' onClick={(e)=>{cambiarSeccion(e); seleccionar(e)}} className={seccion[3] ? "seleccionarSeccion" : "noSelectSeccion"} >
    {env3}
      </button>
    
    </nav>
    }
    
  </header>  
  )
}
export function Cargando({alto, ancho}){
  return(
<div className='justificado'><CircularProgress style={{height:alto, width:ancho}} /></div>
  )
}
