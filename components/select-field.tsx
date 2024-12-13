import { Control, Controller } from "react-hook-form";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
} from "@/components/ui/form-control";
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
import { AlertCircleIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";

type SelectFieldProps = {
  name: string;
  control: Control<any>;
  label: string;
  placeholder: string;
  options: { id: string | number; nombre: string }[];
  isOptional?: boolean;
  required?: boolean;
  error?: string;
  onValueChange?: (value: string | null) => void;
};

function SelectField({
  name,
  control,
  label,
  placeholder,
  options,
  isOptional = false,
  required = false,
  error,
  onValueChange,
}: SelectFieldProps) {
  return (
    <FormControl isInvalid={!!error}>
      <FormControlLabel>
        <FormControlLabelText>
          {label}
          {required && <Text style={{ color: "red" }}> *</Text>}
          {isOptional && " (Opcional)"}
        </FormControlLabelText>
      </FormControlLabel>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => {
          const stringValue = value?.toString();
          const selectedOption = options.find((opt) => opt.id.toString() === stringValue);

          return (
            <Select
              selectedValue={stringValue}
              onValueChange={(val) => {
                const finalValue =
                  val === null ? null : name.includes("responsable") ? val : Number(val);

                onChange(finalValue);

                if (onValueChange) {
                  onValueChange(val);
                }
              }}>
              <SelectTrigger>
                <SelectInput
                  placeholder={placeholder}
                  value={selectedOption?.nombre || ""}
                />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent style={{ maxHeight: 600, minHeight: 300 }}>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  {options.map((opt) => (
                    <SelectItem
                      key={opt.id}
                      label={opt.nombre}
                      value={opt.id.toString()}
                    />
                  ))}
                </SelectContent>
              </SelectPortal>
            </Select>
          );
        }}
      />
      {error && (
        <FormControlError>
          <FormControlErrorIcon as={AlertCircleIcon} />
          <FormControlErrorText>{error}</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  );
}

export default SelectField;
