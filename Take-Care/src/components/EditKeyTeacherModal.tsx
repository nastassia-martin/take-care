import Modal from "react-bootstrap/Modal";
import { ChildProfile } from "../types/CreateProfile.types";

interface IModalProps {
  children: React.ReactNode;
  onClose: () => void;
  isOpen: boolean;
  data: ChildProfile;
}

const EditKeyTeacherModal: React.FC<IModalProps> = ({
  children,
  onClose,
  isOpen,
  data,
}) => {
  return (
    <Modal show={isOpen} onHide={onClose} aria-label="Edit key teacher">
      <Modal.Header closeButton>
        <Modal.Title>
          {`Edit key teacher for ${data.contact.firstName} ${data.contact.lastName}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default EditKeyTeacherModal;
