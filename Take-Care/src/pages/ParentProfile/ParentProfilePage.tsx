import { useParams } from "react-router-dom";
import useGetParent from "../../hooks/useGetParent";
import ProfileDetails from "../../components/Profile/ProfileDetails";
import styles from "./styles.module.scss";
import useGetChild from "../../hooks/useGetChild";
import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
const ParentProfilePage = () => {
  const {
    data: parent,
    loading: parentLoading,
    error: parentError,
  } = useGetParent("ncPhbA4HC3OLVHQP28L0xxypWCB2");
  const [childId, setChildId] = useState<string | null>(null);
  // Whenever the parent data changes, update the childId state.
  useEffect(() => {
    if (!parent) {
      return;
    }
    if (parent && parent.children.length > 0) {
      setChildId(parent.children[0]);
    } else {
      setChildId(null);
    }
  }, [parent]);

  const {
    data: child,
    loading: childLoading,
    error: childError,
  } = useGetChild(childId!);

  // Adjusted conditional rendering
  if (parentLoading || childLoading) {
    return <p>Loading...</p>;
  }

  if ((parentError && !parentLoading) || (childError && !childLoading)) {
    return <div>Error loading profiles</div>;
  }

  // Assuming parent should always exist, show error if not present after loading
  if (!parent) {
    return <div>Parent profile not found</div>;
  }
  const goToProfile = (
    <Button text="Go to profile" ariaLabel="go to profile" type="button" />
  );
  return (
    <div className={styles.PageWrapper}>
      {parent && parent.role === "User" && (
        <>
          <section className={styles.ProfileDetails}>
            <ProfileDetails
              className={styles.CardWrapper}
              src={parent.contact.photoURL}
              firstName={parent.contact.firstName}
              lastName={parent.contact.lastName}
            />
            <div className={styles.AddressWrapper}>
              <Button
                ariaLabel="Edit profile"
                text="Edit profile"
                type="button"
              />
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

          {/* Conditional rendering for child profile */}

          <section className={styles.ChildProfileWrapper}>
            <h3>Child's profile - Quick View</h3>

            {!child && !childError ? (
              <div>Child profile loading...</div>
            ) : (
              child && (
                <ProfileDetails
                  className={styles.CardWrapper}
                  src={child.contact.photoURL}
                  firstName={child.contact.firstName}
                  lastName={child.contact.lastName}
                  children={goToProfile}
                />
              )
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default ParentProfilePage;
