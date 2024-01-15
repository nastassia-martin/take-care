type PostLike = {
  postId: string;
  userId: string;
};

const Like: React.FC<PostLike> = ({ postId, userId }) => {
  const toggleLike = async () => {
    console.log(postId, userId);
  };
  return <button onClick={toggleLike}>like</button>;
};

export default Like;
