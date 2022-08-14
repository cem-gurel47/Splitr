import { PresenceTransition, IconButton, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const DeleteExpenseButton = () => (
  <PresenceTransition
    visible={true}
    initial={{
      opacity: 0,
      scale: 0,
    }}
    animate={{
      opacity: 1,
      scale: 1,
      transition: {
        duration: 250,
      },
    }}
  >
    <IconButton
      variant="solid"
      bg="transparent"
      colorScheme="red"
      borderRadius="full"
      icon={
        <Icon
          as={Ionicons}
          size="2xl"
          name="md-remove-circle-sharp"
          _dark={{
            color: "white",
          }}
          color="red.500"
        />
      }
    />
  </PresenceTransition>
);

export default DeleteExpenseButton;
