import React, { useRef, useState, useContext } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import {
  Modal,
  Button,
  FormControl,
  Input,
  WarningOutlineIcon,
} from "native-base";

type Props = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddUserModal({ modalVisible, setModalVisible }: Props) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const { addNewPerson } = useContext(ExpenseContext);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Add New Person</Modal.Header>
          <Modal.Body>
            <FormControl isInvalid={name.length === 0}>
              <FormControl.Label>Name</FormControl.Label>
              <Input
                ref={initialRef}
                autoFocus
                autoCapitalize="words"
                size="2xl"
                onChange={(e) => {
                  setName(e.nativeEvent.text);
                }}
              />
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                Name is required
              </FormControl.ErrorMessage>
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button
                isLoading={loading}
                isLoadingText="Adding"
                onPress={() => {
                  if (name.length === 0) {
                    return;
                  }
                  setLoading(true);
                  addNewPerson(name);
                  setLoading(false);
                  setModalVisible(false);
                }}
              >
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}

export default AddUserModal;
