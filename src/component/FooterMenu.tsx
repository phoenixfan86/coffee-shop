import Link from "next/link";
import styles from "./FooterMenu.module.css"
import HomeIcon from "./icons/HomeIcon";
import FavoriteIcon from "./icons/FavoriteIcon";
import BagIcon from "./icons/BagIcon";
import NotifyIcon from "./icons/NotifyIcon";

const FooterMenu = () => {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.nav_item}>
        <HomeIcon isActive={true} />
      </Link>
      <Link href="/" className={styles.nav_item}>
        <FavoriteIcon isActive={false} />
      </Link>
      <Link href="/" className={styles.nav_item}>
        <BagIcon isActive={false} />
      </Link>
      <Link href="/" className={styles.nav_item}>
        <NotifyIcon isActive={false} />
      </Link>
    </nav>
  );
}
export default FooterMenu;