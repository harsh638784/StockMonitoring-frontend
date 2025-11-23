import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Orders.module.css"; 
import { apiPrefix } from "../constant.js";
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token"); 

        if (!token) {
          setError("Authentication failed: No token found.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`${apiPrefix}/newOrders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setOrders(response.data.orders || []);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Could not fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className={styles.ordersContainer}><p>Loading orders...</p></div>;
  }

  if (error) {
    return <div className={styles.ordersContainer}><p>Error: {error}</p></div>;
  }

  return (
    <div className={styles.ordersContainer}>
      {orders.length === 0 ? (
        <div className={styles.noOrders}>
          <p>You haven't placed any orders today</p>
          <Link to={"/Home"} className={styles.btn}>
            Get started
          </Link>
        </div>
      ) : (
        <div className={styles.ordersList}>
          <h2>Your Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Qty.</th>
                <th>Avg. price</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.symbol}</td>
                  <td>{order.quantity}</td>
                  <td>₹{order.price?.toFixed(2) || '0.00'}</td> {/* Price ke liye bhi safety check add kar diya */}
                  <td>{order.type}</td>
                  {/* YAHAN BADLAV KIYA GAYA HAI */}
                  <td className={styles[`status-${order.status?.toLowerCase() ?? 'default'}`]}>
                    {order.status || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;