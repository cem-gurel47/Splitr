import React, { useContext } from "react";
import { ExpenseContext } from "@contexts/ExpenseContext";
import { VStack, Center, Text } from "native-base";
// import Drawer from "@components/Drawer/HomeDrawer";
import formatter from "@utils/formatter";
// import { Feather } from "@expo/vector-icons";

type Props = {};

const HomeHeader = (props: Props) => {
  const { totalAmount, currency } = useContext(ExpenseContext);
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <VStack
      safeArea
      style={{
        backgroundColor: "#787DE8",
      }}
      borderBottomLeftRadius={60}
      borderBottomRightRadius={60}
      justifyContent="space-between"
      alignItems="center"
      pt={0}
      px={6}
      mb={4}
    >
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
    </VStack>
  );
};

export default HomeHeader;
