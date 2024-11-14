import React, { useState } from "react";
import { Alert, Keyboard, Image, View } from "react-native";
import { useRouter } from "expo-router";
import { supabase } from "@/lib/supabase";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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

const formSchema = z.object({
  email: z
    .string()
    .min(1, "El correo electrónico es obligatorio")
    .email("Correo electrónico inválido"),
});

type FormData = z.infer<typeof formSchema>;

export default function RestorePasswordScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
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

      Alert.alert(
        "Correo enviado",
        "Se ha enviado un correo con instrucciones para restablecer tu contraseña.",
        [{ text: "OK", onPress: () => router.replace("/login") }],
      );
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container style={{ justifyContent: "center" }}>
      <VStack space="md">
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("@/assets/images/cimat.png")}
            style={{ height: 150, resizeMode: "contain", marginBottom: 8 }}
          />
          <Text style={{ fontWeight: "600", marginBottom: 4 }}>
            Restablecer contraseña
          </Text>
          <Text style={{ fontWeight: "300" }}>
            Ingresa tu correo electrónico para recibir instrucciones
          </Text>
        </View>
        <FormControl isInvalid={!!errors.email}>
          <FormControlLabel>
            <FormControlLabelText>Correo electrónico</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
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
        <Button
          variant="link"
          onPress={() => router.replace("/login")}
          isDisabled={isLoading}>
          <ButtonText>Volver a inicio de sesión</ButtonText>
        </Button>
      </VStack>
      <LoadingOverlay isLoading={isLoading} />
    </Container>
  );
}
