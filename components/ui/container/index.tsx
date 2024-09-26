import React from "react";
import { View, ViewProps, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children, style, ...props }) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <View style={[styles.container, style]} {...props}>
        {children}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default Container;
