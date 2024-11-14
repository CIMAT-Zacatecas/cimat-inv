import { useUserStore } from "@/store/userStore";
import type { User } from "@/types/user";

export function useAuthUser(): User {
  const user = useUserStore((state) => state.user);
  if (!user) {
    throw new Error("User is not authenticated");
  }
  return user;
}
