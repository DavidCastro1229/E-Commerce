import {useEffect, useState, useRef} from "react";
import Axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import {Nav, Cargando} from "./components/routes/header"

export default function Modificar() {
  const inputColorRef=useRef();
  const navegar=useNavigate();
  const parametro = useParams();

  
const [files, setfiles] = useState(JSON.parse(localStorage.getItem("files")) || {})
const [elemento, setcolorElement] = useState({input:null})
let [valores, setvalores] = useState({})
  const [modificar, setModificar]=useState([]);
  const [estado, setEstado]=useState(false)


  const seleccionarSeccion= async(e)=>{        
    document.getElementById("phone").classList.remove("seleccionarSeccion")
    document.getElementById("pc").classList.remove("seleccionarSeccion")
    document.getElementById("tablet").classList.remove("seleccionarSeccion")
       e.target.classList.add("seleccionarSeccion");
       //   const res = await Axios.get(`http://localhost:4000/productos/${e.target.id}`)
       // setProductos(res.data);
       // console.log(res.data);
  }

  const Modificarcomponente= async ()=>{
    const res=await Axios.post(process.env.REACT_APP_LOCAL ? `${process.env.REACT_APP_LOCAL}/previaProducto` : "/previaProducto", {uuid:parametro.uuid}, {
      headers:{
        "modificar": "true"
      },
    })
    let prototipo = res.data[0]
    setModificar(res.  data[0])
    console.log(res.data)
    document.getElementById("modificacion").innerHTML=prototipo.html
    document.styleSheets[2].ownerNode.id="screen"
    document.getElementById("screen").innerText= prototipo.css
    if(localStorage.getItem("files") != undefined){
      var rootElement = document.documentElement;
      Object.entries(JSON.parse(localStorage.getItem("files"))).forEach(([key, value]) => {
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
    setEstado(true)
  }
  const cambiarColor=(e)=>{
    setcolorElement({...elemento, color: e.target.value})
    if(valores.colorFondo){
      const name = elemento.input.id
      
      setfiles({...files, [name]:{...files[name], fondo:e.target.value}})
      elemento.input.style.backgroundColor=e.target.value
    };
    if(valores.colorTexto){
      const name = elemento.input.id
    setfiles({...files, [name]:{...files[name], color:e.target.value}})
      elemento.input.style.color=e.target.value;
  }    
  }
  function seleccionarInput(e){
    setcolorElement({input: document.getElementById(e.target.id)})
  }
  const seleccionarValor=(e)=>{
    let name=e.target.name
    setvalores({[name]:true})

  }
  const guardar=(e)=>{
    e.preventDefault()
    localStorage.setItem("files", JSON.stringify(files) )
    navegar(`/previa/${modificar.uuid}`)
  }

          useEffect(() => {
            Modificarcomponente();
        }, []);

  return (
    <>{
      estado ?
      <Nav seleccionar={seleccionarSeccion} title1="Puedes darle un toque distinto a tu web" title2="Modo Edicion" descripcion="Simplifica tu trabajo y vende online, aprovecha a comprar tu ecomers hoy mismo y recibelo en pocas ! HORAS ¡" env1="PHONE" env2="PC" env3="TABLET" id2="phone" id3="pc" id4="tablet" />
      : <Cargando />
    }
        <h1 className="textType1 resaltarText">Selecciona el elemento que quieres modificar</h1>
    <main className="grid gridColumn2 padding20">
      <div>
      <div id="modificacion" name="containerModi" onClick={seleccionarInput}>

</div>
    {/* <img className="imgGrande" src={modificar.img} alt="" /> */}
      </div>
      <div className="colorBlack fondoGrey textType1" >
    <div className="justificadoColumn imgGrande">
   <h2 className="resaltarText" >Color</h2>
    <input type="color" onChange={cambiarColor} ref={inputColorRef} />
   <h2 className="resaltarText" >Area</h2>
    <button className="btnType2 alto4" name="colorTexto" onClick={seleccionarValor}>color texto</button>
    <button className="btnType2 alto4" name="colorFondo" onClick={seleccionarValor}>color fondo</button>  

   <h2 className="resaltarText" >Iconos</h2>
    <input className="ancho70" type="file" />
    <button className="btnType1 alto4" type="submit" onClick={guardar}>Guardar Cambios</button>
    </div>
      </div>

    </main>
    
    </>
  )
}
