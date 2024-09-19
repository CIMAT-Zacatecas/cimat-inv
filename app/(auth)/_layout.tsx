import { Stack, Redirect } from "expo-router";
import { useUserStore } from "@/store/userStore";

export default function AuthLayout() {
  const user = useUserStore((state) => state.user);

  if (user) {
    // If the user is logged in, redirect to the home screen
    return <Redirect href="/" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
