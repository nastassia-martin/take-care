import styles from "./styles.module.scss";
import logo from "../../assets/images/TakeCare-logos_black.png";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import LogoutModal from "../Logout/Logout";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import Button from "../Button/Button";
import useGetTeacher from "../../hooks/useGetTeacher";
import useGetParent from "../../hooks/useGetParent";

const Navigation = () => {
  const navigate = useNavigate();
  const { logout, currentUser, userEmail, userPhotoUrl } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const isParentProfile = useGetParent(currentUser?.uid);
  const isTeacherProfile = useGetTeacher(currentUser?.uid);
  const onLogout = async () => {
    await logout();
    navigate("/");
    setShowLogoutModal(false);
  };

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const handleClick = () => {
    if (currentUser) {
      // Check if the current user is a parent and navigate to their profile
      if (isParentProfile?.data) {
        navigate(`/parents/${currentUser.uid}`);
      }
      // Else, if the current user is a teacher, navigate to their profile
      else if (isTeacherProfile?.data) {
        navigate(`/teachers/${currentUser.uid}`);
      }
    }
  };
  return (
    <Navbar expand="lg" collapseOnSelect className={styles.Nav}>
      <Container className={styles.NavWrapper}>
        <Navbar.Brand as={NavLink} to="/">
          <Image src={logo} alt="logo" className={styles.Logo} />
        </Navbar.Brand>
        {currentUser && (
          <>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className={styles.NavItems}>
                <Nav.Item>
                  {userPhotoUrl && (
                    <Image
                      src={userPhotoUrl}
                      height={40}
                      width={40}
                      title={userEmail ?? ""}
                      roundedCircle
                      className="img-square"
                    />
                  )}
                </Nav.Item>
                <Nav.Link className={styles.NavItem} onClick={handleClick}>
                  Profile
                </Nav.Link>

                <Nav.Link as={NavLink} to="/posts" className={styles.NavItem}>
                  Activity Feed
                </Nav.Link>
                {isTeacherProfile.data?._id === currentUser?.uid && (
                  <>
                    <Nav.Link
                      as={NavLink}
                      to="/children"
                      className={styles.NavItem}
                    >
                      Children
                    </Nav.Link>
                    <Nav.Link
                      as={NavLink}
                      to="/parents"
                      className={styles.NavItem}
                    >
                      Parents
                    </Nav.Link>
                  </>
                )}

                <Button
                  className={styles.NavButton}
                  ariaLabel="open logout modal"
                  onClick={openLogoutModal}
                >
                  Logout
                </Button>
              </Nav>
              <Nav className={styles.ButtonWrapper}></Nav>
            </Navbar.Collapse>
            <LogoutModal
              show={showLogoutModal}
              onCancel={() => setShowLogoutModal(false)}
              onConfirm={onLogout}
            />
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default Navigation;
