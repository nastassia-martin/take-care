import ProfileDetails from "../../components/Profile/ProfileDetails";
import styles from "./styles.module.scss";
import Button from "../../components/Button/Button";
import useAuth from "../../hooks/useAuth";
import AccessDenied from "../../components/AccessDenied/AccessDenied";
import useGetTeacher from "../../hooks/useGetTeacher";
import useGetChildren from "../../hooks/useGetChildren";

import { Link } from "react-router-dom";

const TeacherProfilePage = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <div>We could not find a profile.</div>;
  }

  const { data: teacher } = useGetTeacher(currentUser.uid);
  const { data: children } = useGetChildren(currentUser.uid);

  const goToProfile = (
    <Button ariaLabel="go to profile" type="button">
      Go to profile
    </Button>
  );

  const noChildrenFound = (
    <main className={styles.AccessDenied}>
      <section className={styles.AccessDeniedDetails}>
        <p>There are no children assigned to you yet.</p>
        <p>To add a child go to the Children list</p>
        <Link to="/children">
          <Button ariaLabel="Go to children list">Go to list</Button>
        </Link>
      </section>
    </main>
  );

  // If teacher does not exist, limit access
  return teacher && !teacher.role ? (
    <AccessDenied text={teacher.contact.email} />
  ) : (
    <div className={styles.PageWrapper}>
      {teacher && teacher.role === "Admin" && (
        <section className={styles.ProfileDetails}>
          <ProfileDetails
            className={styles.CardWrapper}
            image={teacher.contact.photoURL}
            firstName={teacher.contact.firstName}
            lastName={teacher.contact.lastName}
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
                {teacher.contact.email}
              </span>
            </p>
            <p className={styles.AddressDetails}>
              <span className={styles.AddressField}>Address:</span>
              <span className={styles.AddressValue}>123 la la lane</span>
            </p>
          </div>
        </section>
      )}
      {/* Conditional rendering for child profile if there are children assigned to teacher */}
      {teacher && teacher.role === "Admin" ? (
        children && children.length > 0 ? (
          <section className={styles.ChildProfileWrapper}>
            <h3>Child's profile - Quick View</h3>
            {children.map((child) => (
              <Link to={`/children/${child._id}`} key={child._id}>
                <ProfileDetails
                  className={styles.CardWrapper}
                  image={child.contact.photoURL}
                  firstName={child.contact.firstName}
                  lastName={child.contact.lastName}
                  children={goToProfile} // Ensure this prop is correctly named and used
                />
              </Link>
            ))}
          </section>
        ) : (
          noChildrenFound
        )
      ) : null}
    </div>
  );
};
export default TeacherProfilePage;
