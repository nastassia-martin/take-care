/**
 * Generic Profile Card component.
 */
import classNames from "classnames";
import ProfileImage from "./ProfileImage";
import styles from "./styles.module.scss";
interface DetailsProps {
  firstName: string;
  lastName: string;
  image?: string;
  children?: React.ReactNode;
  className?: string;
  alt: string;
}
const ProfileDetails = ({
  firstName,
  lastName,
  image,
  children,
  className,
  alt,
}: DetailsProps): React.ReactElement => {
  return (
    <div className={classNames(styles.ProfileWrapper, className)}>
      <>
        {image && <ProfileImage src={image} alt={alt} />}
        <div className={styles.NameWrapper}>
          <span>{firstName}</span>&nbsp;
          <span>{lastName}</span>
        </div>
        {children}
      </>
    </div>
  );
};
export default ProfileDetails;
