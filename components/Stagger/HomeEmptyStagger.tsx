import React, { useState } from "react";
import { Box, HStack, IconButton, Icon, PresenceTransition } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { AddUserModal } from "@components/Modals";

const HomeEmptyStagger = () => {
  const [isAddPersonModalVisible, setIsAddPersonModalVisible] = useState(false);
  return (
    <Box
      style={{
        position: "absolute",
        bottom: 50,
        right: 30,
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
        <HStack justifyContent="center">
          <IconButton
            mb="4"
            variant="solid"
            bg="green.400"
            colorScheme="teal"
            borderRadius="full"
            onPress={() => {
              setIsAddPersonModalVisible(true);
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
      <AddUserModal
        modalVisible={isAddPersonModalVisible}
        setModalVisible={setIsAddPersonModalVisible}
      />
    </Box>
  );
};

export default HomeEmptyStagger;
