import React from "react";
import { Pressable, IPressableProps, Box, Image, Text } from "native-base";
import ButtonBackground from "@assets/button-background.png";

interface Props extends IPressableProps {}

const BackgroundButton = (props: Props) => {
  const { children, ...others } = props;
  return (
    <Image
      alt="ButtonBackground"
      source={ButtonBackground}
      style={{
        flex: 1,
        width: "100%",
        height: 30,
        resizeMode: "cover",
      }}
    />
  );
};

export default BackgroundButton;
