import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "../Button/Button";
import {
  NewProfileSchema,
  NewProfileSchemaType,
} from "../../schemas/NewChildProfile";
import {
  ChildProfile,
  FamilyProfile,
  ParentProfile,
} from "../../types/CreateProfile.types";
import {
  CollectionReference,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../../services/firebase";
import { useEffect } from "react";
import { Role } from "../../types/GenericTypes.types";
import { sendSignInLinkToEmail } from "firebase/auth";

const CreateFamilyProfile = () => {
  const createCollection = (collectionName: string) => {
    return collection(db, collectionName) as CollectionReference;
  };
  const children = createCollection("children");
  const parents = createCollection("parents");

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitSuccessful, isDirty, isValid },
    reset,
  } = useForm<NewProfileSchemaType>({
    resolver: zodResolver(NewProfileSchema),
    // default values will be empty string
    defaultValues: {
      child: {
        firstName: "",
        lastName: "",
        department: "",
      },
      parent: {
        firstName: "",
        lastName: "",
        email: "",
      },
    },
  });

  const onCreateChildProfile: SubmitHandler<FamilyProfile> = async (data) => {
    const childdocRef = doc(children);
    const parentdocRef = doc(parents);
    const parentID = parentdocRef.id;
    const childID = childdocRef.id;

    const newChildProfile: ChildProfile = {
      _id: childID,
      contact: {
        firstName: data.child.firstName,
        lastName: data.child.lastName,
        photoURL: "https://via.placeholder.com/100",
      },
      department: data.child.department,
      allergies: "",
      date_of_birth: data.child.date_of_birth,
      keyTeacher: "",
      parents: [parentID], // this creates a collection Ref ie parents/abc
    };

    const newParentProfile: ParentProfile = {
      _id: parentID,
      contact: {
        firstName: data.parent.firstName,
        lastName: data.parent.lastName,
        email: data.parent.email,
        photoURL: "https://via.placeholder.com/100",
      },
      children: [childID], // this creates a collection Ref ie children/abc
      isAuthorizedForPickUp: true,
      role: data.parent.role,
    };

    await setDoc(childdocRef, newChildProfile);
    await setDoc(parentdocRef, newParentProfile);

    // send email notification to User for them to complete their user registration.
    try {
      await sendSignInLinkToEmail(auth, data.parent.email, {
        url: "http://localhost:5173/", // change to website URL when live
        handleCodeInApp: true,
      });
      localStorage.setItem("email", data.parent.email);
    } catch (error) {
      console.log(error);
    }

    console.log("here is the data: ", data);
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  /**
   * @todo map department for child depnding on auth of teacher
   * @todo on create the account is created for parent and child (toast)
   * @todo on success generate an email to the parent that their account has been set up
   * @todo on error show a toast
   * @todo what happens if the email already exists?
   */
  return (
    <main className={styles.MainNewProfileWrapper}>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <div className={styles.CardWrapper}>
              <h3 className={styles.Header}>New child account</h3>

              {/* information about child */}
              <Form onSubmit={handleSubmit(onCreateChildProfile)}>
                <Form.Group controlId="childFirstName" className="mb-3">
                  <Form.Label>Child's First Name</Form.Label>
                  <Form.Control
                    placeholder="Astrid"
                    type="text"
                    {...register("child.firstName")}
                  />
                  {errors.child?.firstName && (
                    <p className={styles.Error}>
                      {errors.child.firstName.message || "Invalid input"}
                    </p>
                  )}
                </Form.Group>
                <Form.Group controlId="childLastName" className="mb-3">
                  <Form.Label>Child's Last Name</Form.Label>
                  <Form.Control
                    placeholder="Lindegren"
                    type="text"
                    {...register("child.lastName")}
                  />
                  {errors.child?.lastName && (
                    <p className={styles.Error}>
                      {errors.child.lastName.message || "Invalid input"}
                    </p>
                  )}
                </Form.Group>
                <Form.Group controlId="child_date_of_birth" className="mb-3">
                  <Form.Label>Child's Date of Birth</Form.Label>
                  <Form.Control
                    placeholder="01-08-2021"
                    type="date"
                    {...register("child.date_of_birth", {
                      valueAsDate: true,
                    })}
                  />
                  {errors.child?.date_of_birth && (
                    <p className={styles.Error}>
                      {errors.child.date_of_birth.message || "Invalid input"}
                    </p>
                  )}
                </Form.Group>
                {/* map over the departments available to that teacher */}
                <Form.Group controlId="department" className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Select
                    aria-label="Select department"
                    {...register("child.department")}
                  >
                    <option>Please select a department</option>
                    <option>Apple</option>
                  </Form.Select>
                  {errors.child?.department && (
                    <p className={styles.Error}>
                      {errors.child.department.message || "Invalid input"}
                    </p>
                  )}
                </Form.Group>

                {/* information about parent */}
                <Form.Group controlId="parent-first-name" className="mb-3">
                  <Form.Label>Parent's First Name</Form.Label>
                  <Form.Control
                    placeholder="Ziggy"
                    type="text"
                    {...register("parent.firstName")}
                  />
                  {errors.parent?.firstName && (
                    <p className={styles.Error}>
                      {errors.parent.firstName.message || "Invalid input"}
                    </p>
                  )}
                </Form.Group>
                <Form.Group controlId="parent-last-name" className="mb-3">
                  <Form.Label>Parent's Last Name</Form.Label>
                  <Form.Control
                    placeholder="Stardust"
                    type="text"
                    {...register("parent.lastName")}
                  />
                  {errors.parent?.lastName && (
                    <p className={styles.Error}>
                      {errors.parent.lastName.message || "Invalid input"}
                    </p>
                  )}
                </Form.Group>
                <Form.Group controlId="role" className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    aria-label="Please select role"
                    {...register("parent.role")}
                  >
                    <option>Please select the parents' role</option>
                    <option>{Role.User}</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    placeholder="example@example.com"
                    type="email"
                    {...register("parent.email")}
                  />
                  {errors.parent?.email && (
                    <p className={styles.Error}>
                      {errors.parent.email.message ?? "Invalid value"}
                    </p>
                  )}
                </Form.Group>
                {/* <Form.Group controlId="password" className="mb-3">
                  <Form.Label>password</Form.Label>
                  <Form.Control
                    autoComplete="new-password"
                    type="password"
                    {...register("parent.password")}
                  />
                  {errors.parent?.email && (
                    <p className={styles.Error}>
                      {errors.parent.email.message ?? "Invalid value"}
                    </p>
                  )}
                </Form.Group> */}
                <Button
                  text="Create new account"
                  ariaLabel="Create new account for child"
                  type="submit"
                  disabled={!isDirty || !isValid}
                />
              </Form>
            </div>
          </Card>
        </Col>
      </Row>
    </main>
  );
};

export default CreateFamilyProfile;
