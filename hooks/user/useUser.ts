import { useQuery } from "@tanstack/react-query";
import { usersService, UserWithAuth } from "@/services/users";
import { useUserStore } from "@/store/userStore";
import { User } from "@/types/user";

export function useUsers() {
  return useQuery<UserWithAuth[]>({
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
