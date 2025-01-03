import { useLocalSearchParams, router } from "expo-router";
import Container from "@/components/ui/container";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useInventoryItem } from "@/hooks/inventory/useInventory";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react-native";
import { useInventoryMutations } from "@/hooks/inventory/useInventoryMutations";
import QRCode from "react-native-qrcode-svg";
import Barcode from "@kichiyaki/react-native-barcode-generator";
import ViewShot from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { Alert, ScrollView, TouchableOpacity } from "react-native";
import { useRef } from "react";

export default function ItemDetail() {
  const { id } = useLocalSearchParams();
  const { data: bien, isLoading, error } = useInventoryItem(id as string);
  const { deleteItem } = useInventoryMutations();
  const qrRef = useRef(null);
  const barcodeRef = useRef(null);

  const handleEdit = () => {
    router.push(`/inventory/edit-item?id=${id}`);
  };

  const handleDelete = () => {
    deleteItem(id as string);
  };

  const shareImage = async (
    ref: React.RefObject<ViewShot>,
    fileName: string,
  ): Promise<void> => {
    try {
      if (!ref.current?.capture) return;
      const uri = await ref.current.capture();
      const fileUri = `${FileSystem.cacheDirectory}${fileName}.png`;

      await FileSystem.copyAsync({
        from: uri,
        to: fileUri,
      });
      await Sharing.shareAsync(fileUri);
    } catch (err) {
      console.error("Share error:", err);
      Alert.alert("Error", "Failed to share the image.");
    }
  };

  if (isLoading) {
    return (
      <Container centered>
        <Spinner size="large" />
        <Text>Cargando detalles...</Text>
      </Container>
    );
  }

  if (error || !bien) {
    return (
      <Container>
        <Text>No se pudieron cargar los detalles del bien.</Text>
      </Container>
    );
  }

  const qrData = JSON.stringify({
    id: bien.id,
    id_primario: bien.id_primario,
  });

  return (
    <Container removeVerticalPadding>
      <ScrollView>
        <VStack space="md" className="my-4">
          <Card>
            <VStack space="md">
              <HStack space="md" className="items-center justify-between">
                <HStack space="md" className="flex-1">
                  <Text className="text-typography-900" bold>
                    ID:
                  </Text>
                  <Text>{bien.id}</Text>
                </HStack>
                <HStack space="sm">
                  <Button
                    size="sm"
                    variant="outline"
                    action="secondary"
                    onPress={handleEdit}>
                    <Pencil size={18} color="#666666" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    action="negative"
                    onPress={handleDelete}>
                    <Trash2 size={18} color="#dc2626" />
                  </Button>
                </HStack>
              </HStack>

              <HStack space="md">
                <Text className="text-typography-900" bold>
                  ID CIMAT:
                </Text>
                <Text>{bien.id_primario}</Text>
              </HStack>

              {bien.id_secundario && (
                <HStack space="md">
                  <Text className="text-typography-900" bold>
                    ID CIMAT 2:
                  </Text>
                  <Text>{bien.id_secundario}</Text>
                </HStack>
              )}

              <HStack space="md">
                <Text className="text-typography-900" bold>
                  Descripción:
                </Text>
                <Text>{bien.descripcion}</Text>
              </HStack>

              {bien.codigo_barra && (
                <HStack space="md">
                  <Text className="text-typography-900" bold>
                    Código de Barras:
                  </Text>
                  <Text>{bien.codigo_barra}</Text>
                </HStack>
              )}

              {bien.categoria && (
                <HStack space="md">
                  <Text className="text-typography-900" bold>
                    Categoría:
                  </Text>
                  <Text>{bien.categoria.nombre}</Text>
                </HStack>
              )}

              {bien.ubicacion && (
                <HStack space="md">
                  <Text className="text-typography-900" bold>
                    Ubicación:
                  </Text>
                  <Text>
                    {bien.ubicacion.codigo} - {bien.ubicacion.nombre}
                  </Text>
                </HStack>
              )}

              {bien.sub_ubicacion && (
                <HStack space="md">
                  <Text className="text-typography-900" bold>
                    Sub-ubicación:
                  </Text>
                  <Text>{bien.sub_ubicacion.nombre}</Text>
                </HStack>
              )}

              {bien.estado && (
                <HStack space="md">
                  <Text className="text-typography-900" bold>
                    Estado:
                  </Text>
                  <Text>{bien.estado.nombre}</Text>
                </HStack>
              )}

              {bien.responsable && (
                <HStack space="md">
                  <Text className="text-typography-900" bold>
                    Responsable:
                  </Text>
                  <Text>{bien.responsable.full_name || bien.responsable.username}</Text>
                </HStack>
              )}

              {bien.subresponsable && (
                <HStack space="md">
                  <Text className="text-typography-900" bold>
                    Sub-responsable:
                  </Text>
                  <Text>
                    {bien.subresponsable.full_name || bien.subresponsable.username}
                  </Text>
                </HStack>
              )}

              {bien.fecha_registro && (
                <HStack space="md">
                  <Text className="text-typography-900" bold>
                    Fecha de Registro:
                  </Text>
                  <Text>{new Date(bien.fecha_registro).toLocaleDateString()}</Text>
                </HStack>
              )}
            </VStack>
          </Card>

          <Card>
            <VStack space="lg">
              <VStack space="sm" className="items-center">
                <Text className="text-typography-900" bold>
                  Código QR:
                </Text>
                <TouchableOpacity onPress={() => shareImage(qrRef, "qrcode")}>
                  <ViewShot ref={qrRef} options={{ format: "png", quality: 1 }}>
                    <QRCode value={qrData} size={200} />
                  </ViewShot>
                </TouchableOpacity>
              </VStack>

              <VStack space="sm" className="items-center">
                <Text className="text-typography-900" bold>
                  Código de Barras (ID Primario):
                </Text>
                <TouchableOpacity onPress={() => shareImage(barcodeRef, "barcode")}>
                  <ViewShot ref={barcodeRef} options={{ format: "png", quality: 1 }}>
                    <Barcode
                      format="CODE128"
                      value={bien.id_primario}
                      text={bien.id_primario}
                      width={250}
                      height={80}
                      maxWidth={250}
                      background="#FFFFFF"
                      textStyle={{ color: "#000000" }}
                    />
                  </ViewShot>
                </TouchableOpacity>
              </VStack>
            </VStack>
          </Card>
        </VStack>
      </ScrollView>
    </Container>
  );
}
