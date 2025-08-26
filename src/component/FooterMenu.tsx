import Link from "next/link";
import styles from "./FooterMenu.module.css"
import HomeIcon from "./icons/HomeIcon";
import FavoriteIcon from "./icons/FavoriteIcon";
import BagIcon from "./icons/BagIcon";
import NotifyIcon from "./icons/NotifyIcon";
import { useCart } from "@/context/CartContext";

type FooterMenuProps = {
  onCartClick: () => void;
}

export default function FooterMenu({ onCartClick }: FooterMenuProps) {
  const { cart } = useCart();
  const activeOrder = cart.length;

  return (
    <nav className={styles.nav}>
      <div className={styles.menu_item}>
        <Link href="/" className={styles.nav_item}>
          <HomeIcon isActive={true} />
        </Link>
      </div>
      <div className={styles.menu_item}>
        <Link href="/" className={styles.nav_item}>
          <FavoriteIcon isActive={false} />
        </Link>
      </div>
      <div className={styles.menu_item}>
        {activeOrder !== 0 && (
          <div className={styles.active_order}><span>{activeOrder}</span></div>
        )}
        <Link href="/" className={styles.nav_item} onClick={onCartClick}>
          <BagIcon isActive={false} />
        </Link>
      </div>
      <div className={styles.menu_item}>
        <Link href="/" className={styles.nav_item}>
          <NotifyIcon isActive={false} />
        </Link>
      </div>
    </nav>
  );
}
