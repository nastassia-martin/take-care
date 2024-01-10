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
import RenderPosts from "../../components/Posts/Posts";
import useGetPosts from "../../hooks/useGetPosts";

const CreatePostPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasAdminAccess, setHasAdminAccess] = useState(false);

  const { currentUser, createAPost } = useAuth();
  const { data: teacher, loading: teacherLoading } = useGetTeacher(
    currentUser?.uid
  );

  const { data: posts, loading: postsLoading } = useGetPosts(currentUser?.uid);

  const isLoading = teacherLoading || loading || postsLoading;

  useEffect(() => {
    // When teacher data is fetched, check if the role is 'admin'
    if (teacher) {
      teacher?.role === "Admin"
        ? setHasAdminAccess(true)
        : setHasAdminAccess(false);
    }
  }, [teacher]);

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
                {isLoading && <div>loading...</div>}
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

      {posts && hasAdminAccess && (
        <RenderPosts
          data={posts}
          teacherName={`${teacher?.contact.firstName} ${teacher?.contact.lastName} `}
        />
      )}
      {!posts && hasAdminAccess && <p>No posts created yet - write one!</p>}
    </main>
  );
};

export default CreatePostPage;
