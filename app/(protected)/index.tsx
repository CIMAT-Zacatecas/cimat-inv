import { TableHeader, TableRow, TableHead, TableBody, TableData } from "@/components/ui/table";
import { Table } from "@expo/html-elements";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/store/userStore";
import { router, useRouter } from "expo-router";

export default function HomeScreen() {
  const user = useUserStore((state) => state.user);

  const [bienes, setBienes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBienes = async () => {
    try {
      const { data, error } = await supabase.from("bienes").select("*").eq("id_responsable", user.profile?.id);

      if (error) {
        console.error("Error al obtener bienes:", error);
      } else {
        setBienes(data);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBienes();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando inventario...</Text>
      </View>
    );
  }

  if (bienes.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mi Inventario</Text>
        <Text>No tienes bienes asignados.</Text>
      </View>
    );
  }

  const handlePress = (bien) => {
    router.push({
      pathname: "/(protected)/item-detail",
      params: { bien: JSON.stringify(bien) }, // Pasamos el bien como string
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis bienes</Text>

      <ScrollView horizontal={true}>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bienes.map((bien) => (
              <TableRow key={bien.id_primario}>
                <TableData>{bien.id_primario}</TableData>
                <TableData>{bien.descripcion}</TableData>
                <TableData>
                  <TouchableOpacity style={styles.button} onPress={() => handlePress(bien)}>
                    <Text style={styles.buttonText}>Ver Detalle</Text>
                  </TouchableOpacity>
                </TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
  table: { minWidth: 600 }, // Ajusta el ancho según tus necesidades
  button: {
    backgroundColor: "#007BFF",
    padding: 5,
    borderRadius: 5,
  },
  buttonText: { color: "#fff", textAlign: "center" },
});
