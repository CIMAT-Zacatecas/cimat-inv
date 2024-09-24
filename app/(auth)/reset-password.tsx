import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useForm, Controller } from "react-hook-form";
import LoadingOverlay from "@/components/ui/loading-overlay";
import { VStack } from "@/components/ui/vstack";
import Container from "@/components/ui/container";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

interface FormData {
  newPassword: string;
  confirmPassword: string;
}

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { token } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  useEffect(() => {
    if (!token) {
      Alert.alert("Error", "No se ha proporcionado un token válido para restablecer la contraseña.");
      router.replace("/login");
    }
  }, [token, router]);

  const onSubmit = async (data: FormData) => {
    if (!token) return;

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (error) throw error;

      Alert.alert("Éxito", "Tu contraseña ha sido actualizada correctamente.", [
        { text: "OK", onPress: () => router.replace("/login") },
      ]);
    } catch (error) {
      Alert.alert("Error", error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleNewPasswordVisibility = () => setShowNewPassword(!showNewPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  if (!token) return null;

  return (
    <Container>
      <VStack space="md">
        <Text>Logo</Text>
        <Text>Restablecer contraseña</Text>
        <Text>Ingresa tu nueva contraseña</Text>

        <FormControl isInvalid={!!errors.newPassword}>
          <FormControlLabel>
            <FormControlLabelText>Nueva contraseña</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            rules={{
              required: "La nueva contraseña es obligatoria",
              minLength: {
                value: 6,
                message: "La contraseña debe tener al menos 6 caracteres",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Nueva contraseña"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!showNewPassword}
                />
                <InputSlot onPress={toggleNewPasswordVisibility}>
                  <InputIcon as={showNewPassword ? EyeOffIcon : EyeIcon} />
                </InputSlot>
              </Input>
            )}
            name="newPassword"
          />
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{errors.newPassword?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl isInvalid={!!errors.confirmPassword}>
          <FormControlLabel>
            <FormControlLabelText>Confirmar nueva contraseña</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            rules={{
              required: "Debes confirmar la nueva contraseña",
              validate: (value) => value === newPassword || "Las contraseñas no coinciden",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Confirmar nueva contraseña"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!showConfirmPassword}
                />
                <InputSlot onPress={toggleConfirmPasswordVisibility}>
                  <InputIcon as={showConfirmPassword ? EyeOffIcon : EyeIcon} />
                </InputSlot>
              </Input>
            )}
            name="confirmPassword"
          />
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{errors.confirmPassword?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <Button onPress={handleSubmit(onSubmit)} isDisabled={isLoading}>
          <ButtonText>{isLoading ? "Actualizando..." : "Actualizar contraseña"}</ButtonText>
        </Button>
      </VStack>
      <LoadingOverlay isLoading={isLoading} />
    </Container>
  );
}
