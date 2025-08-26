"use client";

import { useState } from 'react';
import styles from './Cart.module.css';

import Arrow_leftIcon from './icons/Arrow_left';
import { useCart } from '@/context/CartContext';

type CartProps = {
  onClose: () => void;
};

const Cart = ({ onClose }: CartProps) => {
  const { cart } = useCart();
  const [selectedDelivery, setSelectedDelivery] = useState<"deliver" | "pickup" | null>(null);
  const [deliveryData, setDeliveryData] = useState({
    deliveryAddress: "",
    deliveryNote: "",
  });
  const [tmpDeliveryData, setTmpDeliveryData] = useState({
    deliveryAddress: "",
    deliveryNote: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTmpDeliveryData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setDeliveryData(tmpDeliveryData);
    setSelectedDelivery(null);
    console.log("Saved", tmpDeliveryData);
  }

  return (
    <div className="modal_wrapper">
      <div className="detail_modal">
        <div className="modal_header">
          <div onClick={onClose}>
            <Arrow_leftIcon />
          </div>
          <div className={styles.title}>
            <h4 aria-label='Detail'>Order</h4>
          </div>
        </div>
        <div className={styles.delivery_wrapper}>
          <div className={styles.delivery}>
            <div className={`${styles.btn} ${selectedDelivery === "deliver" ? styles.active : ""}`} onClick={() => setSelectedDelivery("deliver")}>Deliver</div>
            <div className={`${styles.btn} ${selectedDelivery === "pickup" ? styles.active : ""}`} onClick={() => setSelectedDelivery("pickup")}>Pick Up</div>
          </div>
          {selectedDelivery === "deliver" &&
            <div className={styles.address_input}>
              <input
                type="text"
                name="deliveryAddress"
                placeholder="Enter Address"
                value={tmpDeliveryData.deliveryAddress}
                onChange={handleChange}
              />
              <span>Add Note</span>
              <textarea
                name="deliveryNote"
                placeholder="Enter Note"
                value={tmpDeliveryData.deliveryNote}
                onChange={handleChange}
              />
              <button className={`${styles.btn} ${styles.active}`} onClick={handleSubmit}>Submit</button>
            </div>
          }
          <div className="line"></div>
        </div>
        <h2>Your Cart</h2>
        {cart.map((item) => (
          <div key={item.id + item.size}>
            <p>{item.name} ({item.size})</p>
            <p>{item.finalPrice.toFixed(2)} $ × {item.quantity}</p>
          </div>
        ))}
      </div>
    </div >
  );

}
export default Cart;