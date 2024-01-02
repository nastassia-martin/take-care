/*
1. Register user using their email and password for their credentials. This is put into firebase auth. 
2. Their first & last name, email and their child's first & last name and DOB will be registered at the 
time and their document will be created in the Parent Collection in firebase firestore.
*/
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import styles from "./styles.module.scss";

const RegisterUserForm = () => {
  //track loading
  // track errors
  // handle submit, in so doing create a new user in auth and also a new document in Parent Col.

  return (
    <main>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <div className={styles.CardWrapper}>
            <h3 className={styles.Header}>Register</h3>
            {/* user document information */}
            <Form>
              <Form.Group>
                <Form.Label className="mb-3">First Name</Form.Label>
                <Form.Control placeholder="your first name" type="text" />
              </Form.Group>
              <Form.Group>
                <Form.Label className="mb-3">Last Name</Form.Label>
                <Form.Control placeholder="your last name" type="text" />
              </Form.Group>
              <Form.Group>
                {/* user's child's information */}
                <Form.Label className="mb-3">Child's First Name</Form.Label>
                <Form.Control
                  placeholder="your child's first name"
                  type="text"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="mb-3">Child's Last Name</Form.Label>
                <Form.Control placeholder="your last name" type="text" />
              </Form.Group>
              <Form.Group>
                <Form.Label className="mb-3">Child's date of birth</Form.Label>
                <Form.Control
                  placeholder="your child's date of birth"
                  type="date"
                />
              </Form.Group>
              {/* user's credential information */}
              <Form.Group>
                <Form.Label className="mb-3">Email</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group>
                <Form.Label className="mb-3">Password</Form.Label>
                <Form.Control autoComplete="new-password" />
              </Form.Group>
              <Form.Group>
                <Form.Label className="mb-3">Confirm password</Form.Label>
                <Form.Control autoComplete="off" />
              </Form.Group>
            </Form>
          </div>
        </Col>
      </Row>
    </main>
  );
};
export default RegisterUserForm;
