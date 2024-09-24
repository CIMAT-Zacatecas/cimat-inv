import React from "react";
import { View, ViewProps, StyleSheet } from "react-native";

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children, style, ...props }) => {
  return (
    <View style={[styles.container, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default Container;
