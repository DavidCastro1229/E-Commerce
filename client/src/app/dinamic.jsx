import React, {useEffect, useState} from 'react';
import {IconButton, FormGroup, FormControlLabel, Checkbox, Button} from '@mui/material'
import { TuneOutlined as TuneOutlinedIcon } from "@material-ui/icons";
import { Lens as LensIcon } from "@material-ui/icons";

export default function Dinamic({html, css, files}) {

  const componente= async ()=>{
    document.getElementById("prueba").innerHTML=html;
      document.styleSheets[1].ownerNode.id="screen";
      document.getElementById("screen").innerText= css;
      if(files != undefined){
        var rootElement = document.documentElement;
        Object.entries(files).forEach(([key, value]) => {
          if(value.color){
            rootElement.style.setProperty(`--color-${key}`, value.color );
            document.getElementById(key).style.setProperty('--color-texto', `var(--color-${key})`);
          }
          if(value.fondo){
            rootElement.style.setProperty(`--fondo-${key}`, value.fondo );
            document.getElementById(key).style.setProperty('--color-fondo', `var(--fondo-${key})`);
          }
        });

      }
    }
    useEffect(() => {
      componente()      
  }, [])

return (
  <div id="prueba">    
  </div>
)
}
export function Filter({filtroFuncion, ocultarFiltros}){
  const [checkbox, setCheckbox] = useState([true, false, false, false,])
  const [checkEstilo, setCheckEstilo] = useState([true, false, false, false, false, false, false, false])

const marcar=(e)=>{
  switch(e.target.value){    
    case "todosEstilos": setCheckEstilo([true, false, false, false, false, false, false, false]);
      break;
    case "deportivo": setCheckEstilo([false, true, false, false, false, false, false, false]);
      break;
    case "casual": setCheckEstilo([false, false, true, false, false, false, false, false]);
      break;
    case "vestir": setCheckEstilo([false, false, false, true, false, false, false, false])
      break;
    case "anime": setCheckEstilo([false, false, false, false, true, false, false, false])
      break;
    case "comics": setCheckEstilo([false, false, false, false, false, true, false, false])
      break;
    case "solido": setCheckEstilo([false, false, false, false, false, false, true, false])
      break;
    case "multicolor": setCheckEstilo([false, false, false, false, false, false, false, true])
      break;
    case "todosGeneros": setCheckbox([true, false, false, false])
      break;
    case "hombre": setCheckbox([false, true, false, false])
      break;
    case "mujer": setCheckbox([false, false, true, false])
      break;
    case "niño": setCheckbox([false, false, false, true])
      break;
      default: return
        break;   
  }
}
  return(
    
    <section id="menuFiltros" className='menuFiltros padding10'>
      <aside id="x" className="ancho40 margin10">
    <button onClick={ocultarFiltros} className="textGrande btnType1 textAling">X</button>
      </aside>
    <h2 className="textBlue">Buscar por Estilos</h2>
    <FormGroup onClick={(e)=>{marcar(e); filtroFuncion(e)}} sx={{"& .MuiButton-root":{fontSize:"1.5rem", color:"black", border:"solid #75757557 0.5px", marginBottom:"1rem"}}} >
    <Button variant="outlined" fullWidth={true} name="estilo" value="todosEstilos"  style={checkEstilo[0] ? {color:"white", background:"#1976d2"} : null}>Todos los Estilos</Button>
    <Button variant="outlined" fullWidth={true} name="estilo" value="deportivo"  style={checkEstilo[1] ? {color:"white", background:"#1976d2"} : null} >Estilos deportivos</Button>
    <Button variant="outlined" fullWidth={true} name="estilo" value="casual"  style={checkEstilo[2] ? {color:"white", background:"#1976d2"} : null} >Estilos casual</Button>
    <Button variant="outlined" fullWidth={true} name="estilo" value="vestir"  style={checkEstilo[3] ? {color:"white", background:"#1976d2"} : null} >Estilos de vestir</Button>
    <Button variant="outlined" fullWidth={true} name="estilo" value="anime"  style={checkEstilo[4] ? {color:"white", background:"#1976d2"} : null} >Estilos anime</Button>
    <Button variant="outlined" fullWidth={true} name="estilo" value="comics"  style={checkEstilo[5] ? {color:"white", background:"#1976d2"} : null} >Estilos comics</Button>
    <Button variant="outlined" fullWidth={true} name="estilo" value="solido"  style={checkEstilo[6] ? {color:"white", background:"#1976d2"} : null} >Colores solidos</Button>
    <Button variant="outlined" fullWidth={true} name="estilo" value="multicolor"  style={checkEstilo[7] ? {color:"white", background:"#1976d2"} : null} >Multicolores</Button>
    </FormGroup>
    <h2 className="textBlue">Buscar por Genero</h2>
      <FormGroup onClick={(e)=>{marcar(e); filtroFuncion(e)}} sx={{"& .css-ahj2mt-MuiTypography-root":{fontSize:"2rem"}, "& .css-i4bv87-MuiSvgIcon-root":{fontSize:"2.5rem"}}} >
        <FormControlLabel control={<Checkbox  checked={checkbox[0]} name="genero"  value="todosGeneros"/>} label="todos"/>
        <FormControlLabel control={<Checkbox  checked={checkbox[1]} name="genero"  value="hombre"/>} label="Linea para hombres"/>
        <FormControlLabel control={<Checkbox  checked={checkbox[2]}  name="genero" value="mujer"/>} label="Linea para mujeres" />
        <FormControlLabel control={<Checkbox  checked={checkbox[3]} name="genero" value="niño" />} label="Linea para niños" />
      </FormGroup>
    <h2 className="textBlue">Buscar por Colores</h2>
      <FormGroup sx={{"& .MuiSvgIcon-root":{fontSize:"3rem", backgroundColor:"black", borderRadius:"4rem"}}} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)"}}>
    <IconButton aria-label="circle color" >
<LensIcon style={{color:"red"}}/>
</IconButton>
    <IconButton aria-label="circle color">
<LensIcon style={{color:"yellow"}}/>
</IconButton>
    <IconButton aria-label="circle color">
<LensIcon style={{color:"black"}}/>
</IconButton>
    <IconButton aria-label="circle color" >
<LensIcon style={{color:"green"}}/>
</IconButton>
    <IconButton aria-label="circle color" >
<LensIcon style={{color:"blue"}}/>
</IconButton>
    <IconButton aria-label="circle color" >
<LensIcon style={{color:"purple"}}/>
</IconButton>
    <IconButton aria-label="circle color" >
<LensIcon style={{color:"fuchsia"}}/>
</IconButton>
    <IconButton aria-label="circle color" >
<LensIcon style={{color:"coral"}}/>
</IconButton>
    <IconButton aria-label="circle color" >
<LensIcon style={{color:"gold"}}/>
</IconButton>
    <IconButton aria-label="circle color" >
<LensIcon style={{color:"white"}}/>
</IconButton>
      </FormGroup>
  </section>
  )
}


