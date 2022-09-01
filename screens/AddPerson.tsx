import React, { useState, useContext } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import Header from "@components/Headers/GenericHeader";
import Layout from "@components/Box/Layout";
import {
  Button,
  Center,
  Input,
  Text,
  FormControl,
  WarningOutlineIcon,
} from "native-base";
import Toast from "react-native-toast-message";

const AddPerson = () => {
  const { addNewPerson } = useContext(ExpenseContext);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNameEmpty, setIsNameEmpty] = useState(false);

  const onPress = () => {
    setLoading(true);
    if (name.length === 0) {
      setIsNameEmpty(true);
      setLoading(false);
      return;
    }
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
      <Header label="Add New Person" />
      <Center px={12}>
        <FormControl>
          <FormControl.Label isRequired>Name</FormControl.Label>
          <Input
            value={name}
            onChangeText={(text) => {
              setIsNameEmpty(text.length === 0);
              setName(text);
            }}
            size="xl"
            variant="underlined"
            autoFocus
            autoCapitalize="words"
            style={{
              borderBottomColor: "#9196F3",
              color: "#9196F3",
            }}
          />
          <FormControl.ErrorMessage
            isInvalid={isNameEmpty}
            leftIcon={<WarningOutlineIcon size="xs" />}
          >
            Description is required
          </FormControl.ErrorMessage>
        </FormControl>
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
