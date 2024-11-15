import { Alert, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
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

  const [selectedValues, setSelectedValues] = useState({
    categoria: "",
    estado: "",
    ubicacion: "",
    subUbicacion: "",
    responsable: "",
    subresponsable: "",
  });

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(inventoryItemSchema),
    defaultValues: {
      id_primario: "",
      descripcion: "",
      id_secundario: "",
      codigo_barra: "",
      id_categoria: null,
      id_estado: null,
      id_ubicacion: null,
      id_sub_ubicacion: null,
      id_responsable: null,
      id_subresponsable: null,
    },
  });

  const selectedUbicacion = watch("id_ubicacion");
  const { subLocations } = useSubLocations(selectedUbicacion || undefined);

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

  // Add this useEffect to set form data when item loads
  useEffect(() => {
    if (item) {
      reset({
        id_primario: item.id_primario,
        descripcion: item.descripcion,
        id_secundario: item.id_secundario || "",
        codigo_barra: item.codigo_barra || "",
        id_categoria: item.id_categoria,
        id_estado: item.id_estado,
        id_ubicacion: item.id_ubicacion,
        id_sub_ubicacion: item.id_sub_ubicacion,
        id_responsable: item.id_responsable,
        id_subresponsable: item.id_subresponsable,
      });

      // Also update the selected values state for dropdowns
      setSelectedValues({
        categoria: categories.find((c) => c.id === item.id_categoria)?.nombre || "",
        estado: statuses.find((s) => s.id === item.id_estado)?.nombre || "",
        ubicacion: locations.find((l) => l.id === item.id_ubicacion)?.nombre || "",
        subUbicacion:
          subLocations.find((s) => s.id === item.id_sub_ubicacion)?.nombre || "",
        responsable:
          users.find((u) => u.id === item.id_responsable)?.full_name ||
          users.find((u) => u.id === item.id_responsable)?.username ||
          "",
        subresponsable:
          users.find((u) => u.id === item.id_subresponsable)?.full_name ||
          users.find((u) => u.id === item.id_subresponsable)?.username ||
          "",
      });
    }
  }, [item, categories, statuses, locations, subLocations, users, reset]);

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
                    onValueChange={(val) => {
                      onChange(val ? Number(val) : null);
                      const newCategory = categories.find((c) => c.id === Number(val));
                      setSelectedValues((prev) => ({
                        ...prev,
                        categoria: newCategory?.nombre || "",
                      }));
                    }}>
                    <SelectTrigger>
                      <SelectInput
                        placeholder="Seleccione una categoría"
                        value={
                          categories.find((c) => c.id === value)?.nombre ||
                          selectedValues.categoria
                        }
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
                    onValueChange={(val) => {
                      onChange(val ? Number(val) : null);
                      const newStatus = statuses.find((s) => s.id === Number(val));
                      setSelectedValues((prev) => ({
                        ...prev,
                        estado: newStatus?.nombre || "",
                      }));
                    }}>
                    <SelectTrigger>
                      <SelectInput
                        placeholder="Seleccione un estado"
                        value={
                          statuses.find((s) => s.id === value)?.nombre ||
                          selectedValues.estado
                        }
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
                      onChange(val ? Number(val) : null);
                      const newLocation = locations.find((l) => l.id === Number(val));
                      setSelectedValues((prev) => ({
                        ...prev,
                        ubicacion: newLocation?.nombre || "",
                        subUbicacion: "",
                      }));
                      control._reset({ id_sub_ubicacion: null });
                    }}>
                    <SelectTrigger>
                      <SelectInput
                        placeholder="Seleccione una ubicación"
                        value={
                          locations.find((l) => l.id === value)?.nombre ||
                          selectedValues.ubicacion
                        }
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
                      onValueChange={(val) => {
                        onChange(val ? Number(val) : null);
                        const newSubLocation = subLocations.find(
                          (s) => s.id === Number(val),
                        );
                        setSelectedValues((prev) => ({
                          ...prev,
                          subUbicacion: newSubLocation?.nombre || "",
                        }));
                      }}>
                      <SelectTrigger>
                        <SelectInput
                          placeholder="Seleccione una sub-ubicación"
                          value={
                            subLocations.find((s) => s.id === value)?.nombre ||
                            selectedValues.subUbicacion
                          }
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
                    onValueChange={(val) => {
                      onChange(val || null);
                      const newUser = users.find((u) => u.id === val);
                      setSelectedValues((prev) => ({
                        ...prev,
                        responsable: newUser?.full_name || newUser?.username || "",
                      }));
                    }}>
                    <SelectTrigger>
                      <SelectInput
                        placeholder="Seleccione un responsable"
                        value={
                          users.find((u) => u.id === value)?.full_name ||
                          selectedValues.responsable
                        }
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
                        value={
                          selectedValues.subresponsable ||
                          users.find((u) => u.id === value)?.full_name ||
                          users.find((u) => u.id === value)?.username ||
                          "No disponible"
                        }
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
