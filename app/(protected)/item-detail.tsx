// app/detail.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { UseSearch } from "expo-router";

export default function DetailScreen() {
  const { bien } = SearchParams();
  const parsedBien = bien ? JSON.parse(bien) : null;

  if (!parsedBien) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No se proporcionaron detalles del bien.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle del Bien</Text>
      <Text style={styles.label}>ID: {parsedBien.id_primario}</Text>
      <Text style={styles.label}>Descripción: {parsedBien.descripcion}</Text>
      {/* Agrega más campos según sea necesario */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  label: { fontSize: 18, marginBottom: 10 },
  errorText: { fontSize: 18, color: "red", textAlign: "center" },
});
