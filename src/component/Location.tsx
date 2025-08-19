import styles from './Location.module.css';

const Location = () => {
  return (
    <section className="">
      <div className={styles.location}>
        <label htmlFor="">Location</label>
        <select name="location" id="location">
          <option value="london">London</option>
          <option value="london">Paris</option>
          <option value="london">Vienna</option>
          <option value="london">Lviv</option>
        </select>
      </div>
    </section>
  );
}
export default Location;