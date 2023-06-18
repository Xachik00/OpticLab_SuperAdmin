import "./Home.scss";
import { Galery } from "../../components/Galery";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
 
 
  return (
    <div className="home">
      <h1 className="hello">WELCOME TO BEST OPTIC LAB, INC</h1>
      <Galery/>
    </div>
  )
}
  