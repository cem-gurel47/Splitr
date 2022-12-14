import {
  Box,
  HStack,
  Icon,
  Text,
  Pressable,
  PresenceTransition,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type PersonBoxProps = {
  name: string;
  amount: number;
  currency: string;
};

export default function PersonBox({ name, amount }: PersonBoxProps) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Person Expenses", {
          personName: name,
        })
      }
    >
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
        <Box
          mb={5}
          _light={{
            bg: {
              linearGradient: {
                colors: ["#ff4e50", "#f9d423"],
                start: [0, 0],
                end: [1, 1],
              },
            },
          }}
          _dark={{
            bg: {
              linearGradient: {
                colors: ["#70e1f5", "#ffd194"],
                start: [0, 0],
                end: [1, 1],
              },
            },
          }}
          p="12"
          rounded="xl"
        >
          <HStack alignItems="center" justifyContent="center" space={2}>
            <Text fontSize="2xl" fontWeight="bold" color="warmGray.50">
              {name}
            </Text>
          </HStack>
          <HStack alignItems="center" justifyContent="center" space={0}>
            <Text fontSize="2xl" fontWeight="bold" color="warmGray.50">
              {amount}
            </Text>
            <Icon
              size="2xl"
              as={MaterialIcons}
              name="attach-money"
              color="warmGray.50"
            />
          </HStack>
        </Box>
      </PresenceTransition>
    </Pressable>
  );
}
