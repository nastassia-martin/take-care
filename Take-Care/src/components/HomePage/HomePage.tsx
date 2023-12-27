import styles from "./styles.module.scss";
import Image from "react-bootstrap/Image";
import HomePageImage from "../../assets/images/HomePage.png";
import Button from "../Button/Button";
import ProfileDetails from "../Profile/ProfileDetails";
import useGetChildren from "../../hooks/useGetChildren";
import ParentProfilePage from "../../pages/ParentProfile/ParentProfilePage";

const HomePage = () => {
  const { data } = useGetChildren();

  return (
    <>
      <main className={styles.MainWrapper}>
        <div className={styles.Tagline}>
          <h4>Tagline Lorem, vero sint omnis alias ut ratione hic fugit.</h4>
          <div className={styles.ButtonWrapper}>
            <Button text="Log in" ariaLabel="Log in" type="button" />
            <Button text="Sign up" ariaLabel="Sign up" type="button" />
          </div>
        </div>
        <Image src={HomePageImage} fluid className={styles.Image} />
      </main>
      <div>
        {data?.map((d) => (
          <>
            <ProfileDetails
              key={d._id}
              src={d.contact.photoURL}
              firstName={d.contact.firstName}
              lastName={d.contact.lastName}
            />
          </>
        ))}
      </div>
    </>
  );
};
export default HomePage;
