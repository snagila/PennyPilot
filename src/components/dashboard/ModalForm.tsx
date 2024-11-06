import { FC, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { IoIosAddCircle } from "react-icons/io";
import TransactionForm from "./TransactionForm";

const ModalForm: FC = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="text-end p-2 d-block d-md-none pop " onClick={handleShow}>
        <IoIosAddCircle
          size={"55px"}
          style={{ color: "#936ee3" }}
          role="button"
        />
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="dark-background"
      >
        <div className="dark-background p-2">
          <Modal.Header closeButton>Add Transaction</Modal.Header>

          <TransactionForm loading={false} />
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </>
  );
};

export default ModalForm;
