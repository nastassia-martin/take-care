import styles from "./styles.module.scss";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "../Button/Button";
import { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateProfile } from "../../types/Profile.types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdateProfileSchema,
  UpdateProfileSchemaType,
} from "../../schemas/UpdateProfile";

interface IUpdateUserProfileProps {
  onUpdateUserProfile: SubmitHandler<UpdateProfile>;
  loading: boolean;
  uploadProgress: number | null;
}
const UpdateChildForm: React.FC<IUpdateUserProfileProps> = ({
  onUpdateUserProfile,
  loading,
  uploadProgress,
}) => {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitSuccessful },
  } = useForm<UpdateProfileSchemaType>({
    resolver: zodResolver(UpdateProfileSchema),
    mode: "onChange",
  });

  const photoFileRef = useRef<FileList | null | undefined>(null);
  photoFileRef.current = watch("photoFile");

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful]);
  return (
    <Form onSubmit={handleSubmit(onUpdateUserProfile)}>
      <Form.Group controlId="photo" className="mb-3">
        <Form.Label>Profile Photo</Form.Label>
        <Form.Control
          type="file"
          accept="image/gif,image/jpeg,image/png,image/webp"
          {...register("photoFile")}
        />
        {errors.photoFile && (
          <p className={styles.Error}>
            {errors.photoFile.message ?? "Invalid value"}
          </p>
        )}
        <Form.Text>
          {uploadProgress !== null ? (
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
      </Form.Group>

      <Button ariaLabel="Update user" type="submit" disabled={loading}>
        {loading ? "submitting" : "update"}
      </Button>
    </Form>
  );
};
export default UpdateChildForm;
