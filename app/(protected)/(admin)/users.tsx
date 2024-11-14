import { useEffect, useState } from "react";
import { Text, ActivityIndicator, ScrollView } from "react-native";
import { supabase } from "@/lib/supabase";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableData } from "@/components/ui/table";
import { Profile } from "@/types/types";
import Container from "@/components/ui/container";

export default function Users() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Error al obtener usuarios:", error);
      } else {
        setUsers(data);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando usuarios...</Text>
      </Container>
    );
  }

  if (users.length === 0) {
    return (
      <Container>
        <Text>Usuarios</Text>
        <Text>No hay usuarios registrados.</Text>
      </Container>
    );
  }

  return (
    <Container>
      <Text>Usuarios</Text>

      <ScrollView horizontal={true}>
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rol</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableData>{user.full_name}</TableData>
                <TableData>{user.username}</TableData>
                <TableData>{user.id_rol}</TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollView>
    </Container>
  );
}
