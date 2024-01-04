import ProfileDetails from "../../components/Profile/ProfileDetails";
import styles from "./styles.module.scss";
import { useEffect } from "react";
import Button from "../../components/Button/Button";
import useAuth from "../../hooks/useAuth";
import useGetParent from "../../hooks/useGetParent";
import AccessDenied from "../../components/AccessDenied/AccessDenied";
import useGetChildren from "../../hooks/useGetChildren";
import { Link } from "react-router-dom";

const ParentProfilePage = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <div>Internal server error.</div>;
  }
  const { data: parent } = useGetParent(currentUser.uid);

  // call on the children collection as parent can have more than one child
  const { data: children } = useGetChildren(currentUser.uid);

  useEffect(() => {
    if (!parent) {
      return;
    }
    if (!children) {
      return;
    }
  }, [parent, children]);

  const goToProfile = (
    <Button ariaLabel="go to profile" type="button">
      Go to profile
    </Button>
  );
  // If parent does not exist, limit access
  return parent && parent.role === "Not approved" ? (
    <AccessDenied text={parent.contact.email} />
  ) : (
    <div className={styles.PageWrapper}>
      {parent && parent.role === "User" && (
        <section className={styles.ProfileDetails}>
          <ProfileDetails
            className={styles.CardWrapper}
            image={parent.contact.photoURL}
            firstName={parent.contact.firstName}
            lastName={parent.contact.lastName}
          />
          <div className={styles.AddressWrapper}>
            <Button ariaLabel="Edit profile" type="button">
              Edit profile
            </Button>
            <p className={styles.AddressDetails}>
              <span className={styles.AddressField}>Telephone: </span>
              <span className={styles.AddressValue}>012345678</span>
            </p>
            <p className={styles.AddressDetails}>
              <span className={styles.AddressField}>Email: </span>
              <span className={styles.AddressValue}>
                {parent.contact.email}
              </span>
            </p>
            <p className={styles.AddressDetails}>
              <span className={styles.AddressField}>Address:</span>
              <span className={styles.AddressValue}>123 la la lane</span>
            </p>
          </div>
        </section>
      )}
      {/* Conditional rendering for child profile */}
      {parent && parent.role === "User" && (
        <section className={styles.ChildProfileWrapper}>
          <h3>Child's profile - Quick View</h3>
          {children &&
            children.map((child) => (
              <Link to={`/children/${child._id}`} key={child._id}>
                <ProfileDetails
                  className={styles.CardWrapper}
                  image={child.contact.photoURL}
                  firstName={child.contact.firstName}
                  lastName={child.contact.lastName}
                  children={goToProfile}
                />
              </Link>
            ))}
        </section>
      )}
    </div>
  );
};

export default ParentProfilePage;
