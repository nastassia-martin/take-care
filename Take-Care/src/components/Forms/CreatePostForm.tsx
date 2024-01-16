import styles from "./styles.module.scss";
import Form from "react-bootstrap/Form";
import Button from "../Button/Button";
import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ProgressBar } from "react-bootstrap";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateOrEditPostSchema,
  CreateOrEditPostType,
} from "../../schemas/Post";

interface InitialValues {
  title: string;
  content: string;
}
interface ICreatePostFormProps {
  onCreatePost: SubmitHandler<CreateOrEditPostType>;
  loading: boolean;
  initialValues?: InitialValues;
  onClick?: () => void;
  uploadProgress?: number | null;
}

const CreatePostForm: React.FC<ICreatePostFormProps> = ({
  loading,
  onCreatePost,
  initialValues,
  onClick,
  uploadProgress,
}) => {
  const { title, content } = initialValues || {};

  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm<CreateOrEditPostType>({
    mode: "onChange",
    defaultValues: { title, content },
    resolver: zodResolver(CreateOrEditPostSchema),
  });

  const photoFileRef = useRef<FileList | null | undefined>(null);
  photoFileRef.current = watch("photo") as FileList;

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
      <Form.Group controlId="photo" className="mb-3">
        <Form.Label>Today's Photo</Form.Label>
        <Form.Control
          type="file"
          accept="image/gif,image/jpeg,image/png,image/webp"
          {...register("photo")}
        />
        {errors.photo && (
          <p className={styles.Error}>
            {errors.photo.message ?? "Invalid value"}
          </p>
        )}
        <Form.Text>
          {uploadProgress && uploadProgress !== null ? (
            <ProgressBar
              now={uploadProgress}
              label={`${uploadProgress}%`}
              animated
              className="mt-1"
              variant="success"
            />
          ) : (
            photoFileRef.current &&
            photoFileRef.current.length > 0 && (
              <span>
                {photoFileRef.current[0].name} (
                {Math.round(photoFileRef.current[0].size / 1024)} kB)
              </span>
            )
          )}
        </Form.Text>
      </Form.Group>{" "}
      <Button
        ariaLabel="Register user"
        type="submit"
        disabled={!isValid}
        onClick={onClick}
      >
        {loading ? "submitting" : "Send"}
      </Button>
    </Form>
  );
};
export default CreatePostForm;
