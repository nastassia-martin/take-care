import styles from "./styles.module.scss";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

interface IAccessDeniedProps {
  email: string | null;
  customMessage?: string;
}

const AccessDenied: React.FC<IAccessDeniedProps> = ({
  email,
  customMessage,
}) => {
  return (
    <main className={styles.AccessDenied}>
      <section className={styles.AccessDeniedDetails}>
        <p>You are logged in as {email}</p>
        {customMessage ? (
          <p>{customMessage}</p>
        ) : (
          <p>You are not approved to view this profile.</p>
        )}

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
