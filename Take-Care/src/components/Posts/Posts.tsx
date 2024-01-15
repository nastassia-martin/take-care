import { Link } from "react-router-dom";
import { firebaseTimestampToString } from "../../helpers";
import { Posts } from "../../types/Posts.types";
import styles from "./styles.module.scss";
import ProfileImage from "../Profile/ProfileImage";
import Like from "../Like/Like";

interface IPostProps {
  data: Posts | null;
  userId: string;
}
const RenderPosts: React.FC<IPostProps> = ({ data, userId }) => {
  return (
    <section className={styles.Section}>
      <h3 className={styles.MainHeader}>Recent posts</h3>
      <div className={styles.Container}>
        {data &&
          data.map((post) => (
            <div key={post._id}>
              <div className={styles.PostWrapper}>
                <Link to={post._id} className={styles.Link}>
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
                        alt={`image of ${post.title}`}
                        src={post.photo}
                        className={styles.PostImage}
                      />
                    </div>
                  )}
                  <p>{post.content}</p>
                </Link>

                <div className={styles.LikesWrapper}>
                  <Like postId={post._id} userId={userId} likes={post.likes} />
                  {post.likes && post.likes.length > 0 && (
                    <p>likes: {post.likes.length}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};
export default RenderPosts;
