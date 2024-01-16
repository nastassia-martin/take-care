import { useEffect, useState } from "react";
import AccessDenied from "../../components/AccessDenied/AccessDenied";
import CreatePostForm from "../../components/Forms/CreatePostForm";
import useAuth from "../../hooks/useAuth";
import { NewPostWithPhotoFile } from "../../types/Posts.types";
import { FirebaseError } from "firebase/app";
import styles from "./styles.module.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import useGetTeacher from "../../hooks/useGetTeacher";
import RenderPosts from "../../components/Posts/Posts";
import useGetPostsForParentOrTeacher from "../../hooks/useGetPostsForParentsOrTeacher";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../services/firebase";
import { v4 as uuidv4 } from "uuid";

const CreatePostPage = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasAdminAccess, setHasAdminAccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const [isParent, setIsParent] = useState(false);
  const { currentUser, createAPost } = useAuth();
  const { data: teacher, loading: teacherLoading } = useGetTeacher(
    currentUser?.uid
  );
  const { data, loading: posts } = useGetPostsForParentOrTeacher(
    currentUser?.uid
  );
  const isLoading = teacherLoading || loading || posts;

  useEffect(() => {
    // When teacher data is fetched, check if the role is 'admin'
    if (teacher) {
      teacher?.role === "Admin"
        ? setHasAdminAccess(true)
        : setHasAdminAccess(false);
    }
    //ensure current user should have access to this page
    if (data && currentUser) {
      data.map((parent) => parent.parents.includes(currentUser.uid))
        ? setIsParent(true)
        : setIsParent(false);
    }
  }, [teacher, data]);

  if (!currentUser) {
    return (
      <AccessDenied customMessage="You are not approved to view this page." />
    );
  }

  // create post

  const handleCreatePost = async (data: NewPostWithPhotoFile) => {
    try {
      setLoading(true);

      //only a teacher can create a post
      if (!teacher) {
        throw new Error("You do not have permission to create a post.");
      }
      let newPhotoUrl = ""; // workaround to capture photo everytime.
      if (data.photo && data.photo.length) {
        const uuid = uuidv4();

        const todaysPic = data.photo[0];
        // ref for file upload, eg / teachers/miniMouse
        const fileRef = ref(
          storage,
          `posts/${teacher._id}/photos/${uuid}/${todaysPic.name}`
        );

        newPhotoUrl = await new Promise((resolve, reject) => {
          const uploadTask = uploadBytesResumable(fileRef, todaysPic);
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
              reject(err);
              setErrorMessage(err.message);
            },
            async () => {
              const url = await getDownloadURL(fileRef);
              //setPhotoUrl(url);
              resolve(url);
              setUploadProgress(null);
            }
          );
        });
      }
      // remove photo from
      const { photo, ...restFormData } = data;

      const postData = {
        ...restFormData,
        photo: newPhotoUrl,
      };
      const authorName = `${teacher.contact.firstName} ${teacher.contact.lastName} `;

      await createAPost(postData, teacher._id, teacher.parents, authorName);
    } catch (error: any) {
      if (error instanceof FirebaseError) {
        setErrorMessage(error.message);
        console.log(error.message);
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
                  uploadProgress={uploadProgress}
                />
              </>
            ) : null}
          </div>
        </Col>
      </Row>
      {/* {!isParent && <AccessDenied />} */}
      {(hasAdminAccess || isParent) && currentUser && data ? (
        <RenderPosts data={data} userId={currentUser.uid} />
      ) : (
        currentUser && <AccessDenied />
      )}
      {!data && hasAdminAccess && <p>No posts created yet - write one!</p>}
    </main>
  );
};

export default CreatePostPage;
