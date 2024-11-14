import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateItem } from "@/hooks/useCreateItem";
import Container from "@/components/ui/container";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { VStack } from "@/components/ui/vstack";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const createItemSchema = z.object({
  id_primario: z.string().min(1, "El ID primario es obligatorio"),
  descripcion: z.string().min(1, "La descripción es obligatoria"),
  id_secundario: z.string().optional(),
  codigo_barra: z.string().optional(),
});

type FormData = z.infer<typeof createItemSchema>;

export default function CreateItem() {
  const router = useRouter();
  const { createItem, isLoading } = useCreateItem();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(createItemSchema),
    defaultValues: {
      id_primario: "",
      descripcion: "",
      id_secundario: "",
      codigo_barra: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("[CreateItem] Submitting form with data:", data);

    const { error } = await createItem(data);

    if (error) {
      console.error("[CreateItem] Error in form submission:", error);
      Alert.alert("Error", error);
      return;
    }

    console.log("[CreateItem] Form submitted successfully");
    Alert.alert("Éxito", "Item creado correctamente", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <Container>
      <Card>
        <VStack space="md">
          <FormControl isInvalid={!!errors.id_primario}>
            <FormControlLabel>
              <FormControlLabelText>ID Primario</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="id_primario"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField
                    placeholder="Ingrese el ID primario"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{errors.id_primario?.message}</FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl isInvalid={!!errors.descripcion}>
            <FormControlLabel>
              <FormControlLabelText>Descripción</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="descripcion"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField
                    placeholder="Ingrese la descripción"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    multiline
                    numberOfLines={3}
                  />
                </Input>
              )}
            />
            <FormControlError>
              <FormControlErrorIcon as={AlertCircleIcon} />
              <FormControlErrorText>{errors.descripcion?.message}</FormControlErrorText>
            </FormControlError>
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>ID Secundario (Opcional)</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="id_secundario"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField
                    placeholder="Ingrese el ID secundario"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value || ""}
                  />
                </Input>
              )}
            />
          </FormControl>

          <FormControl>
            <FormControlLabel>
              <FormControlLabelText>Código de Barras (Opcional)</FormControlLabelText>
            </FormControlLabel>
            <Controller
              control={control}
              name="codigo_barra"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input>
                  <InputField
                    placeholder="Ingrese el código de barras"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value || ""}
                  />
                </Input>
              )}
            />
          </FormControl>

          <Button onPress={handleSubmit(onSubmit)} isDisabled={isLoading}>
            <ButtonText>{isLoading ? "Creando..." : "Crear Item"}</ButtonText>
          </Button>
        </VStack>
      </Card>
      <LoadingOverlay isLoading={isLoading} />
    </Container>
  );
}
