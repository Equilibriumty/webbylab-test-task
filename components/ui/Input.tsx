import { useThemeColor } from "@/hooks/useThemeColor";
import { TextInput, TextInputProps } from "react-native";

type InputProps = React.ComponentProps<typeof TextInput>;

export const Input = ({ ...props }: InputProps) => {
  const { style: styleFromProps, ...rest } = props;

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");

  const baseStyle: TextInputProps["style"] = {
    backgroundColor,
    borderColor: "#ccc",
    color: textColor,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  };

  return (
    <TextInput
      placeholderTextColor="#ccc"
      style={[baseStyle, styleFromProps]}
      {...rest}
    />
  );
};
