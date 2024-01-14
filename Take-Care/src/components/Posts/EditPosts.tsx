import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useGetTeacher from "../../hooks/useGetTeacher";
import CreatePostForm from "../Forms/CreatePostForm";
import { NewPostWithPhotoFile } from "../../types/Posts.types";
import { useEffect, useState } from "react";
import { FirebaseError } from "firebase/app";
import AccessDenied from "../AccessDenied/AccessDenied";
import RenderPost from "./RenderPost";
import styles from "./styles.module.scss";
import Button from "../Button/Button";
import useGetPost from "../../hooks/useGetPost";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../services/firebase";
import { v4 as uuidv4 } from "uuid";
import { uploadPhotoAndGetURL } from "../../helpers";

const EditPost = () => {
  const [hasAdminAccess, setHasAdminAccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isParent, setIsParent] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser, updateAPost, deleteAPost, deleteAPhoto } = useAuth();
  const postId = id as string;

  const { data: teacher, loading: teacherLoading } = useGetTeacher(
    currentUser?.uid
  );
  const { data: post, loading: postLoading } = useGetPost(postId);

  useEffect(() => {
    // When teacher data is fetched, check if the role is 'admin'
    if (teacher) {
      teacher?.role === "Admin"
        ? setHasAdminAccess(true)
        : setHasAdminAccess(false);
    }

    //ensure current user should have access to this page
    if (post && currentUser) {
      post.parents.includes(currentUser.uid)
        ? setIsParent(true)
        : setIsParent(false);
    }
  }, [teacher, post]);
  if (!currentUser) {
    return <AccessDenied />;
  }

  const isLoading = teacherLoading || loading || postLoading;

  const handleUpdatePost = async (data: NewPostWithPhotoFile) => {
    try {
      setLoading(true);

      //only a teacher can create a post
      if (!teacher) {
        throw new Error("You do not have permission to create a post.");
      }
      let newPhotoUrl = ""; // workaround to capture photo everytime.
      let isPhotoUpdated = false;

      if (data.photo && data.photo.length) {
        newPhotoUrl = await uploadPhotoAndGetURL(data.photo[0], teacher._id);
        isPhotoUpdated = true;
      }

      const { photo, ...restFormData } = data;
      const postData = {
        ...restFormData,
        photo: isPhotoUpdated ? newPhotoUrl : post?.photo,
      };
      const authorName = `${teacher.contact.firstName} ${teacher.contact.lastName} `;

      if (isPhotoUpdated && post?.photo) {
        await deleteAPhoto(post.photo);
      }

      await updateAPost(postData, postId);
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

  if (!post) {
    return;
  }
  const { title, content } = post;

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
            initialValues={{ title, content }}
            onClick={handleNavigate}
            uploadProgress={uploadProgress}
          />
          <Button ariaLabel="delete post" onClick={handleDelete}>
            delete
          </Button>
        </>
      )}
      {/* no need for admin to see post */}
      {!hasAdminAccess && isParent && post && (
        <RenderPost key={post?._id} post={post} />
      )}
    </>
  );
};

export default EditPost;
