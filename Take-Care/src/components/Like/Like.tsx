import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as clearHeart } from "@fortawesome/free-regular-svg-icons";
import { useEffect, useState } from "react";

type PostLike = {
  postId: string;
  userId: string;
  likes?: string[];
};

const Like: React.FC<PostLike> = ({ postId, userId, likes }) => {
  const { toggleLike } = useAuth();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // if there are no likes then isLikes remains false
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
    <FontAwesomeIcon
      icon={isLiked ? faHeart : clearHeart}
      onClick={handleLike}
    />
  );
};

export default Like;
