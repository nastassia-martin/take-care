import { useEffect, useState } from "react";
import AccessDenied from "../../components/AccessDenied/AccessDenied";
import CreatePostForm from "../../components/Forms/CreatePostForm";
import useAuth from "../../hooks/useAuth";
import { NewPost } from "../../types/Posts.types";
import { FirebaseError } from "firebase/app";
import styles from "./styles.module.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import useGetTeacher from "../../hooks/useGetTeacher";

const CreatePostPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasAdminAccess, setHasAdminAccess] = useState(false);

  const { currentUser, createAPost } = useAuth();
  const { data: teacher, loading: teacherLoading } = useGetTeacher(
    currentUser?.uid
  );
  const isLoading = teacherLoading || loading;

  useEffect(() => {
    // When teacher data is fetched, check if the role is 'admin'
    if (teacher) {
      teacher?.role === "Admin"
        ? setHasAdminAccess(true)
        : setHasAdminAccess(false);
    }
  }, [teacher]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!currentUser) {
    return <AccessDenied />;
  }

  // create post

  const handleCreatePost = async (data: NewPost) => {
    try {
      setLoading(true);

      //only a teacher can create a post
      if (!teacher) {
        throw new Error("You do not have permission to create a post.");
      }

      await createAPost(data, teacher._id);
    } catch (error: any) {
      if (error instanceof FirebaseError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(error.message);
      }
    }
    setLoading(false);
  };

  return (
    <main className={styles.PageWrapper}>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <div className={styles.CardWrapper}>
            {hasAdminAccess ? (
              <>
                <h3 className={styles.Header}>Send a post</h3>
                {errorMessage && (
                  <p className={styles.ErrorMessage}>{errorMessage}</p>
                )}

                <CreatePostForm
                  onCreatePost={handleCreatePost}
                  loading={isLoading}
                />
              </>
            ) : (
              <AccessDenied customMessage="You don't have permission to view this page" />
            )}
          </div>
        </Col>
      </Row>
    </main>
  );
};

export default CreatePostPage;
