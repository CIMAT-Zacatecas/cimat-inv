import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { supabase } from "@/lib/supabase";
import { Profile } from "@/types/types";
import Container from "@/components/ui/container";
import { FlashList } from "@shopify/flash-list";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Card } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";

const UserItem = ({ user }: { user: Profile }) => (
  <Card size="md" variant="elevated">
    <VStack space="sm">
      <HStack space="md">
        <Text bold>Nombre:</Text>
        <Text>{user.full_name || "No especificado"}</Text>
      </HStack>

      <HStack space="md">
        <Text bold>Email:</Text>
        <Text>{user.username || "No especificado"}</Text>
      </HStack>

      <HStack space="md">
        <Text bold>Rol:</Text>
        <Text>{user.id_rol}</Text>
      </HStack>
    </VStack>
  </Card>
);

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
      <Container centered>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando usuarios...</Text>
      </Container>
    );
  }

  if (users.length === 0) {
    return (
      <Container centered>
        <Text className="mb-4 text-2xl font-bold">Usuarios</Text>
        <Text>No hay usuarios registrados.</Text>
      </Container>
    );
  }

  return (
    <Container removeVerticalPadding>
      <FlashList
        ListHeaderComponent={() => <Separator height={8} />}
        estimatedItemSize={50}
        data={users}
        renderItem={({ item }) => <UserItem user={item} />}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-5"
        ItemSeparatorComponent={() => <Separator height={8} />}
      />
    </Container>
  );
}
