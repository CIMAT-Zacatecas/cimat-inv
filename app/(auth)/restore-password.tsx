import React, { useState } from "react";
import { Alert, Keyboard } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useForm, Controller } from "react-hook-form";
import EmailValidator from "@/lib/email-validator";
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
import { Input, InputField } from "@/components/ui/input";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

const emailValidator = new EmailValidator();

interface FormData {
  email: string;
}

export default function RestorePasswordScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    Keyboard.dismiss();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: "cimat-inv://reset-password",
      });

      if (error) throw error;

      Alert.alert("Correo enviado", "Se ha enviado un correo con instrucciones para restablecer tu contraseña.", [
        { text: "OK", onPress: () => router.replace("/login") },
      ]);
    } catch (error) {
      Alert.alert("Error", error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container style={{ justifyContent: "center" }}>
      <VStack space="md">
        <Text>Logo</Text>
        <Text>Restablecer contraseña</Text>
        <Text>Ingresa tu correo electrónico para recibir instrucciones</Text>

        <FormControl isInvalid={!!errors.email}>
          <FormControlLabel>
            <FormControlLabelText>Correo electrónico</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            rules={{
              required: "El correo electrónico es obligatorio",
              validate: (value) => emailValidator.validate(value) || "Correo electrónico inválido",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Correo electrónico"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </Input>
            )}
            name="email"
          />
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{errors.email?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <Button onPress={handleSubmit(onSubmit)} isDisabled={isLoading}>
          <ButtonText>{isLoading ? "Enviando..." : "Enviar instrucciones"}</ButtonText>
        </Button>
        <Button variant="outline" onPress={() => router.replace("/login")} isDisabled={isLoading}>
          <ButtonText>Volver a inicio de sesión</ButtonText>
        </Button>
      </VStack>
      <LoadingOverlay isLoading={isLoading} />
    </Container>
  );
}
