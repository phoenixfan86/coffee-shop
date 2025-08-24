"use client";

import { useState } from 'react';

import styles from './BuyModal.module.css';
import Arrow_leftIcon from './icons/Arrow_left';
import FavoriteIcon from './icons/FavoriteIcon';


type Coffee = {
  id: number;
  name: string;
  description: string;
  type: string;
  price: number;
  image: string;
};

type BuyModalProps = {
  coffee: Coffee;
  onClose: () => void;
};

export default function BuyModal({ coffee, onClose }: BuyModalProps) {
  const [selectedSize, setSelectedSize] = useState('');

  const getPrice = () => {
    if (selectedSize === 'M') return (coffee.price + 0.1).toFixed(2);
    if (selectedSize === 'L') return (coffee.price + 0.3).toFixed(2);
    return coffee.price.toFixed(2);
  }

  return (
    <div className={styles.modal_wrapper}>
      <div className={styles.detail_modal}>
        <div className={styles.modal_header}>
          <div onClick={onClose}>
            <Arrow_leftIcon />
          </div>
          <h4 aria-label='Detail'>Detail</h4>
          <div>
            <FavoriteIcon isActive />
          </div>
        </div>
        <div className={styles.modal_content}>
          <div className={styles.detail_img}>
            <img src={coffee.image} alt={coffee.name} />
          </div>
          <div className={styles.detail_title}>
            <h2>{coffee.name}</h2>
            <div className={styles.title_descr}>
              <span>{coffee.type}</span>
              <div className={styles.title_descr_icons}>
                <div className={styles.icon}>
                  <img src="./img/icons/bike.png" alt="Fast delivery" />
                </div>
                <div className={styles.icon}>
                  <img src="./img/icons/bean.png" alt="Coffee been" />
                </div>
                <div className={styles.icon}>
                  <img src="./img/icons/packaging.png" alt="Packaging" />
                </div>
              </div>
            </div>
            <div className={styles.line}></div>
          </div>
          <div className={styles.detail_descr}>
            <h3>Description</h3>
            <p>A cappuccino is an approximately 150 ml (5 oz) beverage, with 25 ml of espresso coffee and 85ml of fresh milk the fo.. <span>Read More</span></p>
          </div>
          <div className={styles.detail_size}>
            <h3>Size</h3>
            <div className={styles.size_items}>
              <span
                className={`${styles.size_item} ${selectedSize === "S" ? styles.active : ""}`}
                onClick={() => setSelectedSize('S')}>S</span>
              <span
                className={`${styles.size_item} ${selectedSize === "M" ? styles.active : ""}`}
                onClick={() => setSelectedSize('M')}>M</span>
              <span
                className={`${styles.size_item} ${selectedSize === "L" ? styles.active : ""}`}
                onClick={() => setSelectedSize('L')}>L</span>
            </div>
          </div>
          <div className={styles.order_detail}>
            <div className={styles.order_price}>
              <span>Price:</span>
              <span className={styles.price}>${getPrice()}</span>
            </div>
            <button >Buy Now</button>
          </div>
        </div>
      </div>
    </div >
  );
}

