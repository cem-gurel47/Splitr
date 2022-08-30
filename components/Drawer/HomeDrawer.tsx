import React from "react";
import { Container, Drawer, Button, Text, Slide, Box, Icon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Dimensions, Image } from "react-native";
import Logo from "@assets/logo.png";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const HomeDrawer = ({ isOpen, setIsOpen }: Props) => {
  const navigation = useNavigation();
  return (
    <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} placement="left">
      <Slide in={isOpen} placement="left" duration={200}>
        <Container
          safeArea
          bgColor="white"
          flex={1}
          width={Dimensions.get("window").width}
          borderTopRightRadius="3xl"
          borderBottomRightRadius="3xl"
        >
          <Box pt={6} pl={6}>
            <Image source={Logo} />
          </Box>
          <Container pt={6} width="full">
            <Button
              bgColor="white"
              w="100%"
              leftIcon={
                <Icon
                  as={MaterialIcons}
                  name="payment"
                  size="xl"
                  color="#2348FF"
                />
              }
              rightIcon={
                <Icon as={AntDesign} name="right" size="md" color="#2348FF" />
              }
            >
              <Text color="#2348FF" fontSize="xl">
                Add Person
              </Text>
            </Button>
          </Container>
        </Container>
      </Slide>
    </Drawer>
  );
};

export default HomeDrawer;
