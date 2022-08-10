import React, { useState } from "react";
import Layout from "@components/Box/Layout";
import { Text } from "native-base";
import { BarCodeScanner } from "expo-barcode-scanner";
import { StyleSheet } from "react-native";

export default function ScanBarcode() {
  const [scanned, setScanned] = useState(false);
  const [type, setType] = useState("");
  const [data, setData] = useState("");

  const handleBarCodeScanned = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    setType(type);
    setData(data);
  };

  return (
    <Layout>
      {scanned ? (
        <Text>
          Type: {type}
          Data: {data}
        </Text>
      ) : (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}
    </Layout>
  );
}
