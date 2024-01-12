import { firebaseTimestampToString } from "../../helpers";
import styles from "./styles.module.scss";
import { Post } from "../../types/Posts.types";

interface IPostProps {
  post: Post;
  teacherName: string;
}
const RenderPost: React.FC<IPostProps> = ({ post, teacherName }) => {
  return (
    <section className={styles.Section}>
      <h3 className={styles.MainHeader}>Recent posts</h3>

      {post && (
        <div className={styles.PostWrapper}>
          <h2 className={styles.Title}>{post.title}</h2>
          <div className={styles.DetailsWrapper}>
            <span>
              Posted by: <span className={styles.Name}>{teacherName}</span>
            </span>

            <span>
              Posted:{" "}
              {post.createdAt
                ? firebaseTimestampToString(post.createdAt)
                : "loading"}
            </span>
          </div>
          <p>{post.content}</p>
        </div>
      )}
    </section>
  );
};
export default RenderPost;
