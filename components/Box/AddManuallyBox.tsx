import { Box, HStack, Icon, Text, Pressable } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type AddManullyNavigationProp = {
  navigate: (name: string) => void;
};

export default function AddManuallyBox() {
  const navigation = useNavigation<AddManullyNavigationProp>();
  return (
    <Pressable onPress={() => navigation.navigate("Add Manually")}>
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
            Add manually
          </Text>
          <Icon
            size="2xl"
            as={MaterialIcons}
            name="calculate"
            color="warmGray.50"
          />
        </HStack>
      </Box>
    </Pressable>
  );
}
