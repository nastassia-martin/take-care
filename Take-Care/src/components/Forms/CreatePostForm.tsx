import styles from "./styles.module.scss";
import Form from "react-bootstrap/Form";
import Button from "../Button/Button";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { NewPost } from "../../types/Posts.types";

interface ICreatePostFormProps {
  onCreatePost: SubmitHandler<NewPost>;
  loading: boolean;
}

const CreatePostForm: React.FC<ICreatePostFormProps> = ({
  loading,
  onCreatePost,
}) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm<NewPost>({ mode: "onChange" });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);

  return (
    <Form onSubmit={handleSubmit(onCreatePost)}>
      <Form.Group className="mb-3" controlId="title">
        <Form.Label>Title</Form.Label>
        <Form.Control placeholder="Title" type="text" {...register("title")} />
        {errors.title && <p className={styles.Error}>{errors.title.message}</p>}
      </Form.Group>

      <Form.Group className="mb-3" controlId="content">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="What happened today?"
          type="text"
          rows={4}
          {...register("content")}
        />
        {errors.content && (
          <p className={styles.Error}>{errors.content.message}</p>
        )}
      </Form.Group>
      <Button ariaLabel="Register user" type="submit" disabled={!isValid}>
        {loading ? "submitting" : "Send"}
      </Button>
    </Form>
  );
};
export default CreatePostForm;
