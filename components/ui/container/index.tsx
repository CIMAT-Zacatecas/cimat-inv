import React from "react";
import { View, ViewProps, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
  centered?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children, style, centered, ...props }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <View style={[styles.container, centered && styles.centered, style]} {...props}>
          {children}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Container;
