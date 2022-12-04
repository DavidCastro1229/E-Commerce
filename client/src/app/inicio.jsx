import React from 'react';
import {useEffect, useState, useRef} from "react";
import Axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import {Nav, Cargando} from "./components/routes/header"
import {useCookies} from "react-cookie"
import {IconButton, Snackbar } from '@mui/material'
import { AddShoppingCart as AddShoppingCartIcon } from "@material-ui/icons";
import { TuneOutlined as TuneOutlinedIcon } from "@material-ui/icons";
import {Filter} from "./dinamic";

export default function Inicio() {
  const [productos, setProductos]=useState([])
  const [estado, setEstado]=useState(false)
  const [estado2, setEstado2]=useState(false)
  const [estado3, setEstado3]=useState(true)
  const [menuFilter, setMenuFilter] = useState(true)
  const navegar= useNavigate()
  const parametro = useParams()
  const [estadoFilter, setestadoFil] = useState(false)
      const [tipo, setTipo] = useState("todo")
      const [genero, setGenero] = useState(undefined)
      const [estilo, setEstilo] = useState(undefined)
      const [colores, setColor] = useState(undefined)
      const [open, setOpen] = useState(false);
      const  [ cookies ,  setCookie, removeCookie ] = useCookies();

      const addToCart=(name, uuid)=>{
        setCookie(name, uuid, {path:"/", maxAge:60*20})      
        setOpen(true)
        setTimeout(() => {
          setOpen(false)
        }, 2000);
      }
      const filtrarBusqueda= async(e)=>{        
        setEstado2(false)
        setestadoFil(false)
        window.scroll(0,0)
        if(!parametro.busqueda && !estadoFilter){
         const res=await Axios.post(process.env.REACT_APP_LOCAL ? `${process.env.REACT_APP_LOCAL}/productos/inicio` : "/productos/inicio")
         setProductos(res.data)
         setEstado(true)
         return setEstado2(true)
        }
        if(e){
          const res = await Axios.post(process.env.REACT_APP_LOCAL ? `${process.env.REACT_APP_LOCAL}/productos/false` : `/productos/false`, {
            producto:tipo,
            estilo:estilo,
            genero:genero,
            color:colores
          })
          setProductos(res.data);
          setEstado2(true)
          setEstado3(true)
          return window.scroll(0,288)
        }
        if(e === false){
          let query =[]
          for(let i = 0; i < parametro.busqueda.split(" ").length; i++){
            query.push(parametro.busqueda.split(" ")[i].slice(0,3))
          } 
      const res = await Axios.post(process.env.REACT_APP_LOCAL ? `${process.env.REACT_APP_LOCAL}/productos/search` : `/productos/search`, {producto:query})
      setProductos(res.data)
      setEstado(true)
      setEstado2(true)
      setEstado3(false)
      return window.scroll(0,288)
    }
        }
        
      const filtro = (e)=>{
        if(e.target.name == "tipo" || e.target.name == "todo"){
          setTipo(e.target.value)
          return setestadoFil(true)
        }
        if(e.target.name == "estilo"){
          if(e.target.value == "todosEstilos"){
            setEstilo(undefined)
            return setestadoFil(true)
          }
          setEstilo(e.target.value)
          return setestadoFil(true)
        }
        if(e.target.name == "genero"){
          if(e.target.value == "todosGeneros"){
            setGenero(undefined)
            return setestadoFil(true)
          }
          setGenero(e.target.value)
          return setestadoFil(true)
        }
        if(e.target.name == "color"){
          if(e.target.value == "todosColor"){
            setColor(undefined)
            return setestadoFil(true)
          }
          setColor(e.target.value)
          return setestadoFil(true)
        }
      }
      const mostrarFiltros=()=>{
        if(menuFilter){
          document.getElementById("menuFiltros").classList.add("menuPhone")
          return setMenuFilter(false)
        }
        document.getElementById("menuFiltros").classList.remove("menuPhone")
        setMenuFilter(true)
      } 
        useEffect(() => {
          filtrarBusqueda();
        }, [])
        useEffect(() => {
          if(estadoFilter){
           filtrarBusqueda(true)
          }
        }, [estadoFilter])
        useEffect(() => {
          filtrarBusqueda(false)        
        }, [parametro])


  return (
    <>
     <React.Fragment>
      <Snackbar
        open={open}
      />
      <Snackbar sx={{"& .MuiSnackbarContent-message":{fontSize:"1.5rem"}, "& .MuiPaper-root" : {backgroundColor:"green"}}} message="Agregado al carrito" open={open} onClose={() => setOpen(false)} />
    </React.Fragment>
    {estado ?
    <Nav seleccionar={filtro} title1="Comienza a expandir tu negocio ! AHORA ¡vende mas con una pagina y aumenta tus ingresos." title2="Estilos" descripcion="Simplifica tu trabajo y vende online, aprovecha a comprar tu ecomers hoy mismo y recibelo en pocas ! HORAS ¡" env1="Hoddies" env2="Joggers" env3="Shoes" env4="Todo" id1="todo" id2="hoddie" id3="pants" id4="shoes" />
    : <Cargando alto="8rem" ancho="8rem"  />
     }
     <aside className="justificado">
     <h2 className='resaltarText' >resultado de: <font className="textBlue" >{estado3 ? tipo : parametro.busqueda}</font> <br/> retultados encontrados <font className="textBlue" >{productos.length}</font> </h2>
     <aside className="ancho40 justificado">
     <h1 onClick={mostrarFiltros} className="textGrande btnType1 textAling">Filtros <TuneOutlinedIcon style={{fontSize:"2rem"}}/> </h1>
     </aside>
     </aside>
    <div className="justificado">
      <main id="main" className="grid main padding10">
      { estado2 ? productos.map((data, index)=>{
                return(
    <article className='targetContainer' key={index} >
      <div className="artileImg pointer" onClick={()=>navegar(`/previa/${data.uuid}`)}>
     <img className='imgGrande hoverImg' src={data.img} alt="" />
      </div>
      <div className='infoProducto' >
     <h3 className="resaltarText pointer" onClick={()=>navegar(`/previa/${data.uuid}`)} >{data.producto}</h3>
     <h4 className="textBlue">precio ${data.precio}</h4>
     <div className='justificado'>
     <button  className='btnType1'> 5 en Stock </button>
     <IconButton onClick={()=>addToCart(data.uuid, 1)} color="primary" aria-label="add to shopping cart" size="large">
  <AddShoppingCartIcon style={{fontSize:"2.5rem"}}/>
</IconButton>
     </div>
      </div>
    </article> )  } ) : <Cargando alto="8rem" ancho="8rem" /> }
      </main>
      <Filter filtroFuncion={filtro} ocultarFiltros={mostrarFiltros} />
    </div>       
</>
  )
}
