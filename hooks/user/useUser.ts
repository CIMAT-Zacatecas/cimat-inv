import { useQuery } from "@tanstack/react-query";
import { usersService } from "@/services/users";
import { useUserStore } from "@/store/userStore";
import type { Profile } from "@/types/types";
import { User } from "@/types/user";

export function useUsers() {
  return useQuery<Profile[]>({
    queryKey: ["users"],
    queryFn: () => usersService.getAll(),
  });
}

export function useAuthUser(): User {
  const user = useUserStore((state) => state.user);

  if (!user) {
    throw new Error("User is not authenticated");
  }

  return user;
}
