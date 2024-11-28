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
import { Card } from "@/components/ui/card";
import BienItem from "@/components/bienItem";
import { router } from "expo-router";

export default function Scanner() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [isScanning, setIsScanning] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [scannedItemId, setScannedItemId] = useState<string | null>(null);
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
    console.log("Scanned type:", type);
    console.log("Scanned data:", data);
    try {
      if (type === "qr") {
        const scannedData = JSON.parse(data);
        console.log("Parsed QR data:", scannedData);
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
      router.push({
        pathname: "/inventory/item-detail",
        params: { id: scannedItem.id_primario },
      });
    }
  };

  return (
    <Container>
      <CameraView
        facing={facing}
        onBarcodeScanned={isScanning ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr", "ean13"],
        }}
        style={{ flex: 1 }}>
        <View>
          <TouchableOpacity onPress={toggleCameraFacing}>
            <Text>Cambiar cámara</Text>
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
