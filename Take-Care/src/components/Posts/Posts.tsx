import { firebaseTimestampToString } from "../../helpers";
import { TeacherProfile } from "../../types/Profile.types";
import styles from "./styles.module.scss";

interface IPostProps {
  data: TeacherProfile[] | null;
  teacherName: string;
}
const RenderPosts: React.FC<IPostProps> = ({ data, teacherName }) => {
  return (
    <section className={styles.Section}>
      <h3 className={styles.MainHeader}>Recent posts</h3>
      {data &&
        data.map((teacher) =>
          teacher.posts.map((post) => (
            <div
              className={styles.PostWrapper}
              key={`${teacher._id}-${post.id}`}
            >
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
          ))
        )}
    </section>
  );
};
export default RenderPosts;
