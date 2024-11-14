import React from "react";
import { View, ViewProps, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
  centered?: boolean;
  removePadding?: boolean;
  removeHorizontalPadding?: boolean;
  removeVerticalPadding?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  style,
  centered,
  removePadding,
  removeHorizontalPadding,
  removeVerticalPadding,
  ...props
}) => {
  const containerStyle = [
    styles.container,
    centered && styles.centered,
    removePadding && { padding: 0 },
    removeHorizontalPadding && { paddingHorizontal: 0 },
    removeVerticalPadding && { paddingVertical: 0 },
    style,
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <View style={containerStyle} {...props}>
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
