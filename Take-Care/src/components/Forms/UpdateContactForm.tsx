import styles from "./styles.module.scss";
import Form from "react-bootstrap/Form";
import Button from "../Button/Button";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Address } from "../../types/Profile.types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateAddressSchema,
  UpdateAddressSchemaType,
} from "../../schemas/UpdateAddress";

interface IUpdateUserAddressProps {
  onUpdateUserAddress: SubmitHandler<Address>;
  loading: boolean;
}
const UpdateUserProfileForm: React.FC<IUpdateUserAddressProps> = ({
  onUpdateUserAddress,
  loading,
}) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<UpdateAddressSchemaType>({
    resolver: zodResolver(UpdateAddressSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);
  return (
    <Form onSubmit={handleSubmit(onUpdateUserAddress)}>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Address</Form.Label>
        <Form.Control
          placeholder="123 Disney Lane"
          type="text"
          {...register("address")}
        />
        {errors.address && (
          <p className={styles.Error}>
            {errors.address.message ?? "Invalid value"}
          </p>
        )}
      </Form.Group>
      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Phone number</Form.Label>
        <Form.Control
          placeholder="07212345"
          type="text"
          {...register("phoneNumber")}
        />
        {errors.phoneNumber && (
          <p className={styles.Error}>
            {errors.phoneNumber.message ?? "Invalid value"}
          </p>
        )}
      </Form.Group>

      <Button ariaLabel="Update address" type="submit" disabled={loading}>
        {loading ? "submitting" : "update"}
      </Button>
    </Form>
  );
};
export default UpdateUserProfileForm;
