import ProfileDetails from "../../components/Profile/ProfileDetails";
import styles from "../ParentProfile/styles.module.scss";
import Button from "../../components/Button/Button";
import useAuth from "../../hooks/useAuth";
import useGetParents from "../../hooks/useGetParents";
import AccessDenied from "../../components/AccessDenied/AccessDenied";
import useGetChild from "../../hooks/useGetChild";
import { Link, useParams } from "react-router-dom";

const ChildProfilePage = () => {
  const { id } = useParams();
  const childId = id as string;

  const { currentUser } = useAuth();

  if (!childId) {
    return <div>We could not find a profile.</div>;
  }

  const { data: child } = useGetChild(childId);
  const { data: parents } = useGetParents(childId); // get all parents who have the the child in their document

  if (!currentUser || !parents) {
    return;
  }

  // return first parent in parents array that returns true.
  const isParent = child?.parents.some(
    (parentId) => parentId === currentUser.uid
  );

  const isKeyTeacher = child?.keyTeacher?._id === currentUser.uid;

  const isAuthorised = isParent || (child?.keyTeacher && isKeyTeacher);

  if (!isAuthorised) {
    // assert that email exists because user cannot log in without an email
    return <AccessDenied text={currentUser.email!} />;
  }

  const goToProfile = (
    <Button ariaLabel="go to profile" type="button">
      Go to profile
    </Button>
  );

  return (
    <div className={styles.PageWrapper}>
      {child && isAuthorised && (
        <section className={styles.ProfileDetails}>
          <ProfileDetails
            className={styles.CardWrapper}
            image={child.contact.photoURL}
            firstName={child.contact.firstName}
            lastName={child.contact.lastName}
          />
        </section>
      )}
      {/* Conditional rendering for parents profile */}
      <section>
        <h3>Parents profile - Quick View</h3>
        {parents.map((parent) => (
          <Link to={`/parents/${parent._id}`} key={parent._id}>
            <ProfileDetails
              className={styles.CardWrapper}
              image={parent.contact.photoURL}
              firstName={parent.contact.firstName}
              lastName={parent.contact.lastName}
              children={goToProfile}
            />
          </Link>
        ))}
      </section>
    </div>
  );
};

export default ChildProfilePage;
