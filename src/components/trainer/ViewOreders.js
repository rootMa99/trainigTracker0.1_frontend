import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../service/api";
import Order from "./Order";
import c from "./ViewOreders.module.css";
import pic from "../../assets/os.gif";
import { loginActions } from "../../store/loginSlice";
import NetworkNotify from "../UI/NetworkNotify";
import Select from "react-select";
const ViewOreders = (p) => {
  const { isLoged, orderDates } = useSelector((s) => s.login);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();

  const [success, setSuccess] = useState({ status: false, message: "" });
  const [err, setErr] = useState({ status: false, message: "" });


  
  console.log(orderDates);
  const callback = useCallback(async () => {
    try {
      const response = await fetch(
        `${api}/other/orders/dateBetween?&startDate=${orderDates.start}&endDate=${orderDates.end}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLoged.token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);
      setOrders(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [isLoged, orderDates.start, orderDates.end]);

  useEffect(() => {
    callback();
  }, [callback]);



  if (err.status || success.status) {
    setTimeout(() => {
      setErr({ status: false, message: "" });
      setSuccess({ status: false, message: "" });
    }, 2000);
  }

  return (
    <React.Fragment>
      {err.status && <NetworkNotify message={err.message} success={false} />}
      {success.status && (
        <NetworkNotify message={success.message} success={true} />
      )}
      <div className={c.formCAdmin}>
        <div className={c["form-group"]}>
          <label htmlFor="sd">from</label>
          <input
            required
            name="sd"
            id="sd"
            type="date"
            placeholder="enter date"
            value={orderDates.start}
            onChange={(e) =>
              dispatch(loginActions.setDateOdrerweekStart(e.target.value))
            }
          />
        </div>

        <div className={c["form-group"]}>
          <label htmlFor="end">to</label>
          <input
            required
            name="end"
            id="end"
            type="date"
            placeholder="enter date"
            value={orderDates.end}
            onChange={(e) =>
              dispatch(loginActions.setDateOdrerweekEnd(e.target.value))
            }
          />
        </div>
      </div>

      {orders.length > 0 ? (
        <div className={c.orderHolder}>

          {orders.map((m) => (
            <div className={c.holy} key={m.qualificationId}>
              
              <Order data={m} key={m.qualificationId} />
            </div>
          ))}
        </div>
      ) : (
        <div className={c.notFound}>
          <h1>No qualification found</h1>
          <img src={pic} alt="ter" />
        </div>
      )}
    </React.Fragment>
  );
};
export default ViewOreders;
