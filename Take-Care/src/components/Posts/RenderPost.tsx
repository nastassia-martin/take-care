import { firebaseTimestampToString } from "../../helpers";
import styles from "./styles.module.scss";
import { Post } from "../../types/Posts.types";
import ProfileImage from "../Profile/ProfileImage";

interface IPostProps {
  post: Post;
}
const RenderPost: React.FC<IPostProps> = ({ post }) => {
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
            </div>
            {post.photo && (
              <div className={styles.PhotoWrapper}>
                <ProfileImage src={post.photo} className={styles.PostImage} />
              </div>
            )}

            <p>{post.content}</p>
          </div>
        </>
      )}
    </section>
  );
};
export default RenderPost;
