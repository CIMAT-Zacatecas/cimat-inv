import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { supabase } from "@/lib/supabase";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableData } from "@/components/ui/table";

export default function Inventory() {
  const [bienes, setBienes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBienes = async () => {
    try {
      const { data, error } = await supabase.from("bienes").select("*");

      if (error) {
        console.error("Error al obtener bienes:", error);
      } else {
        setBienes(data);
      }

      // console.log(data);
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
        <Text style={styles.title}>Inventario</Text>
        <Text>No hay bienes disponibles.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventario</Text>

      <ScrollView horizontal={true}>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Descripción</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bienes.map((bien) => (
              <TableRow key={bien.id_primario}>
                <TableData>{bien.id_primario}</TableData>
                <TableData>{bien.descripcion}</TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-start", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});
