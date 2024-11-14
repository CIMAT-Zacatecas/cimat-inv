import { Alert, ScrollView } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import { useEffect, useState } from "react";

const updateItemSchema = z.object({
  id_primario: z.string().min(1, "El ID primario es obligatorio"),
  descripcion: z.string().min(1, "La descripción es obligatoria"),
  id_secundario: z.string().optional(),
  codigo_barra: z.string().optional(),
  id_categoria: z.number().nullable(),
  id_estado: z.number().nullable(),
  id_ubicacion: z.number().nullable(),
  id_sub_ubicacion: z.number().nullable(),
  id_responsable: z.string().nullable(),
  id_subresponsable: z.string().nullable(),
});

type FormData = z.infer<typeof updateItemSchema>;

export default function EditItem() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch item data
  const { data: item, isLoading: isLoadingItem } = useQuery({
    queryKey: ["item", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bienes")
        .select(
          `
          *,
          categoria:categorias(*),
          estado:estados_bienes(*),
          ubicacion:ubicaciones(*),
          sub_ubicacion:sub_ubicaciones(*),
          responsable:profiles!bienes_id_responsable_fkey(*),
          subresponsable:profiles!bienes_id_subresponsable_fkey(*)
        `,
        )
        .eq("id_primario", id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  // Reuse the same queries from create-item.tsx
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

  const { data: locations = [] } = useQuery({
    queryKey: ["locations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ubicaciones")
        .select("*")
        .order("nombre");
      if (error) throw error;
      return data;
    },
  });

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
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(updateItemSchema),
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

  // Add state for selected values
  const [selectedValues, setSelectedValues] = useState({
    categoria: "",
    estado: "",
    ubicacion: "",
    subUbicacion: "",
    responsable: "",
    subresponsable: "",
  });

  // Update the useEffect that sets form values to also set selected values
  useEffect(() => {
    if (item) {
      reset({
        id_primario: item.id_primario,
        descripcion: item.descripcion,
        id_secundario: item.id_secundario || undefined,
        codigo_barra: item.codigo_barra || undefined,
        id_categoria: item.id_categoria,
        id_estado: item.id_estado,
        id_ubicacion: item.id_ubicacion,
        id_sub_ubicacion: item.id_sub_ubicacion,
        id_responsable: item.id_responsable,
        id_subresponsable: item.id_subresponsable,
      });

      setSelectedValues({
        categoria: item.categoria?.nombre || "",
        estado: item.estado?.nombre || "",
        ubicacion: item.ubicacion?.nombre || "",
        subUbicacion: item.sub_ubicacion?.nombre || "",
        responsable: item.responsable?.full_name || item.responsable?.username || "",
        subresponsable:
          item.subresponsable?.full_name || item.subresponsable?.username || "",
      });
    }
  }, [item, reset]);

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
    try {
      const { error } = await supabase.from("bienes").update(data).eq("id_primario", id);

      if (error) throw error;

      // Invalidate queries to refetch data
      queryClient.invalidateQueries({ queryKey: ["item", id] });
      queryClient.invalidateQueries({ queryKey: ["inventory"] });

      Alert.alert("Éxito", "Item actualizado correctamente", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error("[EditItem] Error updating item:", error);
      Alert.alert("Error", "No se pudo actualizar el item");
    }
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
