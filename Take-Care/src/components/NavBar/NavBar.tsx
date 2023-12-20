import styles from "./styles.module.scss";
import logo from "../../assets/images/TakeCare-logos_black.png";
import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";

const Navigation = () => {
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
            <Nav.Link as={NavLink} to="/" className={styles.NavItem}>
              Profile
            </Nav.Link>
            <Nav.Link as={NavLink} to="/" className={styles.NavItem}>
              Menu
            </Nav.Link>
            <Nav.Link as={NavLink} to="/" className={styles.NavItem}>
              Activity Feed
            </Nav.Link>
            <Nav.Link as={NavLink} to="/" className={styles.NavItem}>
              FAQ
            </Nav.Link>
            {/* user is NOT signed in? only show logo */}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Navigation;
