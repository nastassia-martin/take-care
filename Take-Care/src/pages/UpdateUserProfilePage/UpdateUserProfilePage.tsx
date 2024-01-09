import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FirebaseError } from "firebase/app";
import { storage } from "../../services/firebase";
import AccessDenied from "../../components/AccessDenied/AccessDenied";
import UpdateUserProfileForm from "../../components/Forms/UpdateUserProfileForm";
import styles from "./styles.module.scss";
import useAuth from "../../hooks/useAuth";
import { UpdateProfile } from "../../types/Profile.types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";

const UpdateUserProfilePage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const {
    currentUser,
    updateParentPhotoUrl,
    setPhotoUrl,
    setEmail,
    reloadUser,
    setPassword,
  } = useAuth();

  if (!currentUser) {
    return <AccessDenied email="no email" />;
  }

  const handleUpdateUserProfile = async (data: UpdateProfile) => {
    setErrorMessage(null);

    try {
      setLoading(true);

      if (data.email && data.email !== (currentUser.email ?? "")) {
        await setEmail(data.email);
      }

      if (data.photoFile && data.photoFile.length) {
        const userProfilePic = data.photoFile[0];
        // ref for file upload, eg / parents/abcd123/miniMouse
        const fileRef = ref(
          storage,
          `parents/${currentUser.uid}/${userProfilePic.name}`
        );
        // upload photo to fileRef
        const uploadTask = uploadBytesResumable(fileRef, userProfilePic);

        // attach upload observer so that it can catch err and show progress of upload
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            setUploadProgress(
              Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 1000
              ) / 10
            );
          },
          (err) => {
            alert(err);
            setErrorMessage("Something went wrong with the upload");
            setUploadProgress(null);
          },
          async () => {
            const photoUrl = await getDownloadURL(fileRef);
            // update parentAuth
            await setPhotoUrl(photoUrl);
            // update parent profile with the same url to ensure single source of truth
            await updateParentPhotoUrl(currentUser.uid, photoUrl);
            // set to null to remove ProgressBar from DOM
            setUploadProgress(null);
          }
        );
      }

      if (data.password) {
        await setPassword(data.password);
      }

      await reloadUser();

      //update parent document

      setLoading(false);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Internal server error");
      }
    }
    setLoading(false);
  };

  return (
    <main className={styles.UpdateProfile}>
      {currentUser && (
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div className={styles.CardWrapper}>
              <h3 className={styles.Header}>Update your info</h3>
              {errorMessage && (
                <p className={styles.ErrorMessage}>{errorMessage}</p>
              )}

              <UpdateUserProfileForm
                uploadProgress={uploadProgress}
                loading={loading}
                onUpdateUserProfile={handleUpdateUserProfile}
              />
              <Link to={`/parents/${currentUser.uid}`}>
                <Button
                  ariaLabel="back to profile"
                  className={styles.BackToProfile}
                >
                  Back to profile
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      )}
    </main>
  );
};

export default UpdateUserProfilePage;
