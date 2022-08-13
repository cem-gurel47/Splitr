import React, { useState, useRef } from "react";
import { Center, Button, AlertDialog } from "native-base";

const Example = ({ isOpen, setIsOpen }) => {
  const onClose = () => setIsOpen(false);

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
              <Button colorScheme="danger" onPress={onClose}>
                Delete
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  );
};

export default Example;
