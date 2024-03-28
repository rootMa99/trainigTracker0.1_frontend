import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../service/api";
import Order from "./Order";
import c from "./ViewOreders.module.css";
import pic from "../../assets/os.gif";
import { loginActions } from "../../store/loginSlice";
import NetworkNotify from "../UI/NetworkNotify";
import BackDrop from "../UI/BackDrop";
import MakeOreder from "./MakeOreder";

const ViewOreders = (p) => {
  const { isLoged, orderDates } = useSelector((s) => s.login);
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const [checkboxState, setCheckboxState] = useState({});
  const [orderIds, setOrderIds] = useState([]);
  const [success, setSuccess] = useState({ status: false, message: "" });
  const [err, setErr] = useState({ status: false, message: "" });
  const [dataUp, setDataUp] = useState(false);
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

  const deleteOrders = async (e) => {
    const confirmed = window.confirm("Do you want to continue?");
    if (confirmed) {
      try {
        await fetch(`${api}/other/deleteOrders`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${isLoged.token}`,
          },
          body: JSON.stringify(orderIds),
        });

        setSuccess({ status: true, message: "Deleted successfully" });
        console.log(orderIds);

        if (orderIds !== undefined) {
          setOrders(
            orders.filter((order) => !orderIds.includes(order.qualificationId))
          );
        }

        setCheckboxState({});
        setOrderIds([]);
      } catch (error) {
        console.error("Error:", error);
        setErr({
          status: true,
          message:
            "Something has gone wrong, we were not able to save this action, please try it again. ",
        });
      }
    }
  };
  if (err.status || success.status) {
    setTimeout(() => {
      setErr({ status: false, message: "" });
      setSuccess({ status: false, message: "" });
    }, 2000);
  }

  const close = (e) => {
    setDataUp(false);
    setCheckboxState({});
    setOrderIds([]);
  };
  return (
    <React.Fragment>
      {err.status && <NetworkNotify message={err.message} success={false} />}
      {success.status && (
        <NetworkNotify message={success.message} success={true} />
      )}
      {dataUp && (
        <React.Fragment>
          <MakeOreder click={close} order={orders.filter(f=>f.qualificationId===orderIds[0])} />
          <BackDrop click={close} zindex={22223} />{" "}
        </React.Fragment>
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
          {orderIds.length > 0 && (
            <div className={c.orderActions}>
              {orderIds.length !== orders.length && (
                <button onClick={handleCheckAll}>check all</button>
              )}

              <button
                onClick={() => {
                  setCheckboxState({});
                  setOrderIds([]);
                }}
              >
                uncheck
              </button>
              {orderIds.length === 1 && (
                <button onClick={() => setDataUp(true)}>edit</button>
              )}
              <button className={c.deleteAct} onClick={deleteOrders}>
                delete
              </button>
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
