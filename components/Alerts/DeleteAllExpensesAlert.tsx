import React, { useRef, useContext, useState } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { Center, Button, AlertDialog } from "native-base";
import Toast from "react-native-toast-message";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteAllExpensesAlert = ({ isOpen, setIsOpen }: Props) => {
  const { updatePerson, persons, getExpenses } = useContext(ExpenseContext);
  const onClose = () => setIsOpen(false);
  const [loading, setLoading] = useState(false);

  const deleteEveryPersonsExpenses = () => {
    setLoading(true);
    persons.forEach((person) => {
      updatePerson(person.id, person.name, []);
    });
    getExpenses();
    setLoading(false);
    Toast.show({
      type: "success",
      text1: "All expenses are deleted!",
    });
    onClose();
  };

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
          <AlertDialog.Header>Delete All Expenses</AlertDialog.Header>
          <AlertDialog.Body>
            This will remove all data relating to expenses but user profiles
            will be kept safe. This action cannot be reversed. Deleted data can
            not be recovered.
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
                colorScheme="danger"
                onPress={deleteEveryPersonsExpenses}
                isLoading={loading}
                isLoadingText="Deleting"
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

export default DeleteAllExpensesAlert;
