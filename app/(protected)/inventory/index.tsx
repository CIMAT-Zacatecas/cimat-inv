import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { Search } from "lucide-react-native";
import { useInventoryList } from "@/hooks/inventory/useInventory";
import { useInventoryFilters } from "@/hooks/inventory/useInventoryFilters";
import { useAppFocus } from "@/hooks/core/useAppState";
import Container from "@/components/ui/container";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Card } from "@/components/ui/card";
import { Input, InputField, InputIcon } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { Separator } from "@/components/ui/separator";
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
import BienItem from "@/components/bienItem";
import type { Bien } from "@/types/types";
import { ScrollView, Platform } from "react-native";
import { Plus } from "lucide-react-native";
import { Fab, FabIcon, FabLabel } from "@/components/ui/fab";
import React from "react";

export default function Inventory() {
  const router = useRouter();

  // 1. Fetch inventory data
  const { data: bienes = [], isLoading, error, refetch } = useInventoryList();

  // 2. Setup filters - this will now handle all metadata fetching internally
  const {
    filters,
    setFilters,
    debouncedSetSearch,
    filteredItems,
    categoryOptions,
    statusOptions,
    locationOptions,
  } = useInventoryFilters(bienes);

  // 3. Setup app focus refresh
  useAppFocus(refetch);

  const handlePress = (bien: Bien) => {
    router.push({
      pathname: "/inventory/item-detail",
      params: { id: bien.id_primario },
    });
  };

  const handleCreateItem = () => {
    router.push("/inventory/create-item");
  };

  if (error) {
    return (
      <Container centered>
        <Text>Error al cargar el inventario</Text>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container centered>
        <Spinner size="large" />
        <Text>Cargando inventario...</Text>
      </Container>
    );
  }

  console.log("[Inventory] Platform.OS:", Platform.OS); // Debug platform

  return (
    <Container removeVerticalPadding>
      <Card className="my-4">
        <VStack space="md">
          <Input>
            <InputField
              placeholder="Buscar por ID o descripción..."
              onChangeText={debouncedSetSearch}
              className="h-12"
            />
            <InputIcon as={Search} />
          </Input>

          <HStack space="sm">
            {/* Category Filter */}
            <Select
              className="flex-1"
              selectedValue={filters.categoryId?.toString()}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  categoryId: value ? Number(value) : undefined,
                }))
              }>
              <SelectTrigger>
                <SelectInput placeholder="Categoría" className="h-12" />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent style={{ maxHeight: 600, minHeight: 300 }}>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Todas" value="" />
                  {categoryOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      label={option.label}
                      value={option.value.toString()}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>

            {/* Status Filter */}
            <Select
              className="flex-1"
              selectedValue={filters.statusId?.toString()}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  statusId: value ? Number(value) : undefined,
                }))
              }>
              <SelectTrigger>
                <SelectInput placeholder="Estado" className="h-12" />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent style={{ maxHeight: 600, minHeight: 300 }}>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Todos" value="" />
                  {statusOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      label={option.label}
                      value={option.value.toString()}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>

            {/* Location Filter */}
            <Select
              className="flex-1"
              selectedValue={filters.locationId?.toString()}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  locationId: value ? Number(value) : undefined,
                }))
              }>
              <SelectTrigger>
                <SelectInput placeholder="Ubicación" className="h-12" />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent style={{ maxHeight: 600, minHeight: 300 }}>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <ScrollView nestedScrollEnabled={true}>
                    <SelectItem label="Todas" value="" />
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
          </HStack>

          {/* Optional: Show count of filtered items */}
          <Text className="text-sm text-gray-500">
            Mostrando {filteredItems.length} de {bienes.length} items
          </Text>
        </VStack>
      </Card>

      {filteredItems.length === 0 ? (
        <Container centered>
          <Text>No se encontraron resultados</Text>
        </Container>
      ) : (
        <FlashList
          estimatedItemSize={50}
          data={filteredItems}
          renderItem={({ item }) => (
            <BienItem bien={item} onPress={() => handlePress(item)} />
          )}
          keyExtractor={(item) => item.id_primario.toString()}
          contentContainerClassName="pb-5"
          ItemSeparatorComponent={() => <Separator height={8} />}
          refreshing={isLoading}
          onRefresh={refetch}
        />
      )}

      {Platform.OS !== "ios" && (
        <Fab
          onPress={() => {
            handleCreateItem();
          }}
          placement="bottom right"
          size="lg"
          className="bg-primary-500">
          <FabIcon
            stroke="white"
            as={Plus}
            onPress={() => {
              handleCreateItem();
            }}
            size="md"
            color="white"
          />
          <FabLabel>Crear</FabLabel>
        </Fab>
      )}
    </Container>
  );
}
