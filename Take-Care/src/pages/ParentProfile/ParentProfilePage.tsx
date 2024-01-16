import ProfileDetails from "../../components/Profile/ProfileDetails";
import styles from "./styles.module.scss";
import Button from "../../components/Button/Button";
import useAuth from "../../hooks/useAuth";
import useGetParent from "../../hooks/useGetParent";
import AccessDenied from "../../components/AccessDenied/AccessDenied";
import useGetChildren from "../../hooks/useGetChildren";
import { Link, useParams } from "react-router-dom";
import useGetTeacher from "../../hooks/useGetTeacher";

const ParentProfilePage = () => {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const parentId = id as string;

  if (!currentUser) {
    return <div>Internal server error.</div>;
  }
  const { data: parent, loading: parentLoading } = useGetParent(parentId);
  // call on the children collection as parent can have more than one child
  const { data: children, loading: childrenLoading } = useGetChildren(parentId);
  const { data: teacher, loading: teacherLoading } = useGetTeacher(
    currentUser.uid
  );

  const isLoading = teacherLoading || childrenLoading || parentLoading;

  const isParentViewingOwnProfile = currentUser.uid === parentId;
  // const isCoParentViewingProfile = currentUser.uid === parent.coParentId // coParent in parent profile can view
  const isTeacher = teacher && teacher.role === "Admin";

  if (isLoading) {
    return <p>Loading...</p>;
  }

  //parent not approved
  if (parent && parent.role === "Not approved" && isTeacher) {
    return <AccessDenied customMessage="Waiting for approval" />;
  }

  // viewer is neither parent nor teacher
  if (!isParentViewingOwnProfile && !isTeacher) {
    return <AccessDenied />;
  }

  // parent is approved
  if (parent && parent.role === "Not approved") {
    return <AccessDenied email={parent.contact.email} />;
  }

  const goToProfile = (
    <Button ariaLabel="go to profile" type="button">
      Go to profile
    </Button>
  );

  // If parent has not been approved, limit access
  return (
    <div className={styles.PageWrapper}>
      {parent && parent.role === "User" && (
        <section className={styles.ProfileDetails}>
          <ProfileDetails
            className={styles.CardWrapper}
            image={parent.contact.photoURL}
            firstName={parent.contact.firstName}
            lastName={parent.contact.lastName}
            alt={`image of ${parent.contact.firstName}`}
          >
            {isParentViewingOwnProfile && (
              <Link to={`/parents/${parent._id}/update`}>
                <Button ariaLabel="Edit profile" type="button">
                  Edit profile
                </Button>
              </Link>
            )}
          </ProfileDetails>
          <div className={styles.AddressWrapper}>
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
              <Link
                className={styles.Link}
                to={`/children/${child._id}`}
                key={child._id}
              >
                <ProfileDetails
                  className={styles.CardWrapper}
                  image={child.contact.photoURL}
                  firstName={child.contact.firstName}
                  lastName={child.contact.lastName}
                  children={goToProfile}
                  alt={`image of ${child.contact.firstName}`}
                />
              </Link>
            ))}
        </section>
      )}
    </div>
  );
};

export default ParentProfilePage;
