import { useState } from "react";
import AccessDenied from "../../components/AccessDenied/AccessDenied";
import CreatePostForm from "../../components/Forms/CreatePostForm";
import useAuth from "../../hooks/useAuth";
import { NewPost } from "../../types/Posts.types";
import { FirebaseError } from "firebase/app";
import styles from "./styles.module.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const CreatePostPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { currentUser, createAPost } = useAuth();

  if (!currentUser) {
    return <AccessDenied />;
  }

  // fetch all teachers.

  //If the teachersId is equal to currentUser.id then proceed.

  // if teacher.Role === "Admin" proceed

  // create post

  const handleCreatePost = async (data: NewPost) => {
    try {
      console.log(data);
      setLoading(true);
      // teacher.id once teacher is fetched
      createAPost(data, currentUser.uid);
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
    <main className={styles.PageWrapper}>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <div className={styles.CardWrapper}>
            <h3 className={styles.Header}>Send a post</h3>
            {errorMessage && (
              <p className={styles.ErrorMessage}>{errorMessage}</p>
            )}
            <CreatePostForm onCreatePost={handleCreatePost} loading={loading} />
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default CreatePostPage;
