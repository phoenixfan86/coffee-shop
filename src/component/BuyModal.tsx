"use client";

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
          <p>{coffee.description}</p>
          <p>Ціна: {coffee.price}₴</p>
          <button>Додати у кошик</button>
        </div>
      </div>
    </div>
  );
}

