import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "../Button/Button";
import {
  NewChildProfileSchemaType,
  NewChildProfileSchema,
} from "../../schemas/NewChildProfile";
import { ChildProfile } from "../../types/CreateProfile.types";

const CreateProfile = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<NewChildProfileSchemaType>({
    resolver: zodResolver(NewChildProfileSchema),
  });

  const onCreateChildProfile: SubmitHandler<ChildProfile> = (data) => {
    console.log("here is the data: ", data);
  };

  /**
   * @todo map department for child depnding on auth of teacher
   * @todo on create the account is created for parent and child
   * @todo validation for for parent
   * @todo on success show a toast
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
              <h5 className={styles.Header}>New child account</h5>

              {/* information about child */}
              <Form onSubmit={handleSubmit(onCreateChildProfile)}>
                <Form.Group controlId="childFirstName" className="mb-3">
                  <Form.Label>Child's First Name</Form.Label>
                  <Form.Control
                    placeholder="Astrid"
                    type="text"
                    {...register("firstName")}
                  />
                  {errors.firstName && (
                    <p className={styles.Error}>
                      {errors.firstName.message || "Invalid input"}
                    </p>
                  )}
                </Form.Group>
                <Form.Group controlId="childLastName" className="mb-3">
                  <Form.Label>Child's Last Name</Form.Label>
                  <Form.Control
                    placeholder="Lindegren"
                    type="text"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className={styles.Error}>
                      {errors.lastName.message || "Invalid input"}
                    </p>
                  )}
                </Form.Group>
                <Form.Group controlId="child_dob" className="mb-3">
                  <Form.Label>Child's Date of Birth</Form.Label>
                  <Form.Control
                    placeholder="01-08-2021"
                    type="date"
                    {...register("dob", {
                      valueAsDate: true,
                    })}
                  />
                  {errors.dob && (
                    <p className={styles.Error}>
                      {errors.dob.message || "Invalid input"}
                    </p>
                  )}
                </Form.Group>
                {/* map over the departments available to that teacher */}
                <Form.Group controlId="department" className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Select
                    aria-label="Select department"
                    {...register("department")}
                  >
                    <option>Please select a department</option>
                    <option>Apple</option>
                  </Form.Select>
                  {errors.department && (
                    <p className={styles.Error}>
                      {errors.department.message || "Invalid input"}
                    </p>
                  )}
                </Form.Group>

                {/* information about parent */}
                {/* <Form.Group controlId="parent-first-name" className="mb-3">
                  <Form.Label>Parent's First Name</Form.Label>
                  <Form.Control
                    placeholder="Ziggy"
                    type="text"
                    {...register("parent-first-name")}
                  />
                </Form.Group>
                <Form.Group controlId="parent-last-name" className="mb-3">
                  <Form.Label>Parent's Last Name</Form.Label>
                  <Form.Control
                    placeholder="Stardust"
                    type="text"
                    {...register("parent-last-name")}
                  />
                </Form.Group>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    placeholder="example@example.com"
                    type="email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="invalid">
                      {errors.email.message ?? "Invalid value"}
                    </p>
                  )}
                </Form.Group> */}
                <Button
                  text="Create new account"
                  ariaLabel="Create new account for child"
                  type="submit"
                />
              </Form>
            </div>
          </Card>
        </Col>
      </Row>
    </main>
  );
};

export default CreateProfile;
