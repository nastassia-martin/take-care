import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./styles.module.scss";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "../Button/Button";
import { newTeacherCol } from "../../services/firebase";
import { doc, setDoc } from "firebase/firestore";
import { NewTeacherProfile } from "../../types/Profile.types";
import { Role } from "../../types/GenericTypes.types";
import {
  NewTeacherProfileSchema,
  NewProfileSchemaType,
} from "../../schemas/NewTeacherProfile";
const CreateTeacherProfile = () => {
  const {
    handleSubmit,
    register,
    formState: { isDirty, errors, isSubmitSuccessful, isValid },
    reset,
  } = useForm<NewProfileSchemaType>({
    resolver: zodResolver(NewTeacherProfileSchema),
    defaultValues: {
      contact: {
        firstName: "",
        lastName: "",
        email: "",
      },
      role: Role.Admin,
    },
  });

  const onCreateTeacherProfile: SubmitHandler<NewTeacherProfile> = async (
    data
  ) => {
    const teacherDocRef = doc(newTeacherCol);
    const defaultPhotoURL = "https://via.placeholder.com/100";

    const newTeacherProfile = {
      contact: {
        firstName: data.contact.firstName,
        lastName: data.contact.lastName,
        email: data.contact.email,
        photoURL: data.contact.photoURL || defaultPhotoURL,
      },
      role: data.role,
    };

    await setDoc(teacherDocRef, newTeacherProfile);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <main className={styles.MainNewProfileWrapper}>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <div className={styles.CardWrapper}>
              <h3 className={styles.Header}>New teacher account</h3>

              <Form onSubmit={handleSubmit(onCreateTeacherProfile)}>
                <Form.Group controlId="teacherFirstName" className="mb-3">
                  <Form.Label>Teacher's Fist Name</Form.Label>
                  <Form.Control
                    placeholder="Jane"
                    type="text"
                    {...register("contact.firstName")}
                  />
                  {errors.contact?.firstName && (
                    <p className={styles.Error}>
                      {errors.contact.firstName.message || "Invalid input"}
                    </p>
                  )}
                </Form.Group>
                <Form.Group controlId="teacherLastName" className="mb-3">
                  <Form.Label>Teacher's Last Name</Form.Label>
                  <Form.Control
                    placeholder="Honey"
                    type="text"
                    {...register("contact.lastName")}
                  />
                  {errors.contact?.lastName && (
                    <p className={styles.Error}>
                      {errors.contact.lastName.message || "Invalid input"}
                    </p>
                  )}
                </Form.Group>
                <Form.Group controlId="role" className="mb-3">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    aria-label="Please select role"
                    {...register("role")}
                  >
                    <option>Please select the teacher's role</option>
                    <option>{Role.Admin}</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Teacher's email</Form.Label>
                  <Form.Control
                    placeholder="example@example.com"
                    type="email"
                    {...register("contact.email")}
                  />
                  {errors.contact?.email && (
                    <p className={styles.Error}>
                      {errors.contact.email.message ?? "Invalid value"}
                    </p>
                  )}
                </Form.Group>
                <Button
                  ariaLabel="Create new account for child"
                  type="submit"
                  disabled={!isDirty || !isValid}
                >
                  Create new account
                </Button>
              </Form>
            </div>
          </Card>
        </Col>
      </Row>
    </main>
  );
};

export default CreateTeacherProfile;
