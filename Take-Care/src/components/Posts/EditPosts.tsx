import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useGetTeacher from "../../hooks/useGetTeacher";
import CreatePostForm from "../Forms/CreatePostForm";
import { Post } from "../../types/Posts.types";
import { useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import AccessDenied from "../AccessDenied/AccessDenied";
import RenderPost from "./RenderPost";
import useGetPostsForParentOrTeacher from "../../hooks/useGetPostsForParentsOrTeacher";
import styles from "./styles.module.scss";
import Button from "../Button/Button";

const EditPost = () => {
  const [hasAdminAccess, setHasAdminAccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isParent, setIsParent] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser, updateAPost, deleteAPost } = useAuth();
  const postId = id as string;

  const { data: teacher, loading: teacherLoading } = useGetTeacher(
    currentUser?.uid
  );
  const { data } = useGetPostsForParentOrTeacher(currentUser?.uid);

  const post = teacher?.posts.find((post) => post.id === postId);
  const postforParent = data
    ?.flatMap((teacher) => teacher.posts) // 1 massive array that i can directly iterate over
    .find((post) => post.id === postId);

  const teacherNames = data?.map(
    (teacher) => `${teacher.contact.firstName} ${teacher.contact.lastName}`
  );

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
    return <AccessDenied />;
  }

  const isLoading = teacherLoading || loading;

  const handleUpdatePost = async (data: Post) => {
    try {
      setLoading(true);

      //only a teacher can create a post
      if (!teacher) {
        throw new Error("You do not have permission to create a post.");
      }

      await updateAPost(data, teacher._id);
    } catch (error: any) {
      if (error instanceof FirebaseError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(error.message);
      }
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    //only a teacher can delete a post
    if (!teacher) {
      throw new Error("You do not have permission to delete a post.");
    }

    try {
      setLoading(true);
      // send the postId you want to delete, and the teacher who has authored the post
      await deleteAPost(postId, teacher._id);

      //navigate to posts & replace the url history as this id path no longer exists.
      navigate("/posts", {
        replace: true,
      });
    } catch (error: any) {
      if (error instanceof FirebaseError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(error.message);
      }
    }
  };

  const handleNavigate = () => {
    // on send go back to list of posts
    navigate(-1);
  };
  return (
    <>
      {isLoading && <p>loading</p>}
      {errorMessage && <p className={styles.ErrorMessage}>{errorMessage}</p>}
      {post && hasAdminAccess && (
        <>
          <CreatePostForm
            onCreatePost={handleUpdatePost}
            loading={teacherLoading}
            initialValues={post}
            onClick={handleNavigate}
          />
          <Button ariaLabel="delete post" onClick={handleDelete}>
            delete
          </Button>
        </>
      )}
      {/* no need for admin to see post */}
      {!hasAdminAccess && isParent && postforParent && (
        <RenderPost
          key={postforParent.id}
          post={postforParent}
          teacherName={String(teacherNames)}
        />
      )}
    </>
  );
};

export default EditPost;
