import { useState, useEffect} from "react";
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import {TextField, FormGroup, Button} from "@mui/material"
import { Cargando } from "./components/routes/header";

export default function Admin(){
    const [imgPrevia, setImgPrevia]=useState({peso:''});
    const [imgNube, setImgNube]=useState("");
    const [estado, setEstado]=useState(false);
    const [estadoForm, setEstadoForm]=useState(true);
    const [estadoVentas, setEstadoVentas]=useState(false);
    const [ventas, setVentas]=useState([]);
    const [producto, setProducto]=useState({
        producto:"",
        precio:"",
        descripcion:"",
        img:"",
        uuid:"",
        tipo:"",
        estilo:"",
        genero:"",
        color:"", 
        disponibilidad:"",
        etiquetas:""
    });
   
    const mostrarImg =async(ar)=>{
       const imagenEnNube=ar[0];
       console.log(imagenEnNube);
       setImgNube(imagenEnNube);
       Array.from(ar).forEach( (archivo) => {
            let reader=new FileReader();
            reader.readAsDataURL(archivo);
            reader.onload= async function (){
            const base64= reader.result;
            setImgPrevia({peso:base64})
            }
        });      
    }
    const handleChange=(e)=>{
        console.log(e.target.name)
        setProducto({...producto, [e.target.name]: e.target.value});
    }
 const subirImgProducto = async(e) => {
        e.preventDefault()
    const data=new FormData();
    data.append("file", imgNube);
    data.append("upload_preset", "david123" )
await Axios.post('https://api.cloudinary.com/v1_1/dwsejzboq/image/upload', data)
.then((respuesta)=>{
    setProducto({...producto, img : respuesta.data.secure_url, uuid:uuidv4()});
});
setEstado(true);
}   
    const subirProducto=async()=>{
        console.log(producto)
    const res=  await Axios.post(process.env.REACT_APP_LOCAL ? `${process.env.REACT_APP_LOCAL}/subirProducto` : "/subirProducto", producto);
        console.log(res)
    }
    const navegarSeccion = (e)=>{
        if(e.target.name === "subirProducto"){
            setEstadoForm(true);
             setEstadoVentas(false)
            }
        if(e.target.name === "ventas"){
            mostrarVentas()
             setEstadoForm(false)
        }
    }
    const mostrarVentas =async ()=>{
        const res = await Axios.post(process.env.REACT_APP_LOCAL ? `${process.env.REACT_APP_LOCAL}/ventas` : "/ventas")
        setVentas(res.data)
        console.log(res)
        setEstadoVentas(true)
    }
    useEffect(() => {      
        if(estado){
            subirProducto()            
        }
    },[estado])
      
    return(
        <>
        <div className="justificado alto10">
        <Button onClick={navegarSeccion} name="subirProducto" color="warning" variant="contained" size="large" sx={{height:"100%", width:"100%", fontSize:"1.5rem"}} >Subir Producto</Button>
        <Button onClick={navegarSeccion} name="ventas" color="primary" variant="contained" size="large" sx={{height:"100%", width:"100%", fontSize:"1.5rem"}} >Ventas</Button>
        </div>
        <main className="padding30">
            {
                estadoForm ?
                <FormGroup onChange={handleChange}  sx={{ height:"100%", '& .MuiOutlinedInput-root':{fontSize:"1.8rem"}, "& .MuiInputLabel-root":{fontSize:"1.5rem"} }} >
    <h1 className="resaltarText">subir producto a tu tienda</h1>
    <p className='textPequeño' >Titulo del producto</p>
    <TextField fullWidth margin="dense" label="titulo del producto" variant="outlined" name="producto" />
    <p className='textPequeño' >Precio del producto</p>
    <TextField fullWidth margin="dense" label="precio" variant="outlined" name="precio" />
    <p className='textPequeño' >Coloca un adescripcion del producto</p>
    <TextField fullWidth margin="dense" label="descripcion" variant="outlined" name="descripcion" />
    <p className='textPequeño' >coloca un adescripcion del producto</p>
    <h1 className="resaltarText">Foto del producto</h1>
    <TextField  fullWidth type="file" onChange={(e)=>mostrarImg(e.target.files)} margin="dense" variant="outlined" />
    <aside className="alto50">
        <img src={imgPrevia.peso} className="alto100" />
    </aside>
    <TextField  fullWidth  margin="dense" label="Genero del producto" variant="outlined" name="genero" />
    <TextField  fullWidth  margin="dense" label="Colores del producto" variant="outlined" name="color" />
    <TextField  fullWidth  margin="dense" label="Estilo" variant="outlined" name="estilo" />
    <TextField  fullWidth  margin="dense" label="Tipo" variant="outlined" name="tipo" />
    <h1 className="resaltarText">coloca si el producto esta disponible en tu tienda</h1>
    <p className='textPequeño' >si marcas el producto como "no diponible" el producto no aparecera en tu tienda</p>
    <TextField  fullWidth  margin="dense" label="Disponible" variant="outlined" name="disponibilidad" />
    <p className='textPequeño' >coloca palabras relacionda con el producto, esto sirve para hacer que los sistema de busqueda sean mas precisos con el producto que el usuario busca</p>
    <TextField  fullWidth  margin="dense" label="etiquetas" variant="outlined" name="etiquetas" />
</FormGroup> 
: estadoVentas ?
ventas.map((e)=>{
    let producto = JSON.parse(e.productos)
    return(
        <div>
            <h1>{producto[2].credenciales.nombre}</h1>
            <h1>{producto[0].producto}</h1>
            <img src={producto[0].img} />
        </div>
    )
})
  : <Cargando alto="8rem" ancho="8rem"/> 

            }


        </main>
        <div className="justificado">
  <button className="btnType1 alto10" onClick={subirImgProducto} >subir producto</button> 
        </div>

        </>

    )
    
    }