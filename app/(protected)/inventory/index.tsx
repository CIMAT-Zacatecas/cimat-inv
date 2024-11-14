import { Text, View } from "react-native";
import Container from "@/components/ui/container";
import { useInventory } from "@/hooks/useInventory";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { useInventoryFilters } from "@/hooks/useInventoryFilters";
import { Spinner } from "@/components/ui/spinner";
import { router } from "expo-router";
import { Bien } from "@/types/types";
import { FlashList } from "@shopify/flash-list";
import { Separator } from "@/components/ui/separator";
import BienItem from "@/components/bienItem";
import { Input, InputField, InputIcon } from "@/components/ui/input";
import { Search } from "lucide-react-native";
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
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Card } from "@/components/ui/card";

export default function Inventory() {
  const { data: bienes = [], isLoading, error, refetch } = useInventory();
  const {
    filters,
    setFilters,
    debouncedSetSearch,
    filteredItems,
    categoryOptions,
    statusOptions,
    locationOptions,
  } = useInventoryFilters(bienes);

  useRefreshOnFocus(refetch);

  const handlePress = (bien: Bien) => {
    router.push({
      pathname: "/inventory/item-detail",
      params: { id: bien.id_primario },
    });
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

  return (
    <Container removeVerticalPadding>
      <Card className="my-4">
        <VStack space="md">
          <Input>
            <InputField
              placeholder="Buscar por ID o descripción..."
              onChangeText={debouncedSetSearch}
            />
            <InputIcon as={Search} />
          </Input>

          <HStack space="sm">
            <Select
              selectedValue={filters.categoryId?.toString()}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  categoryId: value ? Number(value) : undefined,
                }))
              }>
              <SelectTrigger>
                <SelectInput placeholder="Categoría" />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
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

            <Select
              selectedValue={filters.statusId?.toString()}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  statusId: value ? Number(value) : undefined,
                }))
              }>
              <SelectTrigger>
                <SelectInput placeholder="Estado" />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
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

            <Select
              selectedValue={filters.locationId?.toString()}
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  locationId: value ? Number(value) : undefined,
                }))
              }>
              <SelectTrigger>
                <SelectInput placeholder="Ubicación" />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="Todas" value="" />
                  {locationOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      label={option.label}
                      value={option.value.toString()}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          </HStack>
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
        />
      )}
    </Container>
  );
}
