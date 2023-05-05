import styles from "../styles/sass/footer.module.scss";
import { UserInfoIcons } from "./Footercard";

export const Footer = () => {
  return (
    <>
      <div className={`${styles.footer}`} style={{ animation: "fadeMe 0.5s" }}>
        <UserInfoIcons
          avatar={"https://static.callummclu.co.uk/main/me2.webp"}
          name={"Callum McLuskey"}
          title={"Software engineer"}
          phone={"+44 79027 68585"}
          email={"callummcluskey100@gmail.com"}
        />
      </div>
    </>
  );
};
