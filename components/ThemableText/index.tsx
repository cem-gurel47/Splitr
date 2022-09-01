import { Text, ITextProps } from "native-base";

const ThemableText = ({ children, style, ...props }: ITextProps) => {
  return (
    <Text
      {...props}
      _dark={{
        color: "warmGray.50",
      }}
    >
      {children}
    </Text>
  );
};

export default ThemableText;
