/**
 * Generic Profile Card component.
 */
import classNames from "classnames";
import ProfileImage from "./ProfileImage";
import styles from "./styles.module.scss";
interface DetailsProps {
  firstName: string;
  lastName: string;
  src: string;
  children?: React.ReactNode;
  className?: string;
}
const ProfileDetails = ({
  firstName,
  lastName,
  src,
  children,
  className,
}: DetailsProps): React.ReactElement => {
  return (
    <div className={classNames(styles.ProfileWrapper, className)}>
      <>
        <ProfileImage src={src} />
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
