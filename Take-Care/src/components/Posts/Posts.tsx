import { Link } from "react-router-dom";
import { firebaseTimestampToString } from "../../helpers";
import { Posts } from "../../types/Posts.types";
import styles from "./styles.module.scss";
import ProfileImage from "../Profile/ProfileImage";

interface IPostProps {
  data: Posts | null;
}
const RenderPosts: React.FC<IPostProps> = ({ data }) => {
  return (
    <section className={styles.Section}>
      <h3 className={styles.MainHeader}>Recent posts</h3>
      <div className={styles.Container}>
        {data &&
          data.map((post) => (
            <div key={post._id}>
              <Link to={post._id} className={styles.Link}>
                <div className={styles.PostWrapper}>
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
                      <ProfileImage
                        src={post.photo}
                        className={styles.PostImage}
                      />
                    </div>
                  )}
                  <p>{post.content}</p>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </section>
  );
};
export default RenderPosts;
