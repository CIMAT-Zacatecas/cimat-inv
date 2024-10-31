import { View, Text, StyleSheet } from "react-native";

export default function UsersManagement() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuarios</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});
