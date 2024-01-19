import { useState } from "react";
import { FirebaseError } from "firebase/app";
import AccessDenied from "../../components/AccessDenied/AccessDenied";
import UpdateUserProfileForm from "../../components/Forms/UpdateContactForm";
import styles from "./styles.module.scss";
import useAuth from "../../hooks/useAuth";
import { Address } from "../../types/Profile.types";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "../../components/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import useGetParent from "../../hooks/useGetParent";

const UpdateUserContactPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { currentUser, updateParentAddress, updateParentTelephone } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    return <AccessDenied />;
  }
  const { data: parent } = useGetParent(currentUser.uid);

  // is user is not the same as the parent then forbid access
  if (currentUser.uid !== parent?._id) {
    return <AccessDenied />;
  }
  const handleUpdateUserAddress = async (data: Address) => {
    setErrorMessage(null);

    try {
      setLoading(true);

      if (data.address) {
        await updateParentAddress(currentUser.uid, data.address);
      }

      if (data.phoneNumber) {
        await updateParentTelephone(currentUser.uid, data.phoneNumber);
      }

      setLoading(false);
      navigate(-1);
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
                loading={loading}
                onUpdateUserAddress={handleUpdateUserAddress}
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

export default UpdateUserContactPage;
