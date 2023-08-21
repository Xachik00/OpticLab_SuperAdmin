import { Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About us";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Themes } from "./pages/Themes";
import { Contact } from "./components/Contact";
import { Login } from "./pages/login";
import {ClipandLendStyles} from './pages/ClipandLendStyles'
import { Setings } from "./pages/setings";
import OrderingInformation from "./pages/OrderingInformation";
import { useEffect } from "react";
import { Modal } from "antd";

function App() {

  const navigate = useNavigate();
  const location = window.location.href
  const loc: string | any=localStorage?.getItem( "auth" );
  const local =JSON?.parse( loc ); 
  
  useEffect(()=>{
    
    if (local  === null && local?.role.endsWith("dmin")
     && 
     local?.username.endsWith("dmin")
     ) {
        navigate( "/login" )
    };  

},[location])






  
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Setings />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms-and-conditions" element={<Themes />} />
        <Route path="/Orderinginformation" element={<OrderingInformation />} />
        <Route path="/ClipandLendStyles" element={<ClipandLendStyles/>}/>
        <Route path="/Modal" element={<Modal/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;