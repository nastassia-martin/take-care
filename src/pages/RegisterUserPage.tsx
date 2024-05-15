import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import {
  NewChildProfile,
  NewParentCredential,
  NewParentProfile,
} from "../types/Profile.types";
import RegisterUserForm from "../components/Forms/RegisterUserForm";
import { Role } from "../types/GenericTypes.types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "../components/Forms/styles.module.scss";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { getChildIdForSecondCareGiver } from "../helpers";

const RegisterUserPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signUp, signUpSecondCareProvider } = useAuth();

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

      navigate("/");
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

  const handleSignUpSecondCareGiver = async (data: NewParentCredential) => {
    setErrorMessage(null);
    // try to register the second careGiver the user using form
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

      const id = await getChildIdForSecondCareGiver(
        data.child.firstName,
        data.child.lastName,
        data.child.date_of_birth
      );
      if (id) {
        await signUpSecondCareProvider(
          data.parent.email,
          data.parent.password!,
          newParentProfile,
          id
        );
      }
      navigate("/");
    } catch (error: any) {
      if (error instanceof FirebaseError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.MainNewProfileWrapper}>
      <Tabs defaultActiveKey="NewUser" fill className={styles.Tab}>
        <Tab title="Register name and child" eventKey="NewUser">
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <div className={styles.CardWrapper}>
                <h3 className={styles.Header}>Register</h3>
                {errorMessage && (
                  <p className={styles.ErrorMessage}>{errorMessage}</p>
                )}

                <RegisterUserForm
                  onSignup={handleSignUp}
                  loading={loading}
                  tab="first-parent"
                />
              </div>
            </Col>
          </Row>
        </Tab>
        <Tab title="Child already registered" eventKey="secondCareGiver">
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <div className={styles.CardWrapper}>
                <h3 className={styles.Header}>Register as second caregiver</h3>
                <p className="small mb-3">
                  Only use this form if your child is already registered
                </p>
                {errorMessage && (
                  <p className={styles.ErrorMessage}>{errorMessage}</p>
                )}

                <RegisterUserForm
                  onSignup={handleSignUpSecondCareGiver}
                  loading={loading}
                  tab="second-parent"
                />
              </div>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </main>
  );
};
export default RegisterUserPage;
