import React from 'react'
import facebook from "../icons/facebook.png"
import instagram from "../icons/instagram.png"
import {useNavigate} from "react-router-dom"
export default function Footer() {
  const navegar = useNavigate()
  return (
    <>
          <footer className="footer textType1">
        <article className='footer1 textType1'>
          <p onClick={()=>{window.scroll(0,0); navegar("/sobreNosotros")}} className="pointer">QUIENES SOMOS</p>
          <p onClick={()=>{window.scroll(0,0); navegar("/contactos")}} className="pointer">CONTACTANOS</p>
          <p onClick={()=>{window.scroll(0,0); navegar("/terminos")}} className="pointer">TERMINOS DE VENTAS</p>
          <p onClick={()=>{window.scroll(0,0); navegar("/")}} className="pointer">BUSCAR EN LA TIENDA</p>
          <p onClick={()=>{window.scroll(0,0); navegar("/contactos")}} className="pointer">ENVIANOS UNA RESEÑA</p>
          MAS INFO DEL SERVICIO
        </article >
        <article className="footer1 textType1 resaltarText">
        Redes sociales
        <div className='justificado footerRedes'>
        <img className='imgPequeña pointer' src={facebook}  />
        <img className='imgPequeña pointer' src={instagram}  />
        </div>
        </article>
      <article className='footer1'>
        E-commerce programado por David Castro
        <p className="difuminarTexto pointer">2022. ©inc todos los derechos reservados</p> 
        <p className='difuminarTexto pointer'>Direccion: Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae accusantium modi eum nostrum aut exercitationem velit nesciunt.</p>
        <p className='difuminarTexto pointer'>Referencia : Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex doloremque cum!</p>
        <p onClick ={()=>{window.scroll(0,0); navegar("/terminos")}} className='difuminarTexto pointer'>Devoluciones</p>
      </article>
      </footer>
    </>
  )
}
