import React, { useState, useContext } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import AddPersonHeader from "@components/Headers/AddPersonHeader";
import Layout from "@components/Box/Layout";
import { Button, Center, Input, Text } from "native-base";
import Toast from "react-native-toast-message";

const AddPerson = () => {
  const { addNewPerson } = useContext(ExpenseContext);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const onPress = () => {
    setLoading(true);
    addNewPerson(name);
    setLoading(false);
    setName("");
    Toast.show({
      type: "success",
      text1: "Person created 🚀",
      text2: `${name} is added to the list.`,
    });
  };

  return (
    <Layout
      style={{
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 0,
      }}
    >
      <AddPersonHeader />
      <Center px={12}>
        <Text
          fontWeight="bold"
          fontSize="2xl"
          style={{
            color: "#9196F3",
          }}
        >
          Enter Name
        </Text>
        <Input
          value={name}
          onChangeText={setName}
          size="xl"
          variant="underlined"
          autoFocus
          autoCapitalize="words"
          style={{
            borderBottomColor: "#9196F3",
            color: "#9196F3",
          }}
        />
        <Button
          isLoading={loading}
          isLoadingText="Loading"
          w="100%"
          mt={8}
          variant="outline"
          py={2}
          borderRadius="2xl"
          style={{
            borderColor: "#9196F3",
          }}
          onPress={onPress}
        >
          <Text
            style={{
              color: "#9196F3",
            }}
            fontWeight="bold"
            fontSize="xl"
          >
            Add Person
          </Text>
        </Button>
      </Center>
    </Layout>
  );
};

export default AddPerson;
