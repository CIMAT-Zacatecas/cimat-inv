import type { User as SupabaseAuthUser } from "@supabase/supabase-js";
import type { Profile } from "./profile";

export interface User {
  authUser: SupabaseAuthUser;
  profile: Profile;
}
