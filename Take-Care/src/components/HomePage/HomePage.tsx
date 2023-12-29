import styles from "./styles.module.scss";
import Image from "react-bootstrap/Image";
import HomePageImage from "../../assets/images/HomePage.png";
import Button from "../Button/Button";
import ProfileDetails from "../Profile/ProfileDetails";
import useGetChildren from "../../hooks/useGetChildren";
import ParentProfilePage from "../../pages/ParentProfile/ParentProfilePage";
import { Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth } from "../../services/firebase";
import { signInWithEmailLink } from "firebase/auth";
import useGetParents from "../../hooks/useGetParents";
import { useState } from "react";
const HomePage = () => {
  const [email, setEmail] = useState("");
  const { data: parents, loading } = useGetParents();

  // const email = "nastassia.martin@googlemail.com";
  // const user = useGetParents(email);
  // const profile = user.data?.find((parent) => parent.contact.email === email);
  // console.log(profile);
  // const userEmail = profile?._id;
  // console.log(userEmail);

  const {
    handleSubmit,
    register,
    formState: { isDirty, isValid },
  } = useForm();

  const onLogIn = async (data) => {
    try {
      console.log("email", data.email);
      // Set email state right when you get the email from the form
      setEmail(data.email);

      // Ensure that the parents data is loaded
      if (loading) {
        console.log("Still loading parent data...");
        return; // Maybe handle this more gracefully in a real app
      }

      // if (error) {
      //   console.error("Error loading parents:", error);
      //   return; // Handle this error appropriately
      // }

      // Find the parent and proceed with authentication
      const parentExists = parents?.find(
        (parent) => parent.contact.email === data.email
      );
      console.log(parentExists);

      if (parentExists) {
        await signInWithEmailLink(auth, data.email, window.location.href);
        console.log(auth.currentUser);
      } else {
        console.log("Parent not found or not authorized.");
        // Handle the case where no parent is found for the email
      }
    } catch (error) {
      console.error("Failed to log in:", error);
    }
  };
  return (
    <>
      <main className={styles.MainWrapper}>
        <div className={styles.Tagline}>
          <h4>Tagline Lorem, vero sint omnis alias ut ratione hic fugit.</h4>
          <div className={styles.ButtonWrapper}>
            <Button text="Log in" ariaLabel="Log in" type="button" />
            <Button text="Sign up" ariaLabel="Sign up" type="button" />
          </div>
        </div>
        <Image src={HomePageImage} fluid className={styles.Image} />
      </main>
      <div>
        {/* {data?.map((d) => (
          <>
            <ProfileDetails
              key={d._id}
              src={d.contact.photoURL}
              firstName={d.contact.firstName}
              lastName={d.contact.lastName}
            />
          </>
        ))} */}
        <Form onSubmit={handleSubmit(onLogIn)}>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="example@example.com"
              type="email"
              {...register("email")}
            />
          </Form.Group>
          <Button
            text="Create new account"
            ariaLabel="Create new account for child"
            type="submit"
            disabled={!isDirty || !isValid}
          />
        </Form>
      </div>
    </>
  );
};
export default HomePage;
