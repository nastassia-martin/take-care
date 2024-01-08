/*
1. Register user using their email and password for their credentials. This is put into firebase auth. 
2. Their first & last name, email and their child's first & last name and DOB will be registered at the 
time and their document will be created in the Parent Collection in firebase firestore.
*/
import { zodResolver } from "@hookform/resolvers/zod";

import { SubmitHandler, useForm } from "react-hook-form";
import {
  NewProfileSchema,
  NewProfileSchemaType,
} from "../../schemas/NewChildProfile";
import Form from "react-bootstrap/Form";

import styles from "./styles.module.scss";
import Button from "../Button/Button";
import { useEffect } from "react";
import { NewParentCredential } from "../../types/Profile.types";

interface IFormProps {
  onSignup: SubmitHandler<NewParentCredential>;
  loading: boolean;
}
const RegisterUserForm: React.FC<IFormProps> = ({ onSignup, loading }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm<NewProfileSchemaType>({
    resolver: zodResolver(NewProfileSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);
  return (
    <Form onSubmit={handleSubmit(onSignup)}>
      <Form.Group controlId="parent_first_name" className="mb-3">
        <Form.Label>First Name</Form.Label>
        <Form.Control
          placeholder="your first name"
          type="text"
          {...register("parent.firstName")}
        />
        {errors.parent?.firstName && (
          <p className={styles.Error}>
            {errors.parent.firstName.message || "Invalid input"}
          </p>
        )}
      </Form.Group>
      <Form.Group controlId="parent_first_name" className="mb-3">
        <Form.Label>Last Name</Form.Label>
        <Form.Control
          placeholder="your last name"
          type="text"
          {...register("parent.lastName")}
        />
        {errors.parent?.lastName && (
          <p className={styles.Error}>
            {errors.parent.lastName.message || "Invalid input"}
          </p>
        )}
      </Form.Group>
      <Form.Group controlId="child_first_name" className="mb-3">
        {/* user's child's information */}
        <Form.Label className="mb-3">Child's First Name</Form.Label>
        <Form.Control
          placeholder="your child's first name"
          type="text"
          {...register("child.firstName")}
        />
        {errors.child?.firstName && (
          <p className={styles.Error}>
            {errors.child.firstName.message || "Invalid input"}
          </p>
        )}
      </Form.Group>
      <Form.Group controlId="child_last_name" className="mb-3">
        <Form.Label>Child's Last Name</Form.Label>
        <Form.Control
          placeholder="your last name"
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
        <Form.Label>Child's date of birth</Form.Label>
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
      {/* user's credential information */}
      <Form.Group controlId="parent_email" className="mb-3">
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
      <Form.Group controlId="parent_password" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          autoComplete="new-password"
          type="password"
          {...register("parent.password")}
        />
        {errors.parent?.password && (
          <p className={styles.Error}>
            {errors.parent.password.message ?? "Invalid value"}
          </p>
        )}
      </Form.Group>
      <Form.Group controlId="parent_password_confirm" className="mb-3">
        <Form.Label>Confirm password</Form.Label>
        <Form.Control
          type="password"
          autoComplete="off"
          {...register("parent.passwordConfirm")}
        />
        {errors.parent?.passwordConfirm && (
          <p className={styles.Error}>
            {errors.parent.passwordConfirm.message ?? "Invalid value"}
          </p>
        )}
      </Form.Group>
      <Button ariaLabel="Register user" type="submit" disabled={!isValid}>
        {loading ? "submitting" : "register"}
      </Button>
    </Form>
  );
};

export default RegisterUserForm;
