import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../service/api";
import Order from "./Order";
import c from "./ViewOreders.module.css";
const ViewOreders = (p) => {
  const { isLoged, orderDates } = useSelector((s) => s.login);
  const [orders, setOrders] = useState([]);
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
          />
        </div>
      </div>
      {orders.length > 0 ? (
        orders.map((m) => <Order data={m} key={m.qualificationId} />)
      ) : (
        <h1>No qualification found</h1>
      )}
    </React.Fragment>
  );
};
export default ViewOreders;
