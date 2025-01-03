import { Alert, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { undefined, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useInventoryMutations } from "@/hooks/inventory/useInventoryMutations";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
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
import { inventoryItemSchema } from "@/schemas/inventory";
import { useMemo } from "react";

type FormData = z.infer<typeof inventoryItemSchema>;

export default function CreateItem() {
  const router = useRouter();
  const { createItem, isLoading } = useInventoryMutations();

  // Fetch categories
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categorias")
        .select("*")
        .order("nombre");
      if (error) throw error;
      return data;
    },
  });

  // Fetch statuses
  const { data: statuses = [] } = useQuery({
    queryKey: ["statuses"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("estados_bienes")
        .select("*")
        .order("nombre");
      if (error) throw error;
      return data;
    },
  });

  // Fetch locations
  const { data: locations = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const { data, error } = await supabase.from("ubicaciones").select("*");
      if (error) throw error;
      return data;
    },
  });

  const locationOptions = useMemo(() => {
    // Ordenar por "codigo" y mapear a { label, value }
    return [...locations]
      .sort((a, b) => a.codigo.localeCompare(b.codigo))
      .map((loc) => ({
        label: `${loc.codigo} - ${loc.nombre}`,
        value: loc.id,
      }));
  }, [locations]);

  // Fetch users for responsable/subresponsable
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("full_name");
      if (error) throw error;
      return data;
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
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

  // Watch ubicacion to fetch sub_ubicaciones
  const selectedUbicacion = watch("id_ubicacion");
  const { data: subLocations = [] } = useQuery({
    queryKey: ["subLocations", selectedUbicacion],
    queryFn: async () => {
      if (!selectedUbicacion) return [];
      const { data, error } = await supabase
        .from("sub_ubicaciones")
        .select("*")
        .eq("id_ubicacion", selectedUbicacion)
        .order("nombre");
      if (error) throw error;
      return data;
    },
    enabled: !!selectedUbicacion,
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

  // Original form fields remain the same, adding new select fields:
  return (
    <Container removeVerticalPadding>
      <ScrollView>
        <Card className="my-4">
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
                      className="h-12"
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
                      className="h-12"
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
                      className="h-12"
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
                <FormControlLabelText>Código de Barras</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="codigo_barra"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      className="h-12"
                      placeholder="Ingrese el código de barras"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value || ""}
                    />
                  </Input>
                )}
              />
            </FormControl>

            <FormControl isInvalid={!!errors.id_categoria}>
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
                        className="h-12"
                      />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent style={{ maxHeight: 600, minHeight: 300 }}>
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
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {errors.id_categoria?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl isInvalid={!!errors.id_estado}>
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
                      <SelectInput placeholder="Seleccione un estado" className="h-12" />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent style={{ maxHeight: 600, minHeight: 300 }}>
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
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>{errors.id_estado?.message}</FormControlErrorText>
              </FormControlError>
            </FormControl>

            <FormControl isInvalid={!!errors.id_ubicacion}>
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
                      // Reset sub_ubicacion when ubicacion changes
                      setValue("id_sub_ubicacion", null);
                      // control._reset({ id_sub_ubicacion: null });
                    }}>
                    <SelectTrigger>
                      <SelectInput
                        placeholder="Seleccione una ubicación"
                        className="h-12"
                      />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent style={{ maxHeight: 600, minHeight: 300 }}>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <ScrollView nestedScrollEnabled={true}>
                          {locationOptions.map((option) => (
                            <SelectItem
                              key={option.value}
                              label={option.label}
                              value={option.value.toString()}
                            />
                          ))}
                        </ScrollView>
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                )}
              />
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {errors.id_ubicacion?.message}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>

            {selectedUbicacion && subLocations.length > 0 && (
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
                          className="h-12"
                        />
                      </SelectTrigger>
                      <SelectPortal>
                        <SelectBackdrop />
                        <SelectContent style={{ maxHeight: 600, minHeight: 300 }}>
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

            <FormControl isInvalid={!!errors.id_responsable}>
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
                        className="h-12"
                      />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent style={{ maxHeight: 600, minHeight: 300 }}>
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
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {errors.id_responsable?.message}
                </FormControlErrorText>
              </FormControlError>
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
                        className="h-12"
                      />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent style={{ maxHeight: 600, minHeight: 300 }}>
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

            <Button
              onPress={handleSubmit(onSubmit, (errors) => {
                console.log("Errores de validación:", errors);
              })}
              isDisabled={isLoading}>
              <ButtonText>{isLoading ? "Creando..." : "Crear Item"}</ButtonText>
            </Button>
          </VStack>
        </Card>
      </ScrollView>
      <LoadingOverlay isLoading={isLoading} />
    </Container>
  );
}
