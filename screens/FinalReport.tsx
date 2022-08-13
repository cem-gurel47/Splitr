import { HStack, Text, Icon, Divider, Box } from "native-base";
import Layout from "@components/Box/Layout";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

const ReportInfo = ({ color, amount, description, icon }) => {
  return (
    <HStack
      bgColor={color}
      alignItems="center"
      p={2}
      borderRadius="lg"
      marginBottom={2}
      justifyContent="space-between"
    >
      <Text fontSize="lg" fontWeight="medium">
        {description}
      </Text>
      <HStack space={0} alignItems="center">
        <Text fontSize="lg">{`${amount}`}</Text>
        {icon}
      </HStack>
    </HStack>
  );
};

export default function FinalReport() {
  return (
    <Layout>
      <ReportInfo
        description="Total amount:"
        amount={300}
        color="green.400"
        icon={
          <Icon
            as={MaterialIcons}
            name="attach-money"
            color="black"
            size="md"
            fontWeight="light"
          />
        }
      />
      <ReportInfo
        description="Number of users:"
        amount={2}
        color="red.400"
        icon={
          <Icon
            as={Ionicons}
            name="person-outline"
            color="black"
            size="sm"
            marginLeft={1}
            fontWeight="light"
          />
        }
      />
      <Divider backgroundColor="black" marginBottom={2} />
      <ReportInfo
        description="Amount per user:"
        amount={150}
        color="blue.400"
        icon={
          <Icon
            as={MaterialIcons}
            name="attach-money"
            color="black"
            size="md"
            fontWeight="light"
          />
        }
      />
      <Box borderRadius="lg" backgroundColor="orange.400" w="full" p={2}>
        <Text fontWeight="bold" fontSize="lg" marginTop={2}>
          People who paid more than average:
        </Text>
        <Text fontSize="lg">-John Doe paid +50 USD</Text>
        <Divider backgroundColor="black" marginTop={2} />

        <Text fontWeight="bold" fontSize="lg" marginTop={2}>
          People who paid less than average:
        </Text>
        <Text fontSize="lg">-Jane Doe paid -50 USD</Text>
      </Box>
      <Box borderRadius="lg" backgroundColor="coolGray.400" p={2} marginTop={2}>
        <Text fontWeight="bold" fontSize="lg" marginTop={2}>
          Who pays who?
        </Text>
        <Text fontSize="lg">-Jane Doe pays John Doe 50 USD</Text>
      </Box>
    </Layout>
  );
}
