import { Box, IBoxProps } from "native-base";

interface Props extends IBoxProps {
  onPress?: () => void;
}

export default function Layout({ children, style, onPress }: Props) {
  return (
    <Box
      onTouchEnd={onPress}
      _dark={{ bg: "#24242D" }}
      _light={{ bg: "blueGray.50" }}
      flex={1}
      width="full"
      style={style}
    >
      {children}
    </Box>
  );
}
