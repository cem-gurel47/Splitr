import React, { useState, useEffect } from "react";
import { Box, HStack, Icon, Text, Pressable, Button } from "native-base";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StyleSheet } from "react-native";

type ScanBarcodeNavigationProp = {
  navigate: (name: string) => void;
};

export default function ScanBillBox() {
  const navigation = useNavigation<ScanBarcodeNavigationProp>();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  return (
    <Pressable
      onPress={() => {
        if (hasPermission) {
          navigation.navigate("Scan Barcode");
        } else {
          alert("You need to grant permission to use the barcode scanner");
        }
      }}
    >
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
        {scanned && (
          <Button onPress={() => setScanned(false)}>Press to scan again</Button>
        )}
      </Box>
    </Pressable>
  );
}
