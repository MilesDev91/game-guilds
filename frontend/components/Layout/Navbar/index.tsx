import styles from "./Navbar.module.css";
import { ConnectButton } from "web3uikit";
import Link from "next/link";

export default function Navbar(): JSX.Element {
  return (
    <nav className={styles.navBar}>
      <h4 className={styles.logo}>
        <Link href="/">
          <a>Game Guilds DAO</a>
        </Link>
      </h4>
      <ConnectButton />
    </nav>
  );
}
