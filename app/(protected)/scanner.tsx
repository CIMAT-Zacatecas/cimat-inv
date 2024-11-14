import { View, Text, TouchableOpacity } from "react-native";
import { CameraView, CameraType, useCameraPermissions, BarcodeScanningResult } from "expo-camera";
import { useState } from "react";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Alert } from "react-native";

export default function Scanner() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [isScanning, setIsScanning] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

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
        <Button onPress={requestPermission}>Permitir acceso</Button>
      </Container>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleBarCodeScanned = ({ type, data }: BarcodeScanningResult) => {
    setIsScanning(true);
    try {
      Alert.alert("Código escaneado", `Tipo: ${type}\nDatos: ${data}`);
    } catch (error) {
      Alert.alert("Error", "No se pudo procesar el código escaneado");
    } finally {
      setIsScanning(false);
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
    </Container>
  );
}
