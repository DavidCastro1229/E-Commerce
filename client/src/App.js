import "./App.css"
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Inicio from "./app/inicio"
import Admin from "./app/admin"
import Previa from "./app/previa"
import Comprar from "./app/comprar"
import SobreNosotros from "./app/sobreNosotros"
import Contactos from "./app/contactos"
import Terminos from "./app/terminos"
import Cart from "./app/cart"
import Header from "./app/components/routes/header"
import Footer from "./app/components/routes/footer"
function App() {
  return (
    
       <BrowserRouter>
  <Header />
  <Routes>
  <Route  path='/' element={<Inicio />} /> 
  <Route  path='/search/:busqueda' element={<Inicio />} /> 
  <Route path='/previa/:uuid' element={<Previa />} />
  {/* <Route path='/modificar/:uuid' element={<Modificar />} /> */}
  <Route path='/admin' element={<Admin />} />
  <Route path='/checkout/:uuid/:cantidad' element={<Comprar />} />
  <Route path='/checkout/cart' element={<Comprar />} />
  <Route path='/cart' element={<Cart />} />
  <Route path='/sobreNosotros' element={<SobreNosotros />} />
  <Route path='/contactos' element={<Contactos />} />
  <Route path='/terminos' element={<Terminos />} />
</Routes>
<Footer />
</BrowserRouter>     
  );
}

export default App;
