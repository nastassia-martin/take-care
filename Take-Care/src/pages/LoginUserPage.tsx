import { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import LoginUserForm from "../components/Forms/LoginUserForm";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { FirebaseError } from "firebase/app";
import styles from "../components/Forms/styles.module.scss";
import { LoginCredentials } from "../types/GenericTypes.types";

const LoginUserPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, reloadUser } = useAuth();

  const handleLogin = async (data: LoginCredentials) => {
    setErrorMessage(null);

    try {
      setLoading(true);
      await login(data.email, data.password);
      reloadUser();
      navigate("/profiles");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Internal error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.MainNewProfileWrapper}>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className={styles.CardWrapper}>
            <h3 className={styles.Header}>Register</h3>
            {errorMessage && (
              <p className={styles.ErrorMessage}>{errorMessage}</p>
            )}

            <LoginUserForm onLogin={handleLogin} loading={loading} />
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default LoginUserPage;
