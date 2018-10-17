import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

type Props = {
  show: boolean,
  confirm: () => void,
  abort: () => void,
  title: string,
  content: Element<any>
};

export default function Alert({ show, title, content, confirm, abort }: Props) {
  return (
    <Modal isOpen={show}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{content}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={confirm}>
          OK
        </Button>{" "}
        <Button color="secondary" onClick={abort}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
