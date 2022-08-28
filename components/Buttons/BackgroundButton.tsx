import React from "react";
import { Center, IPressableProps, Text, Pressable } from "native-base";
import ButtonBackground from "@assets/button-background.png";
import { ImageBackground } from "react-native";

interface Props extends IPressableProps {}

const BackgroundButton = (props: Props) => {
  return (
    <Pressable w="100%">
      <Center w="100%">
        <ImageBackground
          source={ButtonBackground}
          resizeMode="contain"
          style={{
            width: "100%",
            flex: 1,
            height: 70,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text color="white" fontSize="lg">
            {props.children}
          </Text>
        </ImageBackground>
      </Center>
    </Pressable>
  );
};

export default BackgroundButton;
