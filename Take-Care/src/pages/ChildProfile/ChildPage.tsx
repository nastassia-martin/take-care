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
  const { currentUser } = useAuth();
  const childId = id;

  if (!childId) {
    return <div>We could not find a profile.</div>;
  }

  const { data: child } = useGetChild(childId);
  const { data: parents } = useGetParents(childId); // get all parents who have the the child in their document

  if (!currentUser || !parents) {
    return;
  }
  const authorisedId = child?.parents.find(
    (parentId) => parentId === currentUser.uid
  );
  // add the following to the authorisedId logic check when the key teacher id is added
  // ||
  // child?.keyTeacher === currentUser.uid;

  if (currentUser.uid !== authorisedId) {
    // assert that email exists becuase user cannot log in without an email
    return <AccessDenied text={currentUser.email!} />;
  }

  const goToProfile = (
    <Button ariaLabel="go to profile" type="button">
      Go to profile
    </Button>
  );

  return (
    <div className={styles.PageWrapper}>
      {child && authorisedId && (
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
