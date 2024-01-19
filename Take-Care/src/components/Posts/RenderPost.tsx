import { firebaseTimestampToString } from "../../helpers";
import styles from "./styles.module.scss";
import { Post } from "../../types/Posts.types";
import ProfileImage from "../Profile/ProfileImage";
import Like from "../Like/Like";
import classNames from "classnames";

interface IPostProps {
  post: Post;
  userId: string;
}

const RenderPost: React.FC<IPostProps> = ({ post, userId }) => {
  return (
    <section className={styles.Section}>
      {post && (
        <>
          <h3 className={styles.MainHeader}>{post.title}</h3>

          <div className={styles.SinglePostWrapper}>
            <h2 className={styles.Title}>{post.title}</h2>
            <div className={styles.DetailsWrapper}>
              <span>
                Posted by:{" "}
                <span className={styles.Name}>{post.authorName}</span>
              </span>

              <span>
                Posted:{" "}
                {post.createdAt
                  ? firebaseTimestampToString(post.createdAt)
                  : "loading"}
              </span>

              <span
                className={classNames(styles.PostType, {
                  [styles.isSocial]: post.typeOfPost === "social",
                  [styles.isMenu]: post.typeOfPost === "menu",
                })}
              >
                {post.typeOfPost}
              </span>
            </div>
            {post.photo && (
              <div className={styles.PhotoWrapper}>
                <ProfileImage
                  src={post.photo}
                  className={styles.PostImage}
                  alt={`image of ${post.title}`}
                />
              </div>
            )}

            <p>{post.content}</p>
            <div className={styles.LikesWrapper}>
              <Like postId={post._id} userId={userId} likes={post.likes} />
              {post.likes && post.likes.length > 0 && (
                <p>likes: {post.likes.length}</p>
              )}
            </div>
          </div>
        </>
      )}
    </section>
  );
};
export default RenderPost;
