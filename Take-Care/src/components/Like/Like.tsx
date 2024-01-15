import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as clearHeart } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";
import styles from "./style.module.scss";

/**
 * on hover show a mouse or hand or whatever
 */
type PostLike = {
  postId: string;
  userId: string;
  likes?: string[];
};

const Like: React.FC<PostLike> = ({ postId, userId, likes }) => {
  const { toggleLike } = useAuth();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // if there are no likes then isLiked remains false
    if (!likes) {
      return;
    }
    setIsLiked(likes.includes(userId));
  }, [likes, userId]);

  const handleLike = async () => {
    toggleLike(userId, postId);
    setIsLiked(!isLiked);
  };
  return (
    <div className={styles.IconWrapper}>
      <FontAwesomeIcon
        icon={isLiked ? faHeart : clearHeart}
        size="lg"
        onClick={handleLike}
        className={styles.Icon}
      />
    </div>
  );
};

export default Like;
