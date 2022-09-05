import React from "react";
import { Center, IPressableProps, Text } from "native-base";
import ButtonBackground from "@assets/button-background.png";
import { ImageBackground, TouchableOpacity } from "react-native";

interface Props extends IPressableProps {
  onPress: () => void;
}

const BackgroundButton = (props: Props) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
      }}
      onPress={props.onPress}
    >
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
    </TouchableOpacity>
  );
};

export default BackgroundButton;
