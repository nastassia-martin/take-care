import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "../Button/Button";
import {
  NewChildProfileSchema,
  NewChildProfileSchemaType,
} from "../../schemas/NewChildProfile";

const CreateProfile = () => {
  const {
    register,
    formState: { errors },
  } = useForm<NewChildProfileSchemaType>({
    resolver: zodResolver(NewChildProfileSchema),
  });

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

              {/* {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} */}
              {/* information about child */}
              <Form>
                <Form.Group controlId="child_first_name" className="mb-3">
                  <Form.Label>Child's First Name</Form.Label>
                  <Form.Control
                    placeholder="Astrid"
                    type="text"
                    {...register("child-first-name")}
                  />
                </Form.Group>
                <Form.Group controlId="child_last_name" className="mb-3">
                  <Form.Label>Child's Last Name</Form.Label>
                  <Form.Control
                    placeholder="Lindegren"
                    type="text"
                    {...register("child-last-name")}
                  />
                </Form.Group>
                <Form.Group controlId="child_dob" className="mb-3">
                  <Form.Label>Child's Date of Birth</Form.Label>
                  <Form.Control
                    placeholder="01-08-2021"
                    type="date"
                    {...register("child_dob", {
                      valueAsDate: true,
                    })}
                  />
                </Form.Group>
                {/* map over the departments available to that teacher */}
                <Form.Group controlId="department" className="mb-3">
                  <Form.Label>Department</Form.Label>
                  <Form.Select
                    aria-label="Select department"
                    {...register("department-id")}
                  >
                    <option>Please select a department</option>
                    <option>Apple</option>
                  </Form.Select>
                </Form.Group>

                {/* information about parent */}
                <Form.Group controlId="parent-first-name" className="mb-3">
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
                      {/* {errors.email.message ?? "Invalid value"} */}
                    </p>
                  )}
                </Form.Group>
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
