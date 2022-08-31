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
      flex={1}
      width="full"
      style={style}
    >
      {children}
    </Box>
  );
}
