import React from 'react'
import {FormGroup, TextField, Button} from "@mui/material"
import {useState} from "react"
export default function Contactos() {
  const [mensaje, setMensaje]=useState({})
  const handleChange=(e)=>{
    setMensaje({...mensaje, [e.target.name]: e.target.value});
  }
  const enviar =()=>{
    console.log("enviado")
  }
  return (
    <>
          <h1 className="resaltarText textAling">Contactanos</h1>
<div className="margin30">
          <h2 className="textBlue">Envianos un comentario de tu experiencia con nuestro servicio o Informanos de al algun posible problema</h2>
    <FormGroup onChange={handleChange}  sx={{ height:"100%", '& .MuiOutlinedInput-root':{fontSize:"1.8rem"}, "& .MuiInputLabel-root":{fontSize:"1.5rem"} }} >
    <p className='textPequeño textBlue' >Nombre</p>
    <TextField size="large" margin="dense" label="Nombre" variant="outlined" name="nombre" />
    <p className='textPequeño textBlue' >Asunto</p>
    <TextField size="large" margin="dense" label="Asunto" variant="outlined" name="asunto" />
    <p className='textPequeño textBlue' >Descripcion</p>
    <TextField size="large" multiline margin="dense" label="Descripcion" variant="outlined" name="descripcion" />
</FormGroup>

</div>
<div className="justificado">
<Button color="warning" size="large" variant="contained" onClick={enviar}>Enviar</Button>
</div>

    </>
  )
}
