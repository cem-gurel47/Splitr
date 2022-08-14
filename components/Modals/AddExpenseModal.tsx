import React, { useRef } from "react";
import {
  Modal,
  Button,
  FormControl,
  InputGroup,
  Input,
  Select,
  InputRightAddon,
} from "native-base";

type Props = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

function AddExpenseModal({ modalVisible, setModalVisible }: Props) {
  const initialRef = useRef(null);
  const finalRef = useRef(null);
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
          <Modal.Header>Add New Expense</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Person</FormControl.Label>
              <Select size="xl">
                <Select.Item label="John Doe" value="John Doe" />
                <Select.Item label="Jane Doe" value="Jane Doe" />
              </Select>
            </FormControl>

            <FormControl>
              <FormControl.Label>Description</FormControl.Label>
              <Input size="xl" />
            </FormControl>
            <FormControl>
              <FormControl.Label>Amount</FormControl.Label>
              <InputGroup
                w={{
                  base: "100%",
                  md: "100%",
                }}
              >
                <Input
                  size="xl"
                  type="number"
                  keyboardType="numeric"
                  w={{
                    base: "82%",
                    md: "100%",
                  }}
                />
                <InputRightAddon children={"USD"} />
              </InputGroup>
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
                onPress={() => {
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

export default AddExpenseModal;
