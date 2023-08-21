
import { useState, useEffect } from "react";
import "./ShippingSetings.scss"
import adminaxios from "../../axios/adminaxios";
import { useraxios } from "../../axios/axios";


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




  const [ship, setShip] = useState<any>([])
  
  const [shipment, setShipment] = useState<any>();
  const [orderInfo, setOrderInfo] = useState<any>();
  async function name() {

    try {
      const response = await useraxios.get('shipMethods');
      console.log(response);
      setShipment(response.data)
    }
    catch (error) {
      console.log(error);

    }


  }
  async function getOrderInfo() {

    try {
      const response = await adminaxios.get('getBoxparams');
      console.log(response);
      setOrderInfo(response.data)
    }
    catch (error) {
      console.log(error);

    }


  }
  console.log(orderInfo);
  
  useEffect(() => {
    name()
    getOrderInfo()
  }, [])
  // console.log(shipment);
  

  async function addShip(n: any) {
      
  
  let newShip:any = shipment?.map((el:any)=>{
    if(el.id === n ){
      el={...el, status:!el.status}
    }
    return el
   }
   )
   setShipment(newShip)
    // console.log(x)
    if (ship.length === 0) {
      setShip([n])
    }
    ship.map((el: any, index: any) => {
      if (el === n) {
        ship.splice(index, 1)

        setShip(ship)
      } else {
        setShip([...ship, n])
      }
    })


  }





  async function save() {

    try {
       await adminaxios({
        method: 'PUT',
        url: 'changeBoxParams',
        data: {
          ids: ship,
          weight: weight,
          height: height,
          length: lenght,
          widht: widht,
          distance_unit: unit,
          mass_unit: mass
        }

      });

      // TODO: remove console.logs before deployment
     await name();
     await getOrderInfo();
      setShip("");
      setWeight("");
      setLenght("");
      setWidht("");
      setUnit("");
      setMass("");


    } catch (error) {
      console.log(error as Error);
    }
  }



  return (
    <div className='ShipingSetings'>
      <div className="Setings-Sipping">
        <div className="ship">
          <h3>Shipp Order</h3>
          {
            shipment?.map((el: any) => <div>
              <span>{el.title}</span>
              <input type="checkbox" checked={el.status} onChange={() => addShip(el.id) } />
             </div>)
          }
         
          <div className='button-sayt'>
            <button onClick={() => { save() }}>Save Shipping metods</button>

          </div>
        </div>

        <div className="ordering">
          <h3>Ordering Info</h3>
          <span>length {orderInfo?.length}</span>
          <input type="number"
            onChange={(e) => setLenght(e.target.value)}
            value={lenght}
          />
          <span>width {orderInfo?.width}</span>
          <input type="number"
            onChange={(e) => setWidht(e.target.value)}
            value={widht}
          />
          <span>weight {orderInfo?.weight}</span>
          <input type="number"
            onChange={(e) => setWeight(e.target.value)}
            value={weight}
          />
          <span>height {orderInfo?.height}</span>
          <input type="number"
            onChange={(e) => setHeight(e.target.value)}
            value={height}
          />
          <span>unit {orderInfo?.distance_unit}</span>
          <select onChange={(e) => {
            setUnit(e.target.value)
          }}>
            {units.map((el: any) => <option>{el.value}</option>)}
          </select>
          {/* options={units}
            value={unit}
           
          
          /> */}
          <span>mass {orderInfo?.mass_unit}</span>
          <select onChange={(e) => {


            setMass(e.target.value)
          }} >
            {masss.map((el: any) => <option>{el.value}</option>)}
          </select>
          {/* <Select
            options={masss}
            value={mass}
            onChange={(item) => {
              setMass(item)
            }}
          /> */}
          <div className='button-sayt'>
            <button onClick={() => { save() }}>Save Ordering Info</button>

          </div>
        </div>

      </div>
    </div>
  )
}
