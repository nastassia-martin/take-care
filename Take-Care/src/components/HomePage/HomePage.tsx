import styles from "./styles.module.scss";
import Image from "react-bootstrap/Image";
import HomePageImage from "../../assets/images/HomePage.png";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <main className={styles.MainWrapper}>
        <div className={styles.Tagline}>
          <h4>Tagline Lorem, vero sint omnis alias ut ratione hic fugit.</h4>
          <div className={styles.ButtonWrapper}>
            <Button ariaLabel="Log in" type="button">
              Log in
            </Button>
            <Link to="/register">
              <Button ariaLabel="Log in" type="button">
                Register
              </Button>
            </Link>
          </div>
        </div>
        <Image src={HomePageImage} fluid className={styles.Image} />
      </main>
    </>
  );
};
export default HomePage;
