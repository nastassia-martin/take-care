import { ImgHTMLAttributes } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

type ImageAttribute = ImgHTMLAttributes<HTMLImageElement>;

interface ImageProps {
  src: string;
  className?: ImageAttribute["className"];
}
const ProfileImage = ({ src, className }: ImageProps): React.ReactElement => {
  return (
    <img className={classNames(styles.ProfileImage, className)} src={src} />
  );
};

export default ProfileImage;
