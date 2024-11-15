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
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { inventoryItemSchema } from "@/schemas/inventory";

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
        id_categoria: item?.id_categoria || null,
        id_estado: item?.id_estado || null,
        id_ubicacion: item?.id_ubicacion || null,
        id_sub_ubicacion: item?.id_sub_ubicacion || null,
        id_responsable: item?.id_responsable || null,
        id_subresponsable: item?.id_subresponsable || null,
      }),
      [item],
    ),
  });

  const formValues = watch();
  const selectedUbicacion = formValues.id_ubicacion;
  const { subLocations } = useSubLocations(selectedUbicacion || undefined);

  const getDisplayValue = useMemo(
    () => ({
      categoria: formValues.id_categoria
        ? categories.find((c) => c.id === formValues.id_categoria)?.nombre
        : item?.id_categoria
          ? categories.find((c) => c.id === item.id_categoria)?.nombre
          : "",
      estado: formValues.id_estado
        ? statuses.find((s) => s.id === formValues.id_estado)?.nombre
        : item?.id_estado
          ? statuses.find((s) => s.id === item.id_estado)?.nombre
          : "",
      ubicacion: formValues.id_ubicacion
        ? locations.find((l) => l.id === formValues.id_ubicacion)?.nombre
        : item?.id_ubicacion
          ? locations.find((l) => l.id === item.id_ubicacion)?.nombre
          : "",
      subUbicacion: formValues.id_sub_ubicacion
        ? subLocations.find((s) => s.id === formValues.id_sub_ubicacion)?.nombre
        : item?.id_sub_ubicacion
          ? subLocations.find((s) => s.id === item.id_sub_ubicacion)?.nombre
          : "",
      responsable: formValues.id_responsable
        ? users.find((u) => u.id === formValues.id_responsable)?.full_name ||
          users.find((u) => u.id === formValues.id_responsable)?.username
        : item?.id_responsable
          ? users.find((u) => u.id === item.id_responsable)?.full_name ||
            users.find((u) => u.id === item.id_responsable)?.username
          : "",
      subresponsable: formValues.id_subresponsable
        ? users.find((u) => u.id === formValues.id_subresponsable)?.full_name ||
          users.find((u) => u.id === formValues.id_subresponsable)?.username
        : item?.id_subresponsable
          ? users.find((u) => u.id === item.id_subresponsable)?.full_name ||
            users.find((u) => u.id === item.id_subresponsable)?.username
          : "",
    }),
    [formValues, item, categories, statuses, locations, subLocations, users],
  );

  const onSubmit = async (data: FormData) => {
    const { error } = await updateItem(id as string, data);
    if (error) {
      Alert.alert("Error", error);
      return;
    }
    Alert.alert("Éxito", "Item actualizado correctamente", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

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

            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Categoría</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="id_categoria"
                render={({ field: { onChange, value } }) => (
                  <Select
                    selectedValue={value?.toString()}
                    onValueChange={(val) => onChange(val ? Number(val) : null)}>
                    <SelectTrigger>
                      <SelectInput
                        placeholder="Seleccione una categoría"
                        value={getDisplayValue.categoria}
                      />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {categories.map((cat) => (
                          <SelectItem
                            key={cat.id}
                            label={cat.nombre}
                            value={cat.id.toString()}
                          />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                )}
              />
            </FormControl>

            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Estado</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="id_estado"
                render={({ field: { onChange, value } }) => (
                  <Select
                    selectedValue={value?.toString()}
                    onValueChange={(val) => onChange(val ? Number(val) : null)}>
                    <SelectTrigger>
                      <SelectInput
                        placeholder="Seleccione un estado"
                        value={getDisplayValue.estado}
                      />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {statuses.map((status) => (
                          <SelectItem
                            key={status.id}
                            label={status.nombre}
                            value={status.id.toString()}
                          />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                )}
              />
            </FormControl>

            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Ubicación</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="id_ubicacion"
                render={({ field: { onChange, value } }) => (
                  <Select
                    selectedValue={value?.toString()}
                    onValueChange={(val) => {
                      const newValue = val ? Number(val) : null;
                      onChange(newValue);
                      if (value !== newValue) {
                        setValue("id_sub_ubicacion", null);
                      }
                    }}>
                    <SelectTrigger>
                      <SelectInput
                        placeholder="Seleccione una ubicación"
                        value={getDisplayValue.ubicacion}
                      />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {locations.map((loc) => (
                          <SelectItem
                            key={loc.id}
                            label={loc.nombre}
                            value={loc.id.toString()}
                          />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                )}
              />
            </FormControl>

            {selectedUbicacion && (
              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText>Sub-ubicación</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="id_sub_ubicacion"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      selectedValue={value?.toString()}
                      onValueChange={(val) => onChange(val ? Number(val) : null)}>
                      <SelectTrigger>
                        <SelectInput
                          placeholder="Seleccione una sub-ubicación"
                          value={getDisplayValue.subUbicacion}
                        />
                      </SelectTrigger>
                      <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent>
                          <SelectDragIndicatorWrapper>
                            <SelectDragIndicator />
                          </SelectDragIndicatorWrapper>
                          {subLocations.map((subLoc) => (
                            <SelectItem
                              key={subLoc.id}
                              label={subLoc.nombre}
                              value={subLoc.id.toString()}
                            />
                          ))}
                        </SelectContent>
                      </SelectPortal>
                    </Select>
                  )}
                />
              </FormControl>
            )}

            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Responsable</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="id_responsable"
                render={({ field: { onChange, value } }) => (
                  <Select
                    selectedValue={value?.toString()}
                    onValueChange={(val) => onChange(val || null)}>
                    <SelectTrigger>
                      <SelectInput
                        placeholder="Seleccione un responsable"
                        value={getDisplayValue.responsable || undefined}
                      />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {users.map((user) => (
                          <SelectItem
                            key={user.id}
                            label={user.full_name || user.username || "No disponible"}
                            value={user.id}
                          />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                )}
              />
            </FormControl>

            <FormControl>
              <FormControlLabel>
                <FormControlLabelText>Sub-responsable</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="id_subresponsable"
                render={({ field: { onChange, value } }) => (
                  <Select
                    selectedValue={value?.toString()}
                    onValueChange={(val) => onChange(val || null)}>
                    <SelectTrigger>
                      <SelectInput
                        placeholder="Seleccione un sub-responsable"
                        value={getDisplayValue.subresponsable || undefined}
                      />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {users.map((user) => (
                          <SelectItem
                            key={user.id}
                            label={user.full_name || user.username || "No disponible"}
                            value={user.id}
                          />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                )}
              />
            </FormControl>

            <Button onPress={handleSubmit(onSubmit)}>
              <ButtonText>Actualizar Item</ButtonText>
            </Button>
          </VStack>
        </Card>
      </ScrollView>
      <LoadingOverlay isLoading={isSubmitting} />
    </Container>
  );
}
