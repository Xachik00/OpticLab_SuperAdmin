import React, { useState, useEffect } from "react";
import "./OrderingInformation.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import OrderModal from "../../components/orderModal/Modal";
import { EditOutlined, CheckOutlined,CloseOutlined } from "@ant-design/icons";
import { fetchOrders } from "../../store/action/OrderInformationActions";
import { useAppSelector, useAppDispatch } from "../../hooks/redux";
import { IOrders } from "../../models/model";


const URL = process.env.REACT_APP_BASE_URL;

const OrderingInformation = () => {
  const [modalActive, setModalActive] = useState(false);
  const navigate = useNavigate();
  const { orders }:  any |IOrders = useAppSelector((state) => state.orders);
  const dispatch = useAppDispatch();
  const [edits, setEdits] = useState(" ");
  const [totals, setTotals] = useState<Object[]>([]);
  const [price, setPrice] = useState({});
  const [price1, setPrice1] = useState({});
  const [check, setCheck] = useState({});
  const [count, setCount] = useState<any>({});

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);
  console.log(orders);
  
  let arr1:any =[]
if(orders != "Table is empty"){
 arr1 = orders?.map((item: any) => item.table_name);

}

  function removeDuplicates(arr1: any[]) {
    let headArr: any = [];
    for (let i = 0; i < arr1.length; i++) {
      if (!headArr.includes(arr1[i])) {
        headArr.push(arr1[i]);
      }
    }
    return headArr;
  }

  const headArr = removeDuplicates(arr1);
      

  function addOrder(id: number, table: string, col: string, e: boolean) {
    const newTotals = totals.filter((item: any) => item.columnName !== col);
    if (e === false) {
      setTotals(newTotals);
    } else {
      setTotals([
        ...newTotals,
        {
          id: id,
          tableName: table,
          columnName: col,
          value: e,
        },
      ]);
    }
  }
  
  function addOrder1(id: number, table: string, col: string, e: any) {
    const newTotals = totals.filter((item: any) => item.columnName !== col);
    setTotals([
      ...newTotals,
      {
        id: id,
        tableName: table,
        columnName: col,
        value: e,
      },
    ]);
  }

  function edit(item: string, e: any) {
    e.preventDefault();
    setEdits(item);
  }

  async function edits1(value: any) {
    let obj = value;
    if (Object.keys(price)[0] == "newPrice_company") {
      obj = { ...value, ...price };
    }
    if (Object.keys(price1)[0] == "newPrice_user") {
      obj = { ...value, ...price1 };
    }
    if (
      Object.keys(price1)[0] == "newPrice_user" &&
      Object.keys(price)[0] == "newPrice_company"
    ) {
      obj = { ...value, ...price1, ...price };
    }


    const response = await axios({
      method: "post",
      url: `${URL}api/v1/superAdmin/changeColumnName`,
      data: obj,
    });
    setEdits("");
  }

  async function deletes(table: any, item: string) {
    const response = await axios({
      method: "delete",
      url: `${URL}api/v1/superAdmin/dropColumn`,
      data: { tableName: table, columnName: item },
    });
  }
  function handleSubmit(e: any) {
    e.preventDefault();
  }
  async function total(order: any) {

    const response = await axios({
      method: "post",
      url: `${URL}api/v1/superAdmin/insertValues`,
      data: totals,
    });

    setCount({
      price: response.data.price_user,
      price1: response.data.price_company,
    });
  }

  return (
    <div className="OrderingInformation">
      <div className="Order">
        <div className="head">
          <img
            src="https://img1.wsimg.com/isteam/ip/6e793ce1-d799-4f0e-ac6e-0125429082dc/logo/b7450cf1-6369-4a6a-a2f8-3a2bfe1b23ac.jpg/:/rs=h:80,cg:true,m/qt=q:95"
            alt="logo"
          />
          <p>
            820 Thompson Ave. Ste. 30 Glendale. CA 91201 Tel: 818-649-1799
            Email: info@BestOpUcLab.com
          </p>
          <a href="https://bestopticlab.com/" target="_blank">
            www.BestOpticLab.com
          </a>
        </div>
        <div className="invoices">
          <div className="inv-box">
            {headArr?.map((el: any) => (
              <div key={el} className="box">
                <div className="invoice">
                  <h2>{el}</h2>
                </div>
                <form onSubmit={handleSubmit}>
                  {orders?.length>0 && orders?.map((item: any) => {
                    if (item.table_name === el)
                      return (
                        <div key={item.id} className="form">
                          <div className="btn">
                            {edits === item.column_name ? (
                              <>
                                <input
                                  type="text"
                                  onChange={(e) => {
                                    setCheck({
                                      id: item.id,
                                      tableName: item.table_name,
                                      newName: e.target.value,
                                    });
                                  }}
                                />
                                <button
                                  className="btn1"
                                  onClick={() => edits1(check)}
                                >
                                  <CheckOutlined/>
                                </button>
                                <button
                                  className="btn1"
                                  onClick={() => setEdits("")}
                                >
                                  <CloseOutlined/>
                                </button>
                              </>
                            ) : (
                              <>
                                <label htmlFor={item.column_name}>
                                  {item.column_name}
                                </label>
                                <button
                                  className="btn1"
                                  onClick={(e) => edit(item.column_name, e)}
                                >
                                  <EditOutlined/>
                                </button>
                                <button
                                  className="btn1"
                                  onClick={() =>
                                    deletes(item.table_name, item.column_name)
                                  }
                                >
                                  <CloseOutlined/>
                                </button>
                              </>
                            )}
                          </div>
                          <div className="input-box">
                            {item.value && item.value !== "true" ? (
                              <>
                                <input
                                  type="checkbox"
                                  minLength={2}
                                  maxLength={30}
                                  onChange={(e: any) => {
                                    addOrder(
                                      item.id,
                                      item.table_name,
                                      item.column_name,
                                      e.target.checked
                                    );
                                  }}
                                />{" "}
                                <img src={`${item.value}`} />
                              </>
                            ) : item.price_company ? (
                              <input
                                type="checkbox"
                                minLength={2}
                                maxLength={30}
                                onChange={(e: any) => {
                                  addOrder(
                                    item.id,
                                    item.table_name,
                                    item.column_name,
                                    e.target.checked
                                  );
                                }}
                              />
                            ) : (
                              <input
                                type="text"
                                minLength={2}
                                maxLength={30}
                                onChange={(e: any) => {
                                  addOrder1(
                                    item.id,
                                    item.table_name,
                                    item.column_name,
                                    e.target.value
                                  );
                                }}
                              />
                            )}
                            {edits === item.column_name &&
                            item?.price_company ? (
                              <>
                                {" "}
                                <input
                                  type="number"
                                  onChange={(e) =>
                                    setPrice({
                                      newPrice_company: e.target.value,
                                    })
                                  }
                                />
                                <input
                                  type="number"
                                  onChange={(e) =>
                                    setPrice1({ newPrice_user: e.target.value })
                                  }
                                />
                              </>
                            ) : (
                              <>

                                {item?.price_company && (
                                  <>
                                    <p>{item.price_company}</p>
                                    <p>{item.price_user}</p>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      );
                  })}
                </form>
              </div>
            ))}
          </div>
        </div>

        <div className="total">
          <div className="total-box1">
            <h2>
              {" "}
              {count.price && "total price user " + count.price + " $"}
              <br></br>
              {count.price1 &&
                "total price company " + count.price1 + " $"}{" "}
            </h2>
          </div>
        </div>
      </div>
      <p>
        SEND WHITE & YELLOW WITH ORDER/ KEEP THE PINK COPY FOR YOUR PATIENTS
        RECORD
      </p>
      <div className="btn-box">
        <button className="btn2" onClick={() => total(totals)}>
          save
        </button>
        <button className="btn2" onClick={() => navigate("/pay")}>
          TO CALCULATE
        </button>
        <button
          className="btn2"
          onClick={(e) => {
            setModalActive(true);
            e.preventDefault();
          }}
        >
          add
        </button>
      </div>

      <OrderModal active={modalActive} setActive={setModalActive} />
    </div>
  );
};

export { OrderingInformation };
