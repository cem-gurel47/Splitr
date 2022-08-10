import { Box, HStack, Icon, Text, Pressable } from "native-base";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

type ScanBarcodeNavigationProp = {
  navigate: (name: string) => void;
};

export default function ScanBillBox() {
  const navigation = useNavigation<ScanBarcodeNavigationProp>();
  return (
    <Pressable onPress={() => navigation.navigate("Scan Barcode")}>
      <Box
        mb={5}
        bg={{
          linearGradient: {
            colors: ["#ff4e50", "#f9d423"],
            start: [0, 0],
            end: [1, 1],
          },
        }}
        _light={{
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
            Scan barcode
          </Text>
          <Icon
            size="2xl"
            as={MaterialCommunityIcons}
            name="barcode-scan"
            color="warmGray.50"
          />
        </HStack>
      </Box>
    </Pressable>
  );
}
