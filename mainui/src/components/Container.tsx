import { ReactNode } from "react";
import styles from "../styles/sass/container.module.scss";
import { Footer } from "./footer";

export const Container = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className={styles.container}>{children}</div>
      <Footer />
    </>
  );
};
