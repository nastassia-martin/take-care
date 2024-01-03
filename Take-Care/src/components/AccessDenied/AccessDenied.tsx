import styles from "./styles.module.scss";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

interface IAccessDeniedPropss {
  text: string;
}

const AccessDenied: React.FC<IAccessDeniedPropss> = ({ text }) => {
  return (
    <main className={styles.AccessDenied}>
      <section className={styles.AccessDeniedDetails}>
        <p>You are logged in as {text}</p>
        <p>You can view this profile once you are approved.</p>
        <Link to="/" className={styles.AccessDeniedLink}>
          <Button type="button" ariaLabel="Back to home page">
            Back to Home Page
          </Button>
        </Link>
      </section>
    </main>
  );
};
export default AccessDenied;
