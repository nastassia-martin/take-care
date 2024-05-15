import Modal from "react-bootstrap/Modal";
import Button from "../Button/Button";
import styles from "./styles.module.scss";

interface IProps {
  onCancel: () => void;
  onConfirm: () => void;
  show: boolean;
}

const LogoutModal: React.FC<IProps> = ({ onCancel, onConfirm, show }) => {
  return (
    <Modal show={show} onHide={onCancel} className={styles.Modal}>
      <Modal.Header closeButton>
        <Modal.Title className={styles.Header}>
          Do you want to log out?
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="d-flex justify-content-around">
        <Button ariaLabel="cancel logout" onClick={onCancel}>
          Cancel
        </Button>
        <Button ariaLabel="confirm logout" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default LogoutModal;
