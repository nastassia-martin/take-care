import {
  NewChildProfile,
  NewParentCredential,
  NewParentProfile,
} from "../types/CreateProfile.types";
import RegisterUserForm from "../components/Forms/RegisterUserForm";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { newParentCol, newChildCol } from "../services/firebase";

import { doc, setDoc } from "firebase/firestore";
import { Role } from "../types/GenericTypes.types";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import styles from "../components/Forms/styles.module.scss";
const RegisterUserPage = () => {
  const handleSignUp = async (data: NewParentCredential) => {
    try {
      //create parent in auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.parent.email,
        data.parent.password!
      );
      // assign the parentID to be the same as their auth UID, and create a new document using the same parentID.
      const parentUID = userCredential.user.uid;
      const childdocRef = doc(newChildCol);
      const parentdocRef = doc(newParentCol, parentUID);
      const childID = childdocRef.id;

      const newParentProfile: NewParentProfile = {
        _id: parentUID,
        contact: {
          firstName: data.parent.firstName,
          lastName: data.parent.lastName,
          email: data.parent.email,
          photoURL: "https://via.placeholder.com/100",
        },
        children: [childID], // this creates a collection Ref ie children/abc
        isAuthorizedForPickUp: false,
        role: Role.NotApproved,
        childrenContact: {
          firstName: data.child.firstName,
          lastName: data.child.lastName,
          date_of_birth: data.child.date_of_birth,
        },
      };

      const newChildProfile: NewChildProfile = {
        _id: childID,
        contact: {
          firstName: data.child.firstName,
          lastName: data.child.lastName,
          photoURL: "https://via.placeholder.com/100",
        },
        date_of_birth: data.child.date_of_birth,
        parents: [parentUID], // this creates a collection Ref ie parents/abc
      };
      await setDoc(parentdocRef, newParentProfile);
      await setDoc(childdocRef, newChildProfile);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className={styles.MainNewProfileWrapper}>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className={styles.CardWrapper}>
            <h3 className={styles.Header}>Register</h3>
            <RegisterUserForm onSignup={handleSignUp} />
          </div>
        </Col>
      </Row>
    </main>
  );
};
export default RegisterUserPage;
