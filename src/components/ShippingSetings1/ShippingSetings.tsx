
import { useState } from "react";
import Select from "react-select"
import "./ShippingSetings.scss"
import axios from "axios"
const URL = process.env.REACT_APP_BASE_URL;


export const ShippingSetings = () => {

    const [lenght, setLenght] = useState('');
  const [widht, setWidht] = useState('')
  const [height, setHeight] = useState('')
  const [unit, setUnit] = useState<any>('')
  const [weight, setWeight] = useState('')
  const [mass, setMass] = useState<any>('')

    const units = [
        { value: "cm", label: "cm" },
        { value: "in", label: "in" },
        { value: "ft", label: "ft" },
        { value: "m", label: "m" },
        { value: "mm", label: "mm" },
        { value: "yd", label: "yd" },
      ]
      const masss = [
        { value: "G", label: "g" },
        { value: "KG", label: "kg" },
        { value: "LB", label: "lb" },
        { value: "OZ", label: "oz" },
      ];




      const [pay,setPay]=useState<any>([])

      async function addPay(n:any){
          if(pay.length === 0){
              setPay([n])
          }
          pay.map((el:any,index:any)=>{
              if(el === n ){
                 pay.splice(index,1)
                    
                 setPay(pay)
              }else{
                  setPay([...pay,n])
              }
          })
     
        
      }

 
     


  async function save() {
    try{
       
      const response = await  axios({
          method: 'PUT',
          url: URL + 'api/v1/superAdmin/changeBoxParams',
          data: {
            title:pay,
            weight:weight,
            height:height,
            length:lenght,
            widht:widht,
            distance_unit:unit.value,
            mass_unit:mass.value
          }
          
        });
       
      // TODO: remove console.logs before deployment
    

  }catch(error){
      console.log(error as Error);
  }
}



    return (
        <div className='ShipingSetings'>
            <div className="Setings-Sipping">
                <div className="ship">
                <h3>Shipp Order</h3>
                <div>
                    <input type="checkbox" onChange={()=>{addPay("Ship in Fedex")}}/>
                    <span>Fedex</span>
                </div>
                <div>
                    <input type="checkbox" onChange={()=>{addPay("Ship in UPS")}}/>
                    <span>UPS</span>
                </div>
                <div>
                    <input type="checkbox" onChange={()=>{addPay("Ship in USPS")}}/>
                    <span>USPS</span>
                </div>
                <button onClick={()=>{save()}}>Save Shipping metods</button>
                </div>
               
                <div className="ordering">
                    <h3>ordering info</h3>
                <p>lenght</p>
                  <input type="number"
                    onChange={(e) => setLenght(e.target.value)}
                    value={lenght}
                  />
                  <p>widht</p>
                  <input type="number"
                    onChange={(e) => setWidht(e.target.value)}
                    value={widht}
                  />
                  <p>weight</p>
                  <input type="number"
                    onChange={(e) => setWeight(e.target.value)}
                    value={weight}
                  />
                  <p>height</p>
                  <input type="number"
                    onChange={(e) => setHeight(e.target.value)}
                    value={height}
                  />
                  <p>unit</p>
                  <Select
                    options={units}
                    value={unit}
                    onChange={(item) => {
                      setUnit(item)
                    }}
                  />
                  <p>mass</p>
                  <Select
                    options={masss}
                    value={mass}
                    onChange={(item) => {
                      setMass(item)
                    }}
                  />
                  </div>
                  <button>Save Ordering Info</button>
            </div>
        </div>
    )
}
