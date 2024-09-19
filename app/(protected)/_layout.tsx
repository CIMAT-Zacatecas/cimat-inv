import { Slot, Redirect } from "expo-router";
import { useUserStore } from "@/store/userStore";

export default function ProtectedLayout() {
  const user = useUserStore((state) => state.user);

  if (!user) {
    // If the user is not logged in, redirect to the login screen
    return <Redirect href="/login" />;
  }

  return <Slot />;
}
