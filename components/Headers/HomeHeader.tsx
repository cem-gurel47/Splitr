import React, { useContext } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { VStack, Center, Text } from "native-base";
import Drawer from "@components/Drawer/HomeDrawer";
import formatter from "@utils/formatter";
// import { Feather } from "@expo/vector-icons";

type Props = {};

const HomeHeader = (props: Props) => {
  const { totalAmount, currency } = useContext(ExpenseContext);
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <VStack>
      <Center
        style={{
          backgroundColor: "#787DE8",
        }}
        borderBottomLeftRadius={60}
        borderBottomRightRadius={60}
        pt={16}
        pb={8}
        px={6}
        mb={4}
      >
        {/* <Icon
          onPress={() => setIsDrawerOpen(true)}
          as={Feather}
          size="6"
          name="menu"
          color="white"
          _dark={{
            color: "warmGray.50",
          }}
        /> */}
        <Text
          fontSize="xl"
          mb={1}
          style={{
            color: "#98C1F7",
          }}
        >
          Your total expenses
        </Text>
        <Text color="white" fontWeight="extrabold" fontSize="xl">
          {formatter(totalAmount, currency)}
        </Text>
      </Center>
      <Text color="black" fontSize="xl" fontWeight="bold" pl={25} mb={4}>
        Track your expenses
      </Text>
      {/* <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} /> */}
    </VStack>
  );
};

export default HomeHeader;
