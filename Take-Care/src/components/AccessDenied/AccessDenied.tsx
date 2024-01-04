import styles from "./styles.module.scss";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

interface IAccessDeniedProps {
  text: string;
}

const AccessDenied: React.FC<IAccessDeniedProps> = ({ text }) => {
  return (
    <main className={styles.AccessDenied}>
      <section className={styles.AccessDeniedDetails}>
        <p>You are logged in as {text}</p>
        <p>You are not approved to view this profile.</p>
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
