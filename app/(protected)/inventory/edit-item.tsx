import { Alert, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useMemo } from "react";
import { useInventoryMutations } from "@/hooks/inventory/useInventoryMutations";
import { useInventoryItem } from "@/hooks/inventory/useInventory";
import {
  useCategories,
  useStatuses,
  useLocations,
  useSubLocations,
} from "@/hooks/inventory/useInventoryMetadata";
import { useUsers } from "@/hooks/user/useUser";
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
import { Spinner } from "@/components/ui/spinner";
import SelectField from "@/components/select-field";
import { inventoryItemSchema } from "@/schemas/inventory";
import { Text } from "@/components/ui/text";

type FormData = z.infer<typeof inventoryItemSchema>;

export default function EditItem() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const { updateItem, isLoading: isUpdating } = useInventoryMutations();
  const { data: item, isLoading: isLoadingItem } = useInventoryItem(id as string);
  const { categories } = useCategories();
  const { statuses } = useStatuses();
  const { locations } = useLocations();
  const { data: users = [] } = useUsers();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(inventoryItemSchema),
    defaultValues: useMemo(
      () => ({
        id_primario: item?.id_primario || "",
        descripcion: item?.descripcion || "",
        id_secundario: item?.id_secundario || "",
        codigo_barra: item?.codigo_barra || "",
        // Convert to strings for responsable fields as per schema
        id_responsable: item?.id_responsable?.toString() || "",
        id_subresponsable: item?.id_subresponsable?.toString() || null,
        // Ensure numbers for these fields as per schema
        id_categoria: Number(item?.id_categoria) || undefined,
        id_estado: Number(item?.id_estado) || undefined,
        id_ubicacion: Number(item?.id_ubicacion) || undefined,
        id_sub_ubicacion: item?.id_sub_ubicacion ? Number(item?.id_sub_ubicacion) : null,
      }),
      [item],
    ),
  });

  // Add debug logging
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log("Validation Errors:", errors);
    }
  }, [errors]);

  const onSubmit = async (data: FormData) => {
    console.log("Starting submission with data:", data);
    try {
      const { error } = await updateItem(id as string, data);
      if (error) {
        console.error("Update error:", error);
        Alert.alert("Error", error);
        return;
      }
      Alert.alert("Éxito", "Item actualizado correctamente", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (e) {
      console.error("Submission error:", e);
      Alert.alert("Error", "Ocurrió un error al actualizar el item");
    }
  };

  const formValues = watch();
  const selectedUbicacion = formValues.id_ubicacion;
  const { subLocations } = useSubLocations(selectedUbicacion || undefined);

  if (isLoadingItem) {
    return (
      <Container centered>
        <Spinner size="large" />
        <Text>Cargando item...</Text>
      </Container>
    );
  }

  return (
    <Container removeVerticalPadding>
      <ScrollView>
        <Card className="mb-4 mt-4">
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

            <FormControl isInvalid={!!errors.id_secundario}>
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
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {errors.id_secundario?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl isInvalid={!!errors.codigo_barra}>
              <FormControlLabel>
                <FormControlLabelText>Código de Barras</FormControlLabelText>
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
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {errors.codigo_barra?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <SelectField
              name="id_categoria"
              control={control}
              label="Categoría"
              placeholder="Seleccione una categoría"
              options={categories}
              error={errors.id_categoria?.message}
              required
            />

            <SelectField
              name="id_estado"
              control={control}
              label="Estado"
              placeholder="Seleccione un estado"
              options={statuses}
              error={errors.id_estado?.message}
              required
            />

            <SelectField
              name="id_ubicacion"
              control={control}
              label="Ubicación"
              placeholder="Seleccione una ubicación"
              options={locations}
              error={errors.id_ubicacion?.message}
              required
              onValueChange={(val: string | null) => {
                if (val !== watch("id_ubicacion")?.toString()) {
                  setValue("id_sub_ubicacion", null);
                }
              }}
            />

            {selectedUbicacion && (
              <SelectField
                name="id_sub_ubicacion"
                control={control}
                label="Sub-ubicación"
                placeholder="Seleccione una sub-ubicación"
                options={subLocations}
                error={errors.id_sub_ubicacion?.message}
                isOptional
              />
            )}

            <SelectField
              name="id_responsable"
              control={control}
              label="Responsable"
              placeholder="Seleccione un responsable"
              options={users.map((user) => ({
                id: user.profile.id.toString(),
                nombre:
                  user.profile.full_name || user.profile.username || "No disponible",
              }))}
              error={errors.id_responsable?.message}
              required
            />

            <SelectField
              name="id_subresponsable"
              control={control}
              label="Sub-responsable"
              placeholder="Seleccione un sub-responsable"
              options={users.map((user) => ({
                id: user.profile.id.toString(),
                nombre:
                  user.profile.full_name || user.profile.username || "No disponible",
              }))}
              error={errors.id_subresponsable?.message}
              isOptional
            />

            <Button
              onPress={handleSubmit(onSubmit)}
              isDisabled={isSubmitting || Object.keys(errors).length > 0}>
              <ButtonText>
                {isSubmitting ? "Actualizando..." : "Actualizar Item"}
              </ButtonText>
            </Button>
          </VStack>
        </Card>
      </ScrollView>
      <LoadingOverlay isLoading={isSubmitting} />
    </Container>
  );
}
