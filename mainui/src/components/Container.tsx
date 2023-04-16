import styles from "../styles/sass/container.module.scss";
import { Footer } from "./footer";

export const Container = ({ children }: any) => {
  return (
    <>
      <div className={styles.container}>{children}</div>
      <Footer />
    </>
  );
};
