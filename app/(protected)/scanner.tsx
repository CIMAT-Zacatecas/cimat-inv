import { View, Text, TouchableOpacity } from "react-native";
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import { useState } from "react";
import Container from "@/components/ui/container";
import { Button, ButtonText } from "@/components/ui/button";
import { Alert } from "react-native";
import { useInventoryItem } from "@/hooks/inventory/useInventory";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@/components/ui/modal";
import BienItem from "@/components/bienItem";
import { router } from "expo-router";
import { Camera } from "lucide-react-native";
import { useAppFocus } from "@/hooks/core/useAppState";

export default function Scanner() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [isScanning, setIsScanning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scannedItemId, setScannedItemId] = useState<string | null>(null);
  // const [previouslyScannedIds, setPreviouslyScannedIds] = useState<Set<string>>(
  //   new Set(),
  // );
  const [permission, requestPermission] = useCameraPermissions();

  // Fetch item details when we have a scanned ID
  const { data: scannedItem, isLoading } = useInventoryItem(scannedItemId || undefined);

  if (!permission) {
    return (
      <Container centered>
        <Text>Cargando permisos de cámara...</Text>
      </Container>
    );
  }

  if (!permission.granted) {
    return (
      <Container centered>
        <Text>Se requiere acceso a la cámara para escanear códigos</Text>
        <Button onPress={requestPermission}>
          <ButtonText>Permitir acceso</ButtonText>
        </Button>
      </Container>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleBarCodeScanned = ({ type, data }: BarcodeScanningResult) => {
    setIsScanning(true);
    try {
      if (type === "qr") {
        const scannedData = JSON.parse(data);
        if (scannedData.id_primario) {
          setScannedItemId(scannedData.id_primario);
          setShowModal(true);
        }
      } else if (type === "ean13") {
        setScannedItemId(data);
        setShowModal(true);
      }
    } catch (error) {
      console.error("Scanning error:", error);
      Alert.alert("Error", "No se pudo procesar el código escaneado");
    } finally {
      setIsScanning(false);
    }
  };

  const handleItemPress = () => {
    if (scannedItem) {
      setShowModal(false);
      router.push({
        pathname: "/home/item-detail",
        params: { id: scannedItem.id_primario },
      });
    }
  };

  return (
    <Container removePadding>
      <CameraView
        facing={facing}
        onBarcodeScanned={isScanning ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13"],
        }}
        style={{ flex: 1 }}>
        <View style={{ position: "absolute", top: 16, right: 16 }}>
          <TouchableOpacity
            onPress={toggleCameraFacing}
            style={{
              backgroundColor: "rgba(0,0,0,0.3)",
              padding: 8,
              borderRadius: 8,
            }}>
            <Camera size={24} color="white" />
          </TouchableOpacity>
        </View>
      </CameraView>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Text className="text-lg font-bold">Item Escaneado</Text>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            {isLoading ? (
              <Text>Cargando detalles...</Text>
            ) : scannedItem ? (
              <TouchableOpacity onPress={handleItemPress}>
                <BienItem bien={scannedItem} onPress={handleItemPress} />
              </TouchableOpacity>
            ) : (
              <Text>No se encontró el item</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
}
