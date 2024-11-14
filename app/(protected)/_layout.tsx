// app/(protected)/_layout.tsx
import { Redirect, Slot } from "expo-router";
import { useUserStore } from "@/store/userStore";
import { ROLES } from "@/constants/Roles";

export default function ProtectedLayout() {
  const user = useUserStore((state) => state.user);

  // If user state is still loading, show nothing
  if (user === undefined) {
    return null;
  }

  // If not logged in, redirect to login
  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  // Instead of redirecting, render the appropriate layout
  return <Slot />;
}
