import ProfileDetails from "../../components/Profile/ProfileDetails";
import styles from "./styles.module.scss";
import Button from "../../components/Button/Button";
import useAuth from "../../hooks/useAuth";
import AccessDenied from "../../components/AccessDenied/AccessDenied";
import useGetTeacher from "../../hooks/useGetTeacher";
import useGetChildrenForAdmin from "../../hooks/useGetChildrenForAdmin";

import { Link, useParams } from "react-router-dom";
import useGetParent from "../../hooks/useGetParent";
import { BounceLoader } from "react-spinners";

const TeacherProfilePage = () => {
  const { currentUser } = useAuth();
  const { id } = useParams();
  const teacherId = id as string;

  if (!currentUser) {
    return <div>We could not find a profile.</div>;
  }
  const { data: teacher, loading: teacherLoading } = useGetTeacher(teacherId);
  const { data: children, loading: childrenLoading } = useGetChildrenForAdmin();
  const { data: parent, loading: parentLoading } = useGetParent(
    currentUser.uid
  );
  const isLoading = teacherLoading || childrenLoading || parentLoading;

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

  if (isLoading) {
    return <BounceLoader color={"#8989ff"} size={60} />;
  }

  const isParentViewingTeacherProfile =
    teacher && parent && teacher.parents.includes(parent._id);

  // If teacher does not exist, limit access
  const isTeacher = teacher && teacher.role === "Admin";

  // viewer is neither parent nor teacher
  if (!isParentViewingTeacherProfile && !isTeacher) {
    return <AccessDenied />;
  }

  return (
    <div className={styles.PageWrapper}>
      {isParentViewingTeacherProfile ?? isTeacher ? (
        <section className={styles.ProfileDetails}>
          <ProfileDetails
            className={styles.CardWrapper}
            image={teacher.contact.photoURL}
            firstName={teacher.contact.firstName}
            lastName={teacher.contact.lastName}
            alt={`image of ${teacher.contact.firstName}`}
          >
            {teacher.role === "Admin" && (
              <Link
                className={styles.Link}
                to={`/teachers/${teacher._id}/update`}
              >
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
                {teacher.contact.email}
              </span>
            </p>
          </div>
        </section>
      ) : (
        <AccessDenied />
      )}

      {/* Conditional rendering for child profile if there are children assigned to the teacher */}
      {teacher &&
        teacher.role === "Admin" &&
        teacher._id === currentUser.uid &&
        (children && children.length > 0 ? (
          <section className={styles.ChildProfileWrapper}>
            <h3>Child's profile - Quick View</h3>
            <div className={styles.ChildProfileContainer}>
              {children
                .filter(
                  (child) =>
                    child.keyTeacher && child.keyTeacher._id === teacher._id
                )
                .map((child) => (
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
                      alt={`image of ${child.contact.firstName}`}
                      children={goToProfile} // Ensure this prop is correctly named and used
                    />
                  </Link>
                ))}
            </div>
          </section>
        ) : (
          noChildrenFound
        ))}
    </div>
  );
};
export default TeacherProfilePage;
