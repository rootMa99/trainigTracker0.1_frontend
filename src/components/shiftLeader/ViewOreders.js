import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import api from "../../service/api";

const ViewOreders = (p) => {
  const { isLoged } = useSelector((s) => s.login);
  const [orders, setOrders] = useState([]);

  const callback = useCallback(async () => {
    try {
      const response = await fetch(
        `${api}/other/orders?shiftLeader=${isLoged.userName}`,
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
  }, [isLoged]);

  useEffect(() => {
    callback();
  }, [callback]);
};
export default ViewOreders;
