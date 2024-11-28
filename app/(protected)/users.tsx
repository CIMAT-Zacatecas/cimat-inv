import Container from "@/components/ui/container";
import { FlashList } from "@shopify/flash-list";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
import { useAppFocus } from "@/hooks/core/useAppState";
import { useUsers } from "@/hooks/user/useUser";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarFallbackText, AvatarImage } from "@/components/ui/avatar";
import { Center } from "@/components/ui/center";
import { getRoleName } from "@/utils/utils";
import { UserWithAuth } from "@/services/users";

const UserItem = ({ user }: { user: UserWithAuth }) => (
  <Card size="md" variant="elevated">
    <HStack space="md">
      <Center>
        <Avatar size="md">
          {user.profile.avatar_url ? (
            <AvatarImage source={{ uri: user.profile.avatar_url }} />
          ) : (
            <AvatarFallbackText>
              {user.profile.full_name || user.profile.username || "?"}
            </AvatarFallbackText>
          )}
        </Avatar>
      </Center>
      <VStack space="sm">
        <HStack space="md">
          <Text bold>Nombre:</Text>
          <Text>{user.profile.full_name || "No especificado"}</Text>
        </HStack>

        <HStack space="md">
          <Text bold>Email:</Text>
          <Text>{user.authUser?.email || "No especificado"}</Text>
        </HStack>

        <HStack space="md">
          <Text bold>Rol:</Text>
          <Text>{getRoleName(user.profile.id_rol)}</Text>
        </HStack>
      </VStack>
    </HStack>
  </Card>
);

export default function Users() {
  const { data: users = [], isLoading, error, refetch } = useUsers();

  useAppFocus(refetch);

  if (isLoading) {
    return (
      <Container centered>
        <Spinner size="large" />
        <Text>Cargando usuarios...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container centered>
        <Text className="text-red-500">Error al cargar usuarios</Text>
        <Text className="text-sm text-gray-500">
          {error instanceof Error ? error.message : "Error desconocido"}
        </Text>
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
        keyExtractor={(item) => item.profile.id}
        contentContainerClassName="pb-5"
        ItemSeparatorComponent={() => <Separator height={8} />}
      />
    </Container>
  );
}
