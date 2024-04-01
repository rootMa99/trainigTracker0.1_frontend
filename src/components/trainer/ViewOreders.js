import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../service/api";
import Order from "./Order";
import c from "./ViewOreders.module.css";
import pic from "../../assets/os.gif";
import { loginActions } from "../../store/loginSlice";
import NetworkNotify from "../UI/NetworkNotify";
import Select from "react-select";
import { getlabelandvalue } from "../functions/utils";
import EditDate from "./EditDate";
import BackDrop from "../UI/BackDrop";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "97%",
    height: "auto",
    textTransform: "uppercase",
    borderRadius: "5px",
    textAlign: "center",
    outline: "none",
    border: "1px solid #414141",
    backgroundColor: "transparent",
    boxShadow: "none",
    margin: "auto",
    "&:hover": {
      border: "1px solid #f33716",
      cursor: "pointer",
    },
  }),
  option: (provided, state) => ({
    width: "97%",
    padding: "0.5rem",
    color: state.isFocused ? "#f3f3f3" : "#f33716",
    backgroundColor: state.isFocused && "#474b4d",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                  "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                  "Segoe UI Symbol"`,
    textTransform: "uppercase",
    outline: "none",
    textAlign: "center",
    "&:hover": {
      cursor: "pointer",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: "#f3f3f3",
  }),
  singleValue: (p) => ({
    ...p,
    color: "#f3f3f3",
  }),
  menuList: (provided) => ({
    maxHeight: "200px",
    overflowY: "auto",
    overflowX: "hidden",
    scrollbarWidth: "thin",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      width: "5px",
      backgroundColor: "#535151",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#f33716",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  }),
};
let BACKUPDATA = [];
const ViewOreders = (p) => {
  const { isLoged, orderDates, titleAndType } = useSelector((s) => s.login);
  const [orders, setOrders] = useState([]);
  const [sl, setSl] = useState([]);
  const [sln, setSln] = useState("");
  const dispatch = useDispatch();
  const [checkboxState, setCheckboxState] = useState({});
  const [orderIds, setOrderIds] = useState([]);
  const [success, setSuccess] = useState({ status: false, message: "" });
  const [err, setErr] = useState({ status: false, message: "" });
  const [dataUp, setDataUp] = useState(false);

  console.log("re", titleAndType)


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

  const callbackSL = useCallback(async () => {
    try {
      const response = await fetch(`${api}/root/data/shiftleaders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      setSl(data);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [isLoged.token]);
  useEffect(() => {
    callbackSL();
  }, [callbackSL]);

  console.log(orderDates);
  const callback = useCallback(async () => {
    try {
      const uri =
        sln !== ""
          ? `${api}/other/orders?shiftLeader=${sln}&startDate=${orderDates.start}&endDate=${orderDates.end}`
          : `${api}/other/orders/dateBetween?&startDate=${orderDates.start}&endDate=${orderDates.end}`;
      const response = await fetch(uri, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
      });

      const data = await response.json();
      console.log(data);
      setOrders(data);
      BACKUPDATA = data;
    } catch (error) {
      console.error("Error:", error);
    }
  }, [isLoged, orderDates.start, orderDates.end, sln]);

  useEffect(() => {
    callback();
  }, [callback]);

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
  console.log(BACKUPDATA);

  const confirmStatus = async (e, s) => {
    const uri =
      s === "c"
        ? `${api}/other/updateOrder/status?status=Confirmed`
        : `${api}/other/updateOrder/status?status=not confirmed`;
    try {
      await fetch(uri, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${isLoged.token}`,
        },
        body: JSON.stringify(orderIds),
      });
      callback();
      setSuccess({
        status: true,
        message: "Status has been successfully changed!",
      });
    } catch (error) {
      console.error("Error:", error);
      setErr({
        status: true,
        message:
          "Something has gone wrong, we were not able to save this action, please try it again. ",
      });
    }
  };

  return (
    <React.Fragment>
      {dataUp && (
        <React.Fragment>
          <EditDate click={close} order={orderIds} callback={callback} />
          <BackDrop click={close} zindex={22223} />{" "}
        </React.Fragment>
      )}
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
            max={orderDates.end}
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
            min={orderDates.start}
          />
        </div>
        <div className={c["form-group"]}>
          <label htmlFor="end">shift leader</label>
          <Select
            options={[
              { label: "N/A", value: "" },
              ...getlabelandvalue(sl.filter((f) => f !== null)),
            ]}
            id="multiSelect"
            inputId="shiftleader1"
            styles={customStyles}
            placeholder="select shift leader"
            onChange={(e) => setSln(e.value)}
          />
        </div>
        <div className={c["form-group"]}>
          <label htmlFor="sft">shift</label>
          <Select
            options={[
              { label: "N/A", value: "" },
              { label: "mornining", value: "mornining" },
              { label: "evening", value: "evening" },
              { label: "nigth", value: "nigth" },
            ]}
            id="multiSelect"
            inputId="shiftleader1"
            styles={customStyles}
            onChange={(e) => setSln(e.value)}
          />
        </div>
        <div className={c["form-group"]}>
          <label htmlFor="sft">qualification</label>
          <Select
            options={[
              { label: "N/A", value: "" },
              { label: "mornining", value: "mornining" },
              { label: "evening", value: "evening" },
              { label: "nigth", value: "nigth" },
            ]}
            id="multiSelect"
            inputId="shiftleader1"
            styles={customStyles}
            onChange={(e) => setSln(e.value)}
          />
        </div>
      </div>
      {orders.length > 0 ? (
        <div className={c.orderHolder}>
          {orderIds.length > 0 && (
            <div className={c.orderActions} style={{ marginTop: "1rem" }}>
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
              <button onClick={(e) => confirmStatus(e, "c")}>Confirmed</button>
              <button onClick={(e) => confirmStatus(e, "nc")}>
                not confirmed
              </button>
              <button onClick={() => setDataUp(true)}>
                Edit qualification Date
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
