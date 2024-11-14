import { View } from "react-native";

export const Separator = ({ height = 20 }: { height?: number }) => {
  return <View style={{ height }} />;
};

Separator.displayName = "Separator";
