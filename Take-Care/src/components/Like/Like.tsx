import useAuth from "../../hooks/useAuth";

type PostLike = {
  postId: string;
  userId: string;
};

const Like: React.FC<PostLike> = ({ postId, userId }) => {
  const { toggleLike } = useAuth();

  const handleLike = async () => {
    toggleLike(userId, postId);
  };
  return <button onClick={handleLike}>like</button>;
};

export default Like;
