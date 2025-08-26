"use client";

import { useState } from 'react';
import styles from './Cart.module.css';

import Arrow_leftIcon from './icons/Arrow_left';
import { useCart } from '@/context/CartContext';

type CartProps = {
  onClose: () => void;
};

const Cart = ({ onClose }: CartProps) => {
  const { cart, updateQuantity } = useCart();
  const [selectedDelivery, setSelectedDelivery] = useState<"deliver" | "pickup" | null>(null);
  const [deliveryData, setDeliveryData] = useState({
    deliveryAddress: "",
    deliveryNote: "",
  });
  const [tmpDeliveryData, setTmpDeliveryData] = useState({
    deliveryAddress: "",
    deliveryNote: "",
  })
  const delivery = 2;
  const deliveryFee = 1;

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
        {cart.map((item) => (
          <div key={item.id + item.size} className={styles.order_item_wrapper}>
            <div className={styles.order_item}>
              <div className={styles.order_img}>
                <img src={item.image} alt={item.name} />
              </div>
              <div className={styles.order_detiles}>
                <div className={styles.item_title}>
                  <h3>{item.name}</h3>
                  <p><span>Size:</span>{item.size}</p>
                </div>
                <div className={styles.quantity}>
                  <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}>+</button>
                </div>
              </div>
            </div>

          </div>
        ))}
        <div className={styles.pay_summary}>
          <h4>Payment Summary</h4>
          <div className={styles.price_preview}>
            <div className={styles.price_sum}>
              <span>Price</span>
              <span className={styles.price}>$ {(
                cart.reduce((sum, item) => sum + item.coffeePrice * item.quantity, 0)).toFixed(2)}</span>
            </div>
            <div className={styles.price_sum}>
              <span>Delivery Fee</span>
              <div className="">
                <span className={styles.delivery_fee}>$ {delivery.toFixed(1)}</span>
                <span className={styles.price}>$ {delivery - deliveryFee}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.final_order}>
          <div className={styles.method_wrapper}>
            <div className={styles.method_img}>
              <img src="./img/icons/wallet.png" alt="pay method" />
            </div>
            <div className={styles.pay_method}>
              <select name="pay_method" id="">
                <option value="cash">
                  Cash/Wallet
                </option>
                <option value="card">
                  Card
                </option>
              </select>
              <span className={styles.total_price}>
                ${(
                  cart.reduce((sum, item) => sum + item.coffeePrice * item.quantity, 0) +
                  deliveryFee
                ).toFixed(2)}
              </span>
            </div>
          </div>
          <button className={styles.order_btn}>Order</button>
        </div>
      </div>
    </div >
  );

}
export default Cart;