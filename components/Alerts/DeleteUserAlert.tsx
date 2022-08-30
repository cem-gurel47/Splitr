import React, { useRef, useContext, useState } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { Center, Button, AlertDialog } from "native-base";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  name: string;
};

const DeleteUserAlert = ({ isOpen, setIsOpen, id, name }: Props) => {
  const navigation = useNavigation();
  const onClose = () => setIsOpen(false);
  const { deletePerson } = useContext(ExpenseContext);
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
          <AlertDialog.Header>{`Delete ${name}?`}</AlertDialog.Header>
          <AlertDialog.Body>
            {`This will remove all data relating to ${name} and his/her expenses. This action cannot be reversed. Deleted data can not be recovered.`}
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
                  setLoading(true);
                  deletePerson(id);
                  setLoading(false);
                  Toast.show({
                    type: "success",
                    text1: `${name} is deleted!`,
                  });
                  navigation.navigate("Home");
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

export default DeleteUserAlert;
