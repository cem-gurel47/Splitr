import React from "react";
import { Box, HStack, IconButton, Icon, PresenceTransition } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AnimatedLottieView from "lottie-react-native";
import ArrowAnimation from "@assets/right-arrow.json";

const HomeEmptyStagger = () => {
  const navigation = useNavigation();
  return (
    <Box
      style={{
        position: "absolute",
        bottom: "1%",
        right: "5%",
      }}
    >
      <PresenceTransition
        visible={true}
        initial={{
          opacity: 1,
          scale: 1,
        }}
        animate={{
          opacity: 1,
          scale: 1.2,
          transition: {
            duration: 250,
          },
        }}
      >
        <HStack justifyContent="center" alignItems="center" space={2}>
          <AnimatedLottieView
            source={ArrowAnimation}
            autoPlay
            loop
            style={{
              width: "40%",
              height: "100%",
            }}
          />
          <IconButton
            variant="solid"
            bg="green.400"
            colorScheme="teal"
            borderRadius="full"
            onPress={() => {
              navigation.navigate("Add New Person");
            }}
            icon={
              <Icon
                as={Ionicons}
                _dark={{
                  color: "warmGray.50",
                }}
                size="6"
                name="person-add"
                color="warmGray.50"
              />
            }
          />
        </HStack>
      </PresenceTransition>
    </Box>
  );
};

export default HomeEmptyStagger;
