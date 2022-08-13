import { Box } from "native-base";

type Props = {
  children: React.ReactNode;
  style?: any;
  onPress?: () => void;
};

export default function Layout({ children, style, onPress }: Props) {
  return (
    <Box
      onTouchEnd={onPress}
      _dark={{ bg: "blueGray.900" }}
      _light={{ bg: "blueGray.50" }}
      px={1}
      flex={1}
      width="full"
      paddingTop={4}
      paddingLeft={4}
      paddingRight={4}
      style={style}
    >
      {children}
    </Box>
  );
}
