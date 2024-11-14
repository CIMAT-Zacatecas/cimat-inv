import { useQuery } from "@tanstack/react-query";
import { usersService } from "@/services/users";
import { Profile } from "@/types/types";

export function useUsers() {
  return useQuery<Profile[]>({
    queryKey: ["users"],
    queryFn: () => usersService.getAll(),
  });
}
