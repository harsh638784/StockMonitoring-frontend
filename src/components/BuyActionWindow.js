import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext.js";
import styles from "./BuyActionWindow.module.css";
import { apiPrefix } from "../constant.js";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [isDragging, setIsDragging] = useState(false);
  const general = useContext(GeneralContext);

  const handleBuyClick = async () => {
    await axios.post(`${apiPrefix}/newOrder`, {  
        name: uid,
        qty: stockQuantity,
        price:   stockPrice,
        mode: "BUY",
    });
    general.closeBuyWindow();
  };

  const handleCancelClick = () => {
    general.closeBuyWindow();
  };

  return (
    <div
      className={`${styles.container} ${isDragging ? styles.dragging : ""}`}
      id="buy-window"
      draggable
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
    >
      {/* A header makes the component look more professional */}
      <header className={styles.header}>
        <h3>Buy {uid}</h3>
        <span>Market</span>
      </header>

      <div className={styles.content}>
        <div className={styles.inputs}>
          <fieldset>
            <legend>Qty</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>

        <div className={styles.footer}>
          <span>Margin required: ₹140.65</span>
          <div className={styles.buttons}>
            <button className={`${styles.btn} ${styles.btnBlue}`} onClick={handleBuyClick}>
              Buy
            </button>
            <button className={`${styles.btn} ${styles.btnGrey}`} onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;