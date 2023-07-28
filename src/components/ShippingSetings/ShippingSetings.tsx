
import { useState } from "react";
import "./ShippingSetings.scss"
import adminaxios from "../../axios/adminaxios";


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




  const [pay, setPay] = useState<any>([])

  async function addPay(n: any) {
    if (pay.length === 0) {
      setPay([n])
    }
    pay.map((el: any, index: any) => {
      if (el === n) {
        pay.splice(index, 1)

        setPay(pay)
      } else {
        setPay([...pay, n])
      }
    })


  }





  async function save() {
    try {

      const response = await adminaxios({
        method: 'PUT',
        url: 'changeBoxParams',
        data: {
          title: pay,
          weight: weight,
          height: height,
          length: lenght,
          widht: widht,
          distance_unit: unit.value,
          mass_unit: mass.value
        }

      });

      // TODO: remove console.logs before deployment


    } catch (error) {
      console.log(error as Error);
    }
  }



  return (
    <div className='ShipingSetings'>
      <div className="Setings-Sipping">
        <div className="ship">
          <h3>Shipp Order</h3>
          <div>
            <span>Fedex</span>
            <input type="checkbox" onChange={() => { addPay("Ship in Fedex") }} />
          </div>
          <div>
            <span>UPS</span>
            <input type="checkbox" onChange={() => { addPay("Ship in UPS") }} />
          </div>
          <div>
            <span>USPS</span>
            <input type="checkbox" onChange={() => { addPay("Ship in USPS") }} />
          </div>
          <div className='button-sayt'>
          <button onClick={() => { save() }}>Save Shipping metods</button>

          </div>
        </div>

        <div className="ordering">
          <h3>Ordering Info</h3>
          <span>lenght</span>
          <input type="number"
            onChange={(e) => setLenght(e.target.value)}
            value={lenght}
          />
          <span>widht</span>
          <input type="number"
            onChange={(e) => setWidht(e.target.value)}
            value={widht}
          />
          <span>weight</span>
          <input type="number"
            onChange={(e) => setWeight(e.target.value)}
            value={weight}
          />
          <span>height</span>
          <input type="number"
            onChange={(e) => setHeight(e.target.value)}
            value={height}
          />
          <span>unit</span>
          <select   onChange={(e) => {
              setUnit(e.target.value)
            }}>
            {units.map((el:any)=> <option>{el.value}</option>)}
          </select>
            {/* options={units}
            value={unit}
           
          
          /> */}
          <span>mass</span>
          <select  onChange={(e) => {
            
            
              setMass(e.target.value)
            }} >
            {masss.map((el:any)=> <option>{el.value}</option>)}
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
