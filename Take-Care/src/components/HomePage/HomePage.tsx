import styles from "./styles.module.scss";
import Image from "react-bootstrap/Image";
import HomePageImage from "../../assets/images/KidsPlaying.png";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useGetParent from "../../hooks/useGetParent";
import { useNavigate } from "react-router-dom";
import useGetTeacher from "../../hooks/useGetTeacher";

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const isParentProfile = useGetParent(currentUser?.uid);
  const isTeacherProfile = useGetTeacher(currentUser?.uid);

  const handleClick = () => {
    if (currentUser) {
      // Check if the current user is a parent and navigate to their profile
      if (isParentProfile?.data) {
        navigate(`/parents/${currentUser.uid}`);
      }
      // Else, if the current user is a teacher, navigate to their profile
      else if (isTeacherProfile?.data) {
        navigate(`/teachers/${currentUser.uid}`);
      }
    }
  };
  return (
    <>
      <main className={styles.Main}>
        <div className={styles.MainWrapper}>
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
          <div className={styles.ImageWrapper}>
            <Image src={HomePageImage} fluid className={styles.Image} />
          </div>
        </div>
      </main>
    </>
  );
};
export default HomePage;
