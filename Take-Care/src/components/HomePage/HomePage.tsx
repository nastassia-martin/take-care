import styles from "./styles.module.scss";
import Image from "react-bootstrap/Image";
import HomePageImage from "../../assets/images/HomePage.png";
import Button from "../Button/Button";

const HomePage = () => {
  return (
    <>
      <main className={styles.MainWrapper}>
        <div className={styles.Tagline}>
          <h4>Tagline Lorem, vero sint omnis alias ut ratione hic fugit.</h4>
          <div className={styles.ButtonWrapper}>
            <Button text="Log in" ariaLabel="Log in" type="button" />
          </div>
        </div>
        <Image src={HomePageImage} fluid className={styles.Image} />
      </main>
    </>
  );
};
export default HomePage;
