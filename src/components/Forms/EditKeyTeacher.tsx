import styles from "./styles.module.scss";
import Form from "react-bootstrap/Form";
import Button from "../Button/Button";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { KeyTeacher, TeacherProfile } from "../../types/Profile.types";

interface IKeyTeacherFormProps {
  onEdit: SubmitHandler<KeyTeacher>;
  loading: boolean;
  teachers: TeacherProfile[] | null;
}

const EditKeyTeacherForm: React.FC<IKeyTeacherFormProps> = ({
  onEdit,
  loading,
  teachers,
}) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm<KeyTeacher>({ mode: "onChange" });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <Form onSubmit={handleSubmit(onEdit)}>
      <Form.Group controlId="_id">
        <Form.Label>Select Teacher</Form.Label>
        <Form.Select {...register("_id", { required: true })}>
          {teachers?.map((teacher) => (
            <option key={teacher._id} value={teacher._id}>
              {teacher.contact.firstName} {teacher.contact.lastName}
            </option>
          ))}
        </Form.Select>
        {errors._id && <p className={styles.Error}>{errors._id.message}</p>}
      </Form.Group>
      <Button ariaLabel="Register user" type="submit" disabled={!isValid}>
        {loading ? "submitting" : "register"}
      </Button>
    </Form>
  );
};
export default EditKeyTeacherForm;
