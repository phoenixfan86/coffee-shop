import styles from './GetStart.module.css';

type Props = {
  onStart: () => void;
};

const GetStart = ({ onStart }: Props) => {
  return (
    <section className={styles.get_start}>
      <div className={styles.bg}><img src="./img/bg.png" alt="" /></div>
      <div className={styles.greetings}>
        <h1>Fall in Love with Coffee in Blissful Delight!</h1>
        <p>Welcome to our cozy coffee corner, where every cup is a delightful for you.</p>
        <span onClick={onStart} className={styles.btn}>Get Started</span>
      </div>
    </section>
  );
}
export default GetStart;