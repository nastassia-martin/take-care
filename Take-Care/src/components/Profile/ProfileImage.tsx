import { ImgHTMLAttributes } from "react";
import styles from "./styles.module.scss";
import classNames from "classnames";

type ImageAttribute = ImgHTMLAttributes<HTMLImageElement>;

interface ImageProps {
  alt: ImageAttribute["alt"];
  src: string;
  className?: ImageAttribute["className"];
}
const ProfileImage = ({
  src,
  className,
  alt,
}: ImageProps): React.ReactElement => {
  return (
    <img
      className={classNames(styles.ProfileImage, className)}
      src={src}
      alt={alt}
    />
  );
};

export default ProfileImage;
