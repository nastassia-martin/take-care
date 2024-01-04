import styles from "./styles.module.scss";
import Image from "react-bootstrap/Image";
import HomePageImage from "../../assets/images/HomePage.png";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useGetParent from "../../hooks/useGetParent";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const isParentProfile = useGetParent(currentUser?.uid);

  const handleClick = () => {
    // if the current user is a parent, navigate to their profile
    if (currentUser && isParentProfile) navigate(`/parents/${currentUser.uid}`);

    // if the current user is a parent, navigate to their profile
    // if isTeacher navigate to `/teachers/${currentUser.uid}`
  };
  return (
    <>
      <main className={styles.MainWrapper}>
        <div className={styles.Tagline}>
          <h4>Tagline Lorem, vero sint omnis alias ut ratione hic fugit.</h4>
          {currentUser && (
            <div className={styles.ButtonWrapper}>
              <Button
                ariaLabel="Go to profile"
                type="button"
                onClick={handleClick}
                disabled={!currentUser}
              >
                Go to profile
              </Button>
            </div>
          )}
          {!currentUser && (
            <div className={styles.ButtonWrapper}>
              <Link to="/login">
                <Button ariaLabel="Log in user" type="button">
                  Log in
                </Button>
              </Link>
              <Link to="/register">
                <Button ariaLabel="Register new user" type="button">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>
        <Image src={HomePageImage} fluid className={styles.Image} />
      </main>
    </>
  );
};
export default HomePage;
