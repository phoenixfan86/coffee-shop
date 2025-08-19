import Location from './Location';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Location />
      <div className={styles.search_wrapper}>
        <div className={styles.search}>
          <div className={styles.search_btn}>
            <img src="./img/icons/search.png" alt="search" />
          </div>
          <input type="text" placeholder='Search coffee' />
        </div>
        <div className={styles.filter}>
          <img src="./img/icons/filter.png" alt="" />
        </div>
      </div>
      <div className={styles.promo_wrapper}>
        <div className={styles.promo}>
          <span className={styles.title}>Promo</span>
          <div className={styles.promo_info}>
            <span>Buy one get one</span>
            <span>FREE</span>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;