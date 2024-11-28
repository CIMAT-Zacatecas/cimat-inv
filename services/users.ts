import { supabase } from "@/lib/supabase";
import type { Profile } from "@/types/profile";
import { UserView } from "@/types/types";

export interface UserWithAuth {
  profile: Profile;
  authUser: {
    email: string | null;
    id: string;
  } | null;
}

export const usersService = {
  async getAll(): Promise<UserWithAuth[]> {
    const { data: users, error } = (await supabase
      .from("users_view")
      .select("*")
      .order("updated_at", { ascending: false })) as {
      data: UserView[] | null;
      error: any;
    };

    if (error) throw error;

    return (users || []).map((user) => ({
      profile: {
        id: user.id!,
        updated_at: user.updated_at,
        username: user.username,
        full_name: user.full_name,
        avatar_url: user.avatar_url,
        id_rol: user.id_rol!,
      },
      authUser: user.id
        ? {
            email: user.email,
            id: user.id,
          }
        : null,
    }));
  },
};
