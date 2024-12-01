import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface DynamicModalProps {
  title?: string;
  size?:
    | "lg"
    | "sm"
    | "md"
    | "xl"
    | "2xl"
    | "4xl"
    | "xs"
    | "3xl"
    | "5xl"
    | "full";
  placement?:
    | "center"
    | "auto"
    | "top"
    | "top-center"
    | "bottom"
    | "bottom-center";
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  isOpen: boolean;
  backdrop?: "opaque" | "blur" | "transparent";
  children: React.ReactNode; // Accept children
}

const CustomModal: React.FC<DynamicModalProps> = ({
  title,
  placement = "top",
  size = "lg",
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isOpen,
  backdrop = "opaque",
  children, // Render the children
}) => {
  return (
    <Modal
      backdrop={backdrop}
      isOpen={isOpen}
      onClose={onCancel}
      placement={placement}
      size={size}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              {" "}
              <div className="blur-0 z-50">{children}</div>
            </ModalBody>
            <ModalFooter>
              {onCancel && (
                <Button color="danger" variant="light" onPress={onCancel}>
                  {cancelText}
                </Button>
              )}
              {onConfirm && (
                <Button color="primary" onPress={onConfirm}>
                  {confirmText}
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;
