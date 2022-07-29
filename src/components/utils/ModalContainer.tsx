import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalContentProps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type ModalContainerProps = ModalContentProps & {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  body: ReactNode;
  footer: ReactNode;
  showCloseBtn?: boolean;
  closeOnClickOnOverlay?: boolean;
};

const ModalContainer: React.FC<ModalContainerProps> = ({
  isOpen,
  onClose,
  header,
  body,
  footer,
  showCloseBtn = true,
  closeOnClickOnOverlay = true,
  ...props
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered={true}
      closeOnOverlayClick={closeOnClickOnOverlay}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent {...props}>
        <ModalHeader color='blue.600'>{header}</ModalHeader>
        {showCloseBtn && <ModalCloseButton />}
        <ModalBody>{body}</ModalBody>
        <ModalFooter>{footer}</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalContainer;
