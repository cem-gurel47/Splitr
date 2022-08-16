import React, { useRef, useContext, useState } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { Center, Button, AlertDialog } from "native-base";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteAllUsersAlert = ({ isOpen, setIsOpen }: Props) => {
  const onClose = () => setIsOpen(false);
  const { deleteEveryPerson } = useContext(ExpenseContext);
  const [loading, setLoading] = useState(false);

  const cancelRef = useRef(null);
  return (
    <Center>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Delete All Users</AlertDialog.Header>
          <AlertDialog.Body>
            This will remove all data relating to users and their expenses. This
            action cannot be reversed. Deleted data can not be recovered.
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="unstyled"
                colorScheme="coolGray"
                onPress={onClose}
                ref={cancelRef}
              >
                Cancel
              </Button>
              <Button
                isLoading={loading}
                isLoadingText="Deleting"
                colorScheme="danger"
                onPress={() => {
                  deleteEveryPerson();
                  onClose();
                }}
              >
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default DeleteAllUsersAlert;
