import ProfileDetails from "../../components/Profile/ProfileDetails";
import styles from "../ParentProfile/styles.module.scss";
import Button from "../../components/Button/Button";
import useAuth from "../../hooks/useAuth";
import useGetParents from "../../hooks/useGetParents";
import AccessDenied from "../../components/AccessDenied/AccessDenied";
import useGetChild from "../../hooks/useGetChild";
import { Link, useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";

const ChildProfilePage = () => {
  const { id } = useParams();
  const childId = id as string;

  const { currentUser } = useAuth();

  if (!childId) {
    return <div>We could not find a profile.</div>;
  }

  const { data: child, loading: childLoading } = useGetChild(childId);
  const { data: parents, loading: parentsLoading } = useGetParents(childId); // get all parents who have the the child in their document
  const isLoading = childLoading || parentsLoading;

  if (!currentUser || !parents) {
    return;
  }

  // return first parent in parents array that returns true.
  const isParent = child?.parents.some(
    (parentId) => parentId === currentUser.uid
  );

  const isKeyTeacher = child?.keyTeacher?._id === currentUser.uid;

  const isAuthorised = isParent || (child?.keyTeacher && isKeyTeacher);

  if (isLoading) {
    return <BounceLoader color={"#8989ff"} size={10} />;
  }

  if (!isAuthorised) {
    // assert that email exists because user cannot log in without an email
    return <AccessDenied />;
  }

  const goToProfile = (
    <Button ariaLabel="go to profile" type="button">
      Go to profile
    </Button>
  );

  return (
    <div className={styles.PageWrapper}>
      {child && isAuthorised && (
        <section className={styles.ChildProfileDetails}>
          <ProfileDetails
            className={styles.CardWrapper}
            image={child.contact.photoURL}
            firstName={child.contact.firstName}
            lastName={child.contact.lastName}
            alt={`image of ${child.contact.firstName}`}
          >
            {isParent && (
              <Link to={`/children/${child._id}/update`}>
                <Button ariaLabel="Edit profile" type="button">
                  Edit profile
                </Button>
              </Link>
            )}
          </ProfileDetails>
        </section>
      )}
      {/* Conditional rendering for parents profile */}
      <section className={styles.ChildProfileWrapper}>
        <h3>Parents profile - Quick View</h3>
        <div className={styles.ChildProfileContainer}>
          {parents.map((parent) => (
            <Link
              className={styles.Link}
              to={`/parents/${parent._id}`}
              key={parent._id}
            >
              <ProfileDetails
                className={styles.CardWrapper}
                image={parent.contact.photoURL}
                firstName={parent.contact.firstName}
                lastName={parent.contact.lastName}
                children={goToProfile}
                alt={`image of ${parent.contact.firstName}`}
              />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ChildProfilePage;
