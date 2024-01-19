import { useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { FirebaseError } from "firebase/app";
import { storage } from "../../services/firebase";
import AccessDenied from "../../components/AccessDenied/AccessDenied";
import styles from "./styles.module.scss";
import useAuth from "../../hooks/useAuth";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "../../components/Button/Button";
import { Link, useParams } from "react-router-dom";
import UpdateChildForm from "../../components/Forms/UpdateChildForm";
import { UpdateProfile } from "../../types/Profile.types";
import useGetParent from "../../hooks/useGetParent";
import { BounceLoader } from "react-spinners";

const UpdateChildProfilePage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const { id } = useParams();
  const childId = id as string;

  const { currentUser, updateChildPhotoUrl } = useAuth();

  if (!childId) {
    return <div>We could not find a profile.</div>;
  }

  if (!currentUser) {
    return <AccessDenied email="no email" />;
  }
  const { data: parent, loading: parentLoading } = useGetParent(
    currentUser.uid
  );

  const isParentViewingChildProfile = currentUser.uid === parent?._id;
  const isLoading = parentLoading;
  if (isLoading) {
    return <BounceLoader color={"#8989ff"} size={60} />;
  }
  if (!isParentViewingChildProfile) {
    return <AccessDenied customMessage="You cannot edit this profile" />;
  }

  const handleUpdateChildProfile = async (data: UpdateProfile) => {
    setErrorMessage(null);

    try {
      setLoading(false);

      if (data.photoFile && data.photoFile.length) {
        const childProfilePic = data.photoFile[0];
        // ref for file upload, eg / children/miniMouse
        const fileRef = ref(storage, `children/${childProfilePic.name}`);
        // upload photo to fileRef
        const uploadTask = uploadBytesResumable(fileRef, childProfilePic);

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
            // update child profile with the same url to ensure single source of truth
            await updateChildPhotoUrl(childId, photoUrl);
            // set to null to remove ProgressBar from DOM
            setUploadProgress(null);
          }
        );
      }
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
      {isParentViewingChildProfile && (
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <div className={styles.CardWrapper}>
              <h3 className={styles.Header}>Update info</h3>
              {errorMessage && (
                <p className={styles.ErrorMessage}>{errorMessage}</p>
              )}

              <UpdateChildForm
                uploadProgress={uploadProgress}
                loading={loading}
                onUpdateUserProfile={handleUpdateChildProfile}
              />
              <Link to={`/children/${childId}`}>
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
export default UpdateChildProfilePage;
