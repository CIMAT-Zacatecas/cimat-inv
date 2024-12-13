import { useState } from "react";
import { Alert, Keyboard, Text, Image, View } from "react-native";
import { useRouter } from "expo-router";
import { useUserStore } from "@/store/userStore";
import { supabase } from "@/lib/supabase";
import type { Profile } from "@/types/profile";
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
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { AlertCircleIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Button, ButtonText } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo electrónico es obligatorio")
    .email("Correo electrónico inválido"),
  password: z
    .string()
    .min(1, "La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    Keyboard.dismiss();
    setIsLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword(
        {
          email: data.email,
          password: data.password,
        },
      );

      if (authError) throw authError;

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authData.user.id)
        .single();

      if (profileError) throw profileError;

      const profile = profileData as Profile;
      const user = { authUser: authData.user, profile };
      setUser(user);

      router.replace("/");
    } catch (error) {
      Alert.alert(
        "Error",
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container style={{ justifyContent: "center" }}>
      <VStack space="md">
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("@/assets/images/cimat.png")}
            style={{ height: 100, resizeMode: "contain", marginBottom: 10 }}
          />
          <Text style={{ fontWeight: "600", marginBottom: 4 }}>
            Sistema de gestión de inventario
          </Text>
          {/* <Text style={{ fontWeight: "300" }}>Ingresa tus datos para iniciar sesión</Text> */}
        </View>

        <FormControl isInvalid={!!errors.email}>
          <FormControlLabel>
            <FormControlLabelText>Correo electrónico</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Correo electrónico"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className="h-12"
                />
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{errors.email?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <FormControl isInvalid={!!errors.password}>
          <FormControlLabel>
            <FormControlLabelText>Contraseña</FormControlLabelText>
          </FormControlLabel>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input>
                <InputField
                  placeholder="Contraseña"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!showPassword}
                  className="h-12"
                />
                <InputSlot onPress={togglePasswordVisibility}>
                  <InputIcon as={showPassword ? EyeOffIcon : EyeIcon} />
                </InputSlot>
              </Input>
            )}
          />
          <FormControlError>
            <FormControlErrorIcon as={AlertCircleIcon} />
            <FormControlErrorText>{errors.password?.message}</FormControlErrorText>
          </FormControlError>
        </FormControl>

        <Button onPress={handleSubmit(onSubmit)} isDisabled={isLoading}>
          <ButtonText>{isLoading ? "Iniciando sesión..." : "Iniciar sesión"}</ButtonText>
        </Button>

        <Button
          variant="link"
          onPress={() => router.replace("/restore-password")}
          isDisabled={isLoading}>
          <ButtonText>Restablecer contraseña</ButtonText>
        </Button>
      </VStack>
      <LoadingOverlay isLoading={isLoading} />
    </Container>
  );
}
