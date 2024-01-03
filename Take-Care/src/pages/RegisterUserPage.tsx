import {
  NewChildProfile,
  NewParentCredential,
  NewParentProfile,
} from "../types/CreateProfile.types";
import RegisterUserForm from "../components/Forms/RegisterUserForm";
import { Role } from "../types/GenericTypes.types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "../components/Forms/styles.module.scss";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";

const RegisterUserPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { signUp } = useAuth();
  const handleSignUp = async (data: NewParentCredential) => {
    setErrorMessage(null);

    // try to register the user using form
    try {
      setLoading(true);
      const newParentProfile: NewParentProfile = {
        _id: "", //fulfilled by auth
        contact: {
          firstName: data.parent.firstName,
          lastName: data.parent.lastName,
          email: data.parent.email,
          photoURL: "https://via.placeholder.com/100",
        },
        children: [""], //fulfilled by auth
        isAuthorizedForPickUp: false,
        role: Role.NotApproved,
        childrenContact: {
          firstName: data.child.firstName,
          lastName: data.child.lastName,
          date_of_birth: data.child.date_of_birth,
        },
      };

      const newChildProfile: NewChildProfile = {
        _id: "", //fulfilled by auth
        contact: {
          firstName: data.child.firstName,
          lastName: data.child.lastName,
          photoURL: "https://via.placeholder.com/100",
        },
        date_of_birth: data.child.date_of_birth,
        parents: [""], //fulfilled by auth
      };
      await signUp(
        data.parent.email,
        data.parent.password!,
        newParentProfile,
        newChildProfile
      );
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

            <RegisterUserForm onSignup={handleSignUp} loading={loading} />
          </div>
        </Col>
      </Row>
    </main>
  );
};
export default RegisterUserPage;
