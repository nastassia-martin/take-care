import styles from "./styles.module.scss";
import Image from "react-bootstrap/Image";
import HomePageImage from "../../assets/images/HomePage.png";
import Button from "react-bootstrap/Button";

const HomePage = () => {
  return (
    <main className={styles.MainWrapper}>
      <div className={styles.Tagline}>
        <h4>Tagline Lorem, vero sint omnis alias ut ratione hic fugit.</h4>
        <div className={styles.ButtonWrapper}>
          <Button>Log in</Button>
          <Button>Sign up</Button>
        </div>
      </div>
      <div className={styles.ImageWrapper}>
        <Image src={HomePageImage} fluid className={styles.Image} />
      </div>
    </main>
  );
};
export default HomePage;
