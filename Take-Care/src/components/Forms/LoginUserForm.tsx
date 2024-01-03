import { useEffect } from "react";
import Form from "react-bootstrap/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { LoginCredentials } from "../../types/GenericTypes.types";
import Button from "../Button/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaType } from "../../schemas/Login";
interface IFormProps {
  onLogin: SubmitHandler<LoginCredentials>;
  loading: boolean;
}

const LoginUserForm: React.FC<IFormProps> = ({ onLogin, loading }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <Form onSubmit={handleSubmit(onLogin)}>
      <Form.Group controlId="parent_email" className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          placeholder="example@example.com"
          type="email"
          {...register("email")}
        />
        {errors.email && (
          <p className={styles.Error}>
            {errors.email.message ?? "Invalid value"}
          </p>
        )}
      </Form.Group>
      <Form.Group controlId="parent_password" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          autoComplete="password"
          type="password"
          {...register("password")}
        />
        {errors.password && (
          <p className={styles.Error}>
            {errors.password.message ?? "Invalid value"}
          </p>
        )}
      </Form.Group>
      <Button ariaLabel="Register user" type="submit" disabled={!isValid}>
        {loading ? "submitting" : "Login"}
      </Button>
    </Form>
  );
};

export default LoginUserForm;
