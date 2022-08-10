import { Center } from "native-base";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Center
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
      px={1}
      flex={1}
    >
      {children}
    </Center>
  );
}
