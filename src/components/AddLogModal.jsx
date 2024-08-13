import { useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

export const AddLogModal = ({ isOpen, toggleModal, onSave }) => {
  const [date, setDate] = useState("");

  const handleToggle = () => {
    setDate("");
    toggleModal();
  };

  const handleSave = () => {
    const selectedDate = date;
    onSave(selectedDate);
    handleToggle();
  };

  return (
    <Modal isOpen={isOpen} toggle={handleToggle} fade={false} centered={true}>
      <ModalHeader toggle={handleToggle}>Tambah Data</ModalHeader>
      <ModalBody>
        <Input
          name="date"
          value={date}
          type="date"
          onChange={(e) => setDate(e.target.value)}
        />
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={handleSave}>
          Simpan
        </Button>
        <Button color="secondary" onClick={handleToggle}>
          Kembali
        </Button>
      </ModalFooter>
    </Modal>
  );
};
