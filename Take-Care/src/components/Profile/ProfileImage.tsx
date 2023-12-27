import styles from "./styles.module.scss";

interface ImageProps {
  src: string;
}
const ProfileImage = ({ src }: ImageProps): React.ReactElement => {
  return <img className={styles.ProfileImage} src={src} />;
};

export default ProfileImage;
