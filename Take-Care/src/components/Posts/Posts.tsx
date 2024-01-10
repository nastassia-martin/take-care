import { Posts } from "../../types/Posts.types";
import { firebaseTimestampToString } from "../../helpers";
import styles from "./styles.module.scss";

interface IPostProps {
  data: Posts | null;
  teacherName: string;
}
const RenderPosts: React.FC<IPostProps> = ({ data, teacherName }) => {
  return (
    <section className={styles.Section}>
      <h3 className={styles.MainHeader}>Recent posts</h3>
      {data &&
        data.length > 0 &&
        data.map((post) => (
          <div className={styles.PostWrapper} key={post.id}>
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
        ))}
    </section>
  );
};
export default RenderPosts;
