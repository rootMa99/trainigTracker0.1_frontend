import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../service/api";
import Order from "./Order";
import c from "./ViewOreders.module.css";
import pic from "../../assets/os.gif";
import { loginActions } from "../../store/loginSlice";
const ViewOreders = (p) => {
  const { isLoged, orderDates } = useSelector((s) => s.login);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const [checkboxState, setCheckboxState] = useState({});
  const [orderIds, setOrderIds] = useState([]);

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    const ids = orderIds;
    if (checked) {
      orderIds.push(id);
      setOrderIds(ids);
    } else {
      setOrderIds(ids.filter((f) => f !== id));
    }
    setCheckboxState({
      ...checkboxState,
      [id]: checked,
    });
  };

  const handleCheckAll = () => {
    const updatedCheckboxState = {};
    const ids = [];
    orders.forEach((order) => {
      updatedCheckboxState[order.qualificationId] = true;
      ids.push(order.qualificationId);
    });
    setCheckboxState(updatedCheckboxState);
    setOrderIds(ids);
  };
  console.log(orderDates);
  const callback = useCallback(async () => {
    try {
      const response = await fetch(
        `${api}/other/orders?shiftLeader=${isLoged.userName}&startDate=${orderDates.start}&endDate=${orderDates.end}`,
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

  console.log(orderIds, checkboxState);

  return (
    <React.Fragment>
      <div className={c.formCAdmin}>
        <span>FROM</span>
        <div className={c["form-group"]}>
          <label htmlFor="sd">start</label>
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
        <span>TO</span>
        <div className={c["form-group"]}>
          <label htmlFor="end">date</label>
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
          {orderIds.length > 0 && (
            <div className={c.orderActions}>
              <button onClick={handleCheckAll}>check all</button>
              <button onClick={() => setCheckboxState({})}>uncheck</button>
              <button>delete</button>
              <button>update</button>
            </div>
          )}
          {orders.map((m) => (
            <div className={c.holy} key={m.qualificationId}>
              <input
                className={c.checkboxInput}
                type="checkbox"
                id={m.qualificationId}
                checked={checkboxState[m.qualificationId] || false}
                onChange={handleCheckboxChange}
              />
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
