import styles from "./styles.module.scss";
import logo from "../../assets/images/TakeCare-logos_black.png";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
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
  const { logout, currentUser } = useAuth();
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
    <Navbar expand="sm">
      <div className={styles.NavWrapper}>
        <Navbar.Brand>
          <Image src={logo} alt="logo" className={styles.Logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={styles.NavItems}>
            {/* user is signed in? show the profile, menu, etc */}
            <Nav.Link className={styles.NavItem} onClick={handleClick}>
              Profile
            </Nav.Link>
            <Nav.Link as={NavLink} to="/" className={styles.NavItem}>
              Menu
            </Nav.Link>
            <Nav.Link as={NavLink} to="/posts" className={styles.NavItem}>
              Activity Feed
            </Nav.Link>
            <Nav.Link as={NavLink} to="/" className={styles.NavItem}>
              FAQ
            </Nav.Link>
            {/* user is NOT signed in? only show logo */}
          </Nav>
          {currentUser && (
            <Button
              className={styles.NavButton}
              ariaLabel="open logout modal"
              onClick={openLogoutModal}
            >
              Logout
            </Button>
          )}
        </Navbar.Collapse>
        <LogoutModal
          show={showLogoutModal}
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={onLogout}
        />
      </div>
    </Navbar>
  );
};

export default Navigation;
