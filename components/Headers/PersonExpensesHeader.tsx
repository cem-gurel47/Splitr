import React, { useState } from "react";
import { Center, HStack, Icon, Text } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { DeleteUserAlert } from "@components/Alerts";

const PersonExpenseHeader = ({ name, id }: { name: string; id: number }) => {
  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const navigation = useNavigation();
  const goBack = () => {
    navigation.navigate("Home");
  };

  return (
    <>
      <HStack
        style={{
          backgroundColor: "#787DE8",
        }}
        safeArea
        borderBottomLeftRadius={60}
        borderBottomRightRadius={60}
        pt={4}
        pb={12}
        px={6}
        mb={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <Icon
          onPress={goBack}
          as={AntDesign}
          size="xl"
          name="leftcircleo"
          color="white"
        />
        <Text color="white" fontWeight="bold" fontSize="xl">
          {name}
        </Text>
        <Icon
          onPress={() => setAlertModalVisible(true)}
          as={AntDesign}
          size="xl"
          name="delete"
          color="white"
        />
      </HStack>
      <DeleteUserAlert
        isOpen={alertModalVisible}
        setIsOpen={setAlertModalVisible}
        name={name}
        id={id}
      />
    </>
  );
};

export default PersonExpenseHeader;
