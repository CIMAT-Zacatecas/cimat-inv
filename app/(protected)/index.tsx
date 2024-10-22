import { Button, ButtonGroup, ButtonText } from "@/components/ui/button";
import { TableHeader, TableRow, TableHead, TableBody, TableData } from "@/components/ui/table";
import { Table } from "@expo/html-elements";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi inventario</Text>

      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Artículo</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableData>Monitor</TableData>
            <TableData>
              <ButtonGroup>
                <Button size="xs" variant="outline" action="primary">
                  <ButtonText>Detalles</ButtonText>
                </Button>
                <Button size="xs" variant="outline" action="primary">
                  <ButtonText>Transferir</ButtonText>
                </Button>
              </ButtonGroup>
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>Computadora</TableData>
            <TableData>
              <ButtonGroup>
                <Button size="xs" variant="outline" action="primary">
                  <ButtonText>Detalles</ButtonText>
                </Button>
                <Button size="xs" variant="outline" action="primary">
                  <ButtonText>Transferir</ButtonText>
                </Button>
              </ButtonGroup>
            </TableData>
          </TableRow>
          <TableRow>
            <TableData>Mouse</TableData>
            <TableData>
              <ButtonGroup>
                <Button size="xs" variant="outline" action="primary">
                  <ButtonText>Detalles</ButtonText>
                </Button>
                <Button size="xs" variant="outline" action="primary">
                  <ButtonText>Transferir</ButtonText>
                </Button>
              </ButtonGroup>
            </TableData>
          </TableRow>
        </TableBody>
      </Table>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});
